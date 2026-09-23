import type { ClimateKey } from "@/lib/iecc/types";
import type { UaAssemblyKind } from "@/lib/iecc/residential";
import { eriMax, resFor } from "@/lib/iecc/residential";
import type { UFactorKind } from "@/lib/iecc/commercial";
import { comU, fenFor } from "@/lib/iecc/commercial";
import type { LightingZone } from "@/lib/iecc/lighting";
import { PIPE_NPS } from "@/lib/iecc/mechanical";

export type Occupancy = "all" | "groupR";

export type UaRow = { id: number; kind: UaAssemblyKind; area: number; u: number };
export type ComUaRow = { id: number; kind: UFactorKind; area: number; u: number };
export type LpdRow = { id: number; type: string; area: number; watts: number };
export type ExtRow = { id: number; surface: string; qty: number; watts: number };

export type ProjectInputs = {
  climate: { cdd: number; hdd: number; marine: boolean; precip: number; meanT: number };
  resUa: UaRow[];
  resAir: { cfa: number; br: number; ach: number; flow: number; watts: number };
  steel: { idx: number; rs: number };
  eri: { value: number };
  comUa: ComUaRow[];
  fen: {
    wall: number;
    vert: number;
    sky: number;
    roof: number;
    a: number;
    b: number;
    fixedU: number;
    shgc: number;
  };
  skylight: { area: number; vt: number; depth: number; toplit: number };
  reflectance: { initial: number };
  lpdBuilding: LpdRow[];
  lpdSpace: LpdRow[];
  lpdExterior: { lz: LightingZone; rows: ExtRow[] };
  fan: { cfm: number; vav: boolean; nameplate: number; bhp: number; adj: number };
  erv: { oa: number; cfm: number; hours8000: boolean };
  hvac: { btuh: number; replacement: boolean };
  chiller: { cewt: number; clwt: number; tableKw: number };
  pipe: { tempIdx: number; nps: (typeof PIPE_NPS)[number]; kInst: number; kTable: number };
  swh: { volume: number };
  hood: { type: string; duty: "light" | "medium" | "heavy" | "extra"; length: number; exhaust: number };
};

export type Snapshot = {
  id: string;
  name: string;
  savedAt: string;
  zone: ClimateKey;
  occupancy: Occupancy;
  projectName: string;
  inputs: ProjectInputs;
};

export function nextRowId(rows: { id: number }[]): number {
  return rows.reduce((m, r) => Math.max(m, r.id), 0) + 1;
}

export function defaultInputs(zone: ClimateKey, occupancy: Occupancy = "all"): ProjectInputs {
  const env = resFor(zone);
  const fen = fenFor(zone);
  return {
    climate: { cdd: 4500, hdd: 5400, marine: false, precip: 20, meanT: 55 },
    resUa: [
      { id: 1, kind: "ceiling", area: 1200, u: env.ceilingU },
      { id: 2, kind: "wall", area: 1800, u: env.wallU },
      { id: 3, kind: "fenestration", area: 240, u: env.fenUeq },
      { id: 4, kind: "floor", area: 1200, u: env.floorU },
    ],
    resAir: { cfa: 2400, br: 3, ach: 2.5, flow: 80, watts: 25 },
    steel: { idx: 0, rs: 0.79 },
    eri: { value: eriMax(zone) },
    comUa: [
      { id: 1, kind: "roofAbove", area: 10000, u: comU("roofAbove", zone, occupancy) },
      { id: 2, kind: "wallMetalFramed", area: 8000, u: comU("wallMetalFramed", zone, occupancy) },
      { id: 3, kind: "floorJoist", area: 10000, u: comU("floorJoist", zone, occupancy) },
    ],
    fen: {
      wall: 12000,
      vert: 2800,
      sky: 200,
      roof: 10000,
      a: 3,
      b: 8,
      fixedU: fen.fixedU,
      shgc: fen.shgc[0].sew ?? 0.4,
    },
    skylight: { area: 120, vt: 0.6, depth: 3, toplit: 2000 },
    reflectance: { initial: 0.7 },
    lpdBuilding: [{ id: 1, type: "Office", area: 20000, watts: 14000 }],
    lpdSpace: [
      { id: 1, type: "Office — open plan", area: 12000, watts: 10000 },
      { id: 2, type: "Corridor / transition", area: 2000, watts: 1000 },
    ],
    lpdExterior: {
      lz: 3,
      rows: [{ id: 1, surface: "Uncovered parking areas", qty: 40000, watts: 3200 }],
    },
    fan: { cfm: 12000, vav: true, nameplate: 15, bhp: 12, adj: 0 },
    erv: { oa: 0.4, cfm: 8000, hours8000: false },
    hvac: { btuh: 12000, replacement: false },
    chiller: { cewt: 85, clwt: 44, tableKw: 0.61 },
    pipe: { tempIdx: 1, nps: "1½–3\"", kInst: 0.27, kTable: 0.27 },
    swh: { volume: 80 },
    hood: { type: "Wall-mounted canopy", duty: "medium", length: 8, exhaust: 2400 },
  };
}

export function cloneInputs(inputs: ProjectInputs): ProjectInputs {
  return structuredClone(inputs);
}

export function newSnapshotId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `snap-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function slugFile(name: string): string {
  const s = name
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return s || "snapshot";
}
