import type { ClimateKey, ClimateZoneNumber } from "./types";
import { commercialColumn } from "./climate";

type Occ = "all" | "groupR";

export type ComRRow = {
  assembly: string;
  group: string;
  values: Record<ClimateZoneNumber, { all: string; groupR: string }>;
};

/** Table C402.1.3 — opaque envelope R-value method */
export const COM_RVALUE: ComRRow[] = [
  {
    assembly: "Insulation entirely above deck",
    group: "Roofs",
    values: {
      1: { all: "R-20ci", groupR: "R-25ci" },
      2: { all: "R-25ci", groupR: "R-25ci" },
      3: { all: "R-25ci", groupR: "R-25ci" },
      4: { all: "R-30ci", groupR: "R-30ci" },
      5: { all: "R-30ci", groupR: "R-30ci" },
      6: { all: "R-30ci", groupR: "R-30ci" },
      7: { all: "R-35ci", groupR: "R-35ci" },
      8: { all: "R-35ci", groupR: "R-35ci" },
    },
  },
  {
    assembly: "Metal buildings (LS)",
    group: "Roofs",
    values: {
      1: { all: "R-19 + R-11 LS", groupR: "R-19 + R-11 LS" },
      2: { all: "R-19 + R-11 LS", groupR: "R-19 + R-11 LS" },
      3: { all: "R-19 + R-11 LS", groupR: "R-19 + R-11 LS" },
      4: { all: "R-19 + R-11 LS", groupR: "R-19 + R-11 LS" },
      5: { all: "R-19 + R-11 LS", groupR: "R-19 + R-11 LS" },
      6: { all: "R-25 + R-11 LS", groupR: "R-25 + R-11 LS" },
      7: { all: "R-30 + R-11 LS", groupR: "R-30 + R-11 LS" },
      8: { all: "R-30 + R-11 LS", groupR: "R-30 + R-11 LS" },
    },
  },
  {
    assembly: "Attic and other",
    group: "Roofs",
    values: {
      1: { all: "R-38", groupR: "R-38" },
      2: { all: "R-38", groupR: "R-38" },
      3: { all: "R-38", groupR: "R-38" },
      4: { all: "R-38", groupR: "R-49" },
      5: { all: "R-38", groupR: "R-49" },
      6: { all: "R-49", groupR: "R-49" },
      7: { all: "R-49", groupR: "R-49" },
      8: { all: "R-49", groupR: "R-49" },
    },
  },
  {
    assembly: "Mass",
    group: "Walls, above grade",
    values: {
      1: { all: "R-5.7ci", groupR: "R-5.7ci" },
      2: { all: "R-5.7ci", groupR: "R-7.6ci" },
      3: { all: "R-7.6ci", groupR: "R-9.5ci" },
      4: { all: "R-9.5ci", groupR: "R-11.4ci" },
      5: { all: "R-11.4ci", groupR: "R-13.3ci" },
      6: { all: "R-13.3ci", groupR: "R-15.2ci" },
      7: { all: "R-15.2ci", groupR: "R-15.2ci" },
      8: { all: "R-25ci", groupR: "R-25ci" },
    },
  },
  {
    assembly: "Metal building",
    group: "Walls, above grade",
    values: {
      1: { all: "R-13 + R-6.5ci", groupR: "R-13 + R-6.5ci" },
      2: { all: "R-13 + R-6.5ci", groupR: "R-13 + R-13ci" },
      3: { all: "R-13 + R-6.5ci", groupR: "R-13 + R-13ci" },
      4: { all: "R-13 + R-13ci", groupR: "R-13 + R-13ci" },
      5: { all: "R-13 + R-13ci", groupR: "R-13 + R-14ci" },
      6: { all: "R-13 + R-14ci", groupR: "R-13 + R-14ci" },
      7: { all: "R-13 + R-14ci", groupR: "R-13 + R-19.5ci" },
      8: { all: "R-13 + R-19.5ci", groupR: "R-13 + R-19.5ci" },
    },
  },
  {
    assembly: "Metal framed",
    group: "Walls, above grade",
    values: {
      1: { all: "R-13 + R-5ci", groupR: "R-13 + R-5ci" },
      2: { all: "R-13 + R-5ci", groupR: "R-13 + R-7.5ci" },
      3: { all: "R-13 + R-7.5ci", groupR: "R-13 + R-7.5ci" },
      4: { all: "R-13 + R-7.5ci", groupR: "R-13 + R-7.5ci" },
      5: { all: "R-13 + R-7.5ci", groupR: "R-13 + R-10ci" },
      6: { all: "R-13 + R-12.5ci", groupR: "R-13 + R-12.5ci" },
      7: { all: "R-13 + R-12.5ci", groupR: "R-13 + R-15.6ci" },
      8: { all: "R-13 + R-15.6ci", groupR: "R-13 + R-15.6ci" },
    },
  },
  {
    assembly: "Wood framed and other",
    group: "Walls, above grade",
    values: {
      1: { all: "R-13 + R-3.8ci or R-20", groupR: "R-13 + R-3.8ci or R-20" },
      2: { all: "R-13 + R-3.8ci or R-20", groupR: "R-13 + R-3.8ci or R-20" },
      3: { all: "R-13 + R-3.8ci or R-20", groupR: "R-13 + R-3.8ci or R-20" },
      4: { all: "R-13 + R-3.8ci or R-20", groupR: "R-13 + R-3.8ci or R-20" },
      5: { all: "R-13 + R-3.8ci or R-20", groupR: "R-13 + R-7.5ci or R-20 + R-3.8ci" },
      6: { all: "R-13 + R-7.5ci or R-20 + R-3.8ci", groupR: "R-13 + R-7.5ci or R-20 + R-3.8ci" },
      7: { all: "R-13 + R-7.5ci or R-20 + R-3.8ci", groupR: "R-13 + R-15.6ci or R-20 + R-10ci" },
      8: { all: "R-13 + R-15.6ci or R-20 + R-10ci", groupR: "R-13 + R-15.6ci or R-20 + R-10ci" },
    },
  },
  {
    assembly: "Below-grade wall",
    group: "Walls, below grade",
    values: {
      1: { all: "NR", groupR: "NR" },
      2: { all: "NR", groupR: "NR" },
      3: { all: "NR", groupR: "NR" },
      4: { all: "NR", groupR: "R-7.5ci" },
      5: { all: "R-7.5ci", groupR: "R-7.5ci" },
      6: { all: "R-7.5ci", groupR: "R-10ci" },
      7: { all: "R-10ci", groupR: "R-10ci" },
      8: { all: "R-12.5ci", groupR: "R-12.5ci" },
    },
  },
  {
    assembly: "Mass",
    group: "Floors",
    values: {
      1: { all: "NR", groupR: "NR" },
      2: { all: "R-6.3ci", groupR: "R-8.3ci" },
      3: { all: "R-10ci", groupR: "R-10ci" },
      4: { all: "R-10ci", groupR: "R-10.4ci" },
      5: { all: "R-10ci", groupR: "R-12.5ci" },
      6: { all: "R-12.5ci", groupR: "R-12.5ci" },
      7: { all: "R-15ci", groupR: "R-16.7ci" },
      8: { all: "R-15ci", groupR: "R-16.7ci" },
    },
  },
  {
    assembly: "Joist / framing",
    group: "Floors",
    values: {
      1: { all: "NR", groupR: "NR" },
      2: { all: "R-30", groupR: "R-30" },
      3: { all: "R-30", groupR: "R-30" },
      4: { all: "R-30", groupR: "R-30" },
      5: { all: "R-30", groupR: "R-30" },
      6: { all: "R-30", groupR: "R-30" },
      7: { all: "R-38", groupR: "R-38" },
      8: { all: "R-38", groupR: "R-38" },
    },
  },
  {
    assembly: "Unheated slabs",
    group: "Slab-on-grade",
    values: {
      1: { all: "NR", groupR: "NR" },
      2: { all: "NR", groupR: "NR" },
      3: { all: "NR", groupR: "NR" },
      4: { all: "R-10 for 24\" below", groupR: "R-15 for 24\" below" },
      5: { all: "R-10 for 24\" below", groupR: "R-15 for 24\" below" },
      6: { all: "R-15 for 24\" below", groupR: "R-20 for 24\" below" },
      7: { all: "R-15 for 24\" below", groupR: "R-20 for 24\" below" },
      8: { all: "R-20 for 24\" below", groupR: "R-20 for 24\" below" },
    },
  },
  {
    assembly: "Heated slabs",
    group: "Slab-on-grade",
    values: {
      1: { all: "R-7.5 for 12\" + R-5 full slab", groupR: "R-7.5 for 12\" + R-5 full slab" },
      2: { all: "R-7.5 for 12\" + R-5 full slab", groupR: "R-7.5 for 12\" + R-5 full slab" },
      3: { all: "R-10 for 24\" + R-5 full slab", groupR: "R-10 for 24\" + R-5 full slab" },
      4: { all: "R-15 for 24\" + R-5 full slab", groupR: "R-15 for 24\" + R-5 full slab" },
      5: { all: "R-15 for 36\" + R-5 full slab", groupR: "R-15 for 36\" + R-5 full slab" },
      6: { all: "R-15 for 36\" + R-5 full slab", groupR: "R-20 for 48\" + R-5 full slab" },
      7: { all: "R-20 for 24\" + R-5 full slab", groupR: "R-20 for 48\" + R-5 full slab" },
      8: { all: "R-20 for 48\" + R-5 full slab", groupR: "R-20 for 48\" + R-5 full slab" },
    },
  },
  {
    assembly: "Nonswinging doors",
    group: "Opaque doors",
    values: {
      1: { all: "R-4.75", groupR: "R-4.75" },
      2: { all: "R-4.75", groupR: "R-4.75" },
      3: { all: "R-4.75", groupR: "R-4.75" },
      4: { all: "R-4.75", groupR: "R-4.75" },
      5: { all: "R-4.75", groupR: "R-4.75" },
      6: { all: "R-4.75", groupR: "R-4.75" },
      7: { all: "R-4.75", groupR: "R-4.75" },
      8: { all: "R-4.75", groupR: "R-4.75" },
    },
  },
];

export type UFactorKind =
  | "roofAbove"
  | "roofMetal"
  | "roofAttic"
  | "wallMass"
  | "wallMetalBldg"
  | "wallMetalFramed"
  | "wallWood"
  | "belowGrade"
  | "floorMass"
  | "floorJoist"
  | "slabUnheated"
  | "slabHeated"
  | "doorSwing"
  | "doorGarage";

type UF = Record<ClimateZoneNumber, { all: number; groupR: number }>;

/** Table C402.1.4 — maximum U / C / F factors */
export const COM_UFACTOR: Record<UFactorKind, { label: string; group: string; unit: "U" | "C" | "F"; values: UF }> = {
  roofAbove: {
    label: "Insulation entirely above deck",
    group: "Roofs",
    unit: "U",
    values: {
      1: { all: 0.048, groupR: 0.039 }, 2: { all: 0.039, groupR: 0.039 }, 3: { all: 0.039, groupR: 0.039 },
      4: { all: 0.032, groupR: 0.032 }, 5: { all: 0.032, groupR: 0.032 }, 6: { all: 0.032, groupR: 0.032 },
      7: { all: 0.028, groupR: 0.028 }, 8: { all: 0.028, groupR: 0.028 },
    },
  },
  roofMetal: {
    label: "Metal buildings",
    group: "Roofs",
    unit: "U",
    values: {
      1: { all: 0.044, groupR: 0.035 }, 2: { all: 0.035, groupR: 0.035 }, 3: { all: 0.035, groupR: 0.035 },
      4: { all: 0.035, groupR: 0.035 }, 5: { all: 0.035, groupR: 0.035 }, 6: { all: 0.031, groupR: 0.031 },
      7: { all: 0.029, groupR: 0.029 }, 8: { all: 0.029, groupR: 0.029 },
    },
  },
  roofAttic: {
    label: "Attic and other",
    group: "Roofs",
    unit: "U",
    values: {
      1: { all: 0.027, groupR: 0.027 }, 2: { all: 0.027, groupR: 0.027 }, 3: { all: 0.027, groupR: 0.027 },
      4: { all: 0.027, groupR: 0.021 }, 5: { all: 0.021, groupR: 0.021 }, 6: { all: 0.021, groupR: 0.021 },
      7: { all: 0.021, groupR: 0.021 }, 8: { all: 0.021, groupR: 0.021 },
    },
  },
  wallMass: {
    label: "Mass",
    group: "Walls, above grade",
    unit: "U",
    values: {
      1: { all: 0.151, groupR: 0.151 }, 2: { all: 0.123, groupR: 0.104 }, 3: { all: 0.104, groupR: 0.090 },
      4: { all: 0.090, groupR: 0.078 }, 5: { all: 0.080, groupR: 0.071 }, 6: { all: 0.071, groupR: 0.071 },
      7: { all: 0.071, groupR: 0.061 }, 8: { all: 0.037, groupR: 0.037 },
    },
  },
  wallMetalBldg: {
    label: "Metal building",
    group: "Walls, above grade",
    unit: "U",
    values: {
      1: { all: 0.079, groupR: 0.079 }, 2: { all: 0.079, groupR: 0.052 }, 3: { all: 0.079, groupR: 0.052 },
      4: { all: 0.052, groupR: 0.052 }, 5: { all: 0.052, groupR: 0.052 }, 6: { all: 0.052, groupR: 0.052 },
      7: { all: 0.052, groupR: 0.039 }, 8: { all: 0.039, groupR: 0.039 },
    },
  },
  wallMetalFramed: {
    label: "Metal framed",
    group: "Walls, above grade",
    unit: "U",
    values: {
      1: { all: 0.077, groupR: 0.077 }, 2: { all: 0.077, groupR: 0.064 }, 3: { all: 0.064, groupR: 0.064 },
      4: { all: 0.064, groupR: 0.064 }, 5: { all: 0.064, groupR: 0.055 }, 6: { all: 0.049, groupR: 0.049 },
      7: { all: 0.049, groupR: 0.042 }, 8: { all: 0.037, groupR: 0.037 },
    },
  },
  wallWood: {
    label: "Wood framed and other",
    group: "Walls, above grade",
    unit: "U",
    values: {
      1: { all: 0.064, groupR: 0.064 }, 2: { all: 0.064, groupR: 0.064 }, 3: { all: 0.064, groupR: 0.064 },
      4: { all: 0.064, groupR: 0.064 }, 5: { all: 0.064, groupR: 0.051 }, 6: { all: 0.051, groupR: 0.051 },
      7: { all: 0.051, groupR: 0.051 }, 8: { all: 0.032, groupR: 0.032 },
    },
  },
  belowGrade: {
    label: "Below-grade wall",
    group: "Walls, below grade",
    unit: "C",
    values: {
      1: { all: 1.14, groupR: 1.14 }, 2: { all: 1.14, groupR: 1.14 }, 3: { all: 1.14, groupR: 1.14 },
      4: { all: 1.14, groupR: 0.119 }, 5: { all: 0.119, groupR: 0.119 }, 6: { all: 0.119, groupR: 0.092 },
      7: { all: 0.092, groupR: 0.092 }, 8: { all: 0.075, groupR: 0.075 },
    },
  },
  floorMass: {
    label: "Mass",
    group: "Floors",
    unit: "U",
    values: {
      1: { all: 0.322, groupR: 0.322 }, 2: { all: 0.107, groupR: 0.087 }, 3: { all: 0.074, groupR: 0.074 },
      4: { all: 0.074, groupR: 0.064 }, 5: { all: 0.074, groupR: 0.064 }, 6: { all: 0.064, groupR: 0.057 },
      7: { all: 0.055, groupR: 0.051 }, 8: { all: 0.055, groupR: 0.051 },
    },
  },
  floorJoist: {
    label: "Joist / framing",
    group: "Floors",
    unit: "U",
    values: {
      1: { all: 0.066, groupR: 0.066 }, 2: { all: 0.033, groupR: 0.033 }, 3: { all: 0.033, groupR: 0.033 },
      4: { all: 0.033, groupR: 0.033 }, 5: { all: 0.033, groupR: 0.033 }, 6: { all: 0.033, groupR: 0.033 },
      7: { all: 0.028, groupR: 0.028 }, 8: { all: 0.028, groupR: 0.028 },
    },
  },
  slabUnheated: {
    label: "Unheated slabs",
    group: "Slab-on-grade",
    unit: "F",
    values: {
      1: { all: 0.73, groupR: 0.73 }, 2: { all: 0.73, groupR: 0.73 }, 3: { all: 0.73, groupR: 0.73 },
      4: { all: 0.54, groupR: 0.52 }, 5: { all: 0.54, groupR: 0.52 }, 6: { all: 0.52, groupR: 0.40 },
      7: { all: 0.52, groupR: 0.40 }, 8: { all: 0.40, groupR: 0.40 },
    },
  },
  slabHeated: {
    label: "Heated slabs (perimeter F)",
    group: "Slab-on-grade",
    unit: "F",
    values: {
      1: { all: 1.02, groupR: 1.02 }, 2: { all: 1.02, groupR: 1.02 }, 3: { all: 0.90, groupR: 0.90 },
      4: { all: 0.86, groupR: 0.86 }, 5: { all: 0.86, groupR: 0.86 }, 6: { all: 0.69, groupR: 0.69 },
      7: { all: 0.69, groupR: 0.69 }, 8: { all: 0.69, groupR: 0.69 },
    },
  },
  doorSwing: {
    label: "Swinging door",
    group: "Opaque doors",
    unit: "U",
    values: {
      1: { all: 0.61, groupR: 0.61 }, 2: { all: 0.61, groupR: 0.61 }, 3: { all: 0.61, groupR: 0.61 },
      4: { all: 0.37, groupR: 0.37 }, 5: { all: 0.37, groupR: 0.37 }, 6: { all: 0.37, groupR: 0.37 },
      7: { all: 0.37, groupR: 0.37 }, 8: { all: 0.37, groupR: 0.37 },
    },
  },
  doorGarage: {
    label: "Garage door <14% glazing",
    group: "Opaque doors",
    unit: "U",
    values: {
      1: { all: 0.31, groupR: 0.31 }, 2: { all: 0.31, groupR: 0.31 }, 3: { all: 0.31, groupR: 0.31 },
      4: { all: 0.31, groupR: 0.31 }, 5: { all: 0.31, groupR: 0.31 }, 6: { all: 0.31, groupR: 0.31 },
      7: { all: 0.31, groupR: 0.31 }, 8: { all: 0.31, groupR: 0.31 },
    },
  },
};

export function comU(kind: UFactorKind, zone: ClimateKey, occ: Occ): number {
  const col = commercialColumn(zone);
  const v = COM_UFACTOR[kind].values[col];
  return occ === "groupR" ? v.groupR : v.all;
}

export function comR(assembly: string, group: string, zone: ClimateKey, occ: Occ): string {
  const col = commercialColumn(zone);
  const row = COM_RVALUE.find((r) => r.assembly === assembly && r.group === group);
  if (!row) return "—";
  const v = row.values[col];
  return occ === "groupR" ? v.groupR : v.all;
}

export const VERTICAL_FEN_MAX = 0.3;
export const VERTICAL_FEN_DAYLIGHT = 0.4;
export const SKYLIGHT_MAX = 0.03;
export const SKYLIGHT_DAYLIGHT = 0.06;
export const AIR_LEAKAGE_MAX = 0.4;

export type FenRow = {
  fixedU: number;
  operU: number;
  entranceU: number;
  shgc: { sew: number | null; n: number | null }[];
  skyU: number;
  skyShgc: number | null;
};

/** Table C402.4 */
export const FEN_C402: Record<ClimateZoneNumber, FenRow> = {
  1: { fixedU: 0.5, operU: 0.65, entranceU: 1.1, shgc: [{ sew: 0.25, n: 0.33 }, { sew: 0.3, n: 0.37 }, { sew: 0.4, n: 0.4 }], skyU: 0.75, skyShgc: 0.35 },
  2: { fixedU: 0.5, operU: 0.65, entranceU: 0.83, shgc: [{ sew: 0.25, n: 0.33 }, { sew: 0.3, n: 0.37 }, { sew: 0.4, n: 0.4 }], skyU: 0.65, skyShgc: 0.35 },
  3: { fixedU: 0.46, operU: 0.6, entranceU: 0.77, shgc: [{ sew: 0.25, n: 0.33 }, { sew: 0.3, n: 0.37 }, { sew: 0.4, n: 0.4 }], skyU: 0.55, skyShgc: 0.35 },
  4: { fixedU: 0.38, operU: 0.45, entranceU: 0.77, shgc: [{ sew: 0.36, n: 0.48 }, { sew: 0.43, n: 0.53 }, { sew: 0.58, n: 0.58 }], skyU: 0.5, skyShgc: 0.4 },
  5: { fixedU: 0.38, operU: 0.45, entranceU: 0.77, shgc: [{ sew: 0.38, n: 0.51 }, { sew: 0.46, n: 0.56 }, { sew: 0.61, n: 0.61 }], skyU: 0.5, skyShgc: 0.4 },
  6: { fixedU: 0.36, operU: 0.43, entranceU: 0.77, shgc: [{ sew: 0.4, n: 0.53 }, { sew: 0.48, n: 0.58 }, { sew: 0.64, n: 0.64 }], skyU: 0.5, skyShgc: 0.4 },
  7: { fixedU: 0.29, operU: 0.37, entranceU: 0.77, shgc: [{ sew: 0.45, n: null }, { sew: null, n: null }, { sew: null, n: null }], skyU: 0.5, skyShgc: null },
  8: { fixedU: 0.29, operU: 0.37, entranceU: 0.77, shgc: [{ sew: null, n: null }, { sew: null, n: null }, { sew: null, n: null }], skyU: 0.5, skyShgc: null },
};

export function fenFor(zone: ClimateKey): FenRow {
  return FEN_C402[commercialColumn(zone)];
}

export function projectionFactor(a: number, b: number): number {
  if (b <= 0) return 0;
  return a / b;
}

export function pfBin(pf: number): 0 | 1 | 2 {
  if (pf < 0.2) return 0;
  if (pf < 0.5) return 1;
  return 2;
}

export function skylightEffectiveAperture(area: number, vt: number, wellDepthFt: number, toplit: number): number {
  const wf = wellDepthFt < 2 ? 0.9 : 0.7;
  if (toplit <= 0) return 0;
  return (0.85 * area * vt * wf) / toplit;
}

export function agedReflectance(initial: number): number {
  return 0.2 + 0.7 * (initial - 0.2);
}

export const AIR_LEAKAGE_FEN = [
  { type: "Glazed swinging entrance doors", rate: 1.0, std: "NFRC 400 or AAMA/WDMA/CSA 101/I.S.2/A440" },
  { type: "Curtain wall / storefront", rate: 0.06, std: "NFRC 400 or AAMA/WDMA/CSA 101/I.S.2/A440" },
  { type: "Power-operated sliding / folding doors", rate: 1.0, std: "AAMA 1607" },
  { type: "Revolving doors", rate: 1.0, std: "NFRC 400 or AAMA/WDMA/CSA 101/I.S.2/A440" },
  { type: "Garage doors", rate: 0.4, std: "ANSI/DASMA 105" },
  { type: "Rolling doors", rate: 1.0, std: "ANSI/DASMA 105" },
  { type: "High-speed doors", rate: 1.3, std: "ANSI/DASMA 105" },
];
