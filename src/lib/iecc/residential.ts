import type { ClimateKey } from "./types";
import { residentialColumn } from "./climate";

export type ResCol = "1" | "2" | "3" | "4" | "5" | "6" | "7";

export type ResEnvelope = {
  fenU: number | null;
  skyU: number;
  shgc: number | null;
  ceilingR: string;
  woodWallR: string;
  massWallR: string;
  floorR: string;
  basementR: string;
  slabR: string;
  crawlR: string;
  fenUeq: number;
  skyUeq: number;
  ceilingU: number;
  wallU: number;
  massU: number;
  floorU: number;
  basementU: number;
  crawlU: number;
};

/** Tables R402.1.2 and R402.1.4 */
export const RES_ENVELOPE: Record<ResCol, ResEnvelope> = {
  "1": {
    fenU: null, skyU: 0.75, shgc: 0.25, ceilingR: "R-30", woodWallR: "R-13", massWallR: "R-3 / R-4",
    floorR: "R-13", basementR: "0", slabR: "0", crawlR: "0",
    fenUeq: 0.50, skyUeq: 0.75, ceilingU: 0.035, wallU: 0.084, massU: 0.197, floorU: 0.064, basementU: 0.36, crawlU: 0.477,
  },
  "2": {
    fenU: 0.40, skyU: 0.65, shgc: 0.25, ceilingR: "R-38", woodWallR: "R-13", massWallR: "R-4 / R-6",
    floorR: "R-13", basementR: "0", slabR: "0", crawlR: "0",
    fenUeq: 0.40, skyUeq: 0.65, ceilingU: 0.030, wallU: 0.084, massU: 0.165, floorU: 0.064, basementU: 0.36, crawlU: 0.477,
  },
  "3": {
    fenU: 0.32, skyU: 0.55, shgc: 0.25, ceilingR: "R-38", woodWallR: "R-20 or 13+5ci", massWallR: "R-8 / R-13",
    floorR: "R-19", basementR: "5/13", slabR: "0", crawlR: "5/13",
    fenUeq: 0.32, skyUeq: 0.55, ceilingU: 0.030, wallU: 0.060, massU: 0.098, floorU: 0.047, basementU: 0.091, crawlU: 0.136,
  },
  "4": {
    fenU: 0.32, skyU: 0.55, shgc: 0.40, ceilingR: "R-49", woodWallR: "R-20 or 13+5ci", massWallR: "R-8 / R-13",
    floorR: "R-19", basementR: "10/13", slabR: "R-10, 2 ft", crawlR: "10/13",
    fenUeq: 0.32, skyUeq: 0.55, ceilingU: 0.026, wallU: 0.060, massU: 0.098, floorU: 0.047, basementU: 0.059, crawlU: 0.065,
  },
  "5": {
    fenU: 0.30, skyU: 0.55, shgc: null, ceilingR: "R-49", woodWallR: "R-20 or 13+5ci", massWallR: "R-13 / R-17",
    floorR: "R-30", basementR: "15/19", slabR: "R-10, 2 ft", crawlR: "15/19",
    fenUeq: 0.30, skyUeq: 0.55, ceilingU: 0.026, wallU: 0.060, massU: 0.082, floorU: 0.033, basementU: 0.050, crawlU: 0.055,
  },
  "6": {
    fenU: 0.30, skyU: 0.55, shgc: null, ceilingR: "R-49", woodWallR: "R-20+5ci or 13+10ci", massWallR: "R-15 / R-20",
    floorR: "R-30", basementR: "15/19", slabR: "R-10, 4 ft", crawlR: "15/19",
    fenUeq: 0.30, skyUeq: 0.55, ceilingU: 0.026, wallU: 0.045, massU: 0.060, floorU: 0.033, basementU: 0.050, crawlU: 0.055,
  },
  "7": {
    fenU: 0.30, skyU: 0.55, shgc: null, ceilingR: "R-49", woodWallR: "R-20+5ci or 13+10ci", massWallR: "R-19 / R-21",
    floorR: "R-38", basementR: "15/19", slabR: "R-10, 4 ft", crawlR: "15/19",
    fenUeq: 0.30, skyUeq: 0.55, ceilingU: 0.026, wallU: 0.045, massU: 0.057, floorU: 0.028, basementU: 0.050, crawlU: 0.055,
  },
};

export const RES_COL_LABEL: Record<ResCol, string> = {
  "1": "Zone 1",
  "2": "Zone 2",
  "3": "Zone 3",
  "4": "Zone 4 except Marine",
  "5": "Zone 5 and Marine 4",
  "6": "Zone 6",
  "7": "Zones 7 and 8",
};

export function resFor(zone: ClimateKey): ResEnvelope {
  return RES_ENVELOPE[residentialColumn(zone)];
}

export const MASS_WALL_INTERIOR_U: Record<ResCol, number> = {
  "1": 0.17, "2": 0.14, "3": 0.12, "4": 0.087, "5": 0.065, "6": 0.057, "7": 0.057,
};

export const ERI_MAX: Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, number> = {
  1: 57, 2: 57, 3: 57, 4: 62, 5: 61, 6: 61, 7: 58, 8: 58,
};

export function eriMax(zone: ClimateKey): number {
  return ERI_MAX[Number(zone[0]) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8];
}

export function ach50Limit(zone: ClimateKey): number {
  return Number(zone[0]) <= 2 ? 5 : 3;
}

export function wholeHouseVentCfm(cfa: number, bedrooms: number): number {
  return 0.01 * cfa + 7.5 * (bedrooms + 1);
}

export const FAN_EFFICACY = [
  { location: "HRV or ERV", airflow: "Any", efficacy: 1.2 },
  { location: "In-line supply or exhaust fan", airflow: "Any", efficacy: 2.8 },
  { location: "Other exhaust fan", airflow: "≥ 10 cfm", efficacy: 2.8 },
  { location: "Bathroom, utility room", airflow: "≥ 90 cfm", efficacy: 2.8 },
];

export const STEEL_FRAME = [
  { wood: "R-30 (steel truss ceiling)", steel: "R-38 or R-30+3 or R-26+5" },
  { wood: "R-38 (steel truss ceiling)", steel: "R-49 or R-38+3" },
  { wood: "R-49 (steel truss ceiling)", steel: "R-38+5" },
  { wood: "R-30 (steel joist ceiling)", steel: "R-38 in 2×4/2×6/2×8 or R-49 any" },
  { wood: "R-38 (steel joist ceiling)", steel: "R-49 in 2×4 through 2×10" },
  { wood: "R-13 wall, 16 in o.c.", steel: "R-13+4.2 or R-19+2.8 or R-0+9.3 or R-15+3.8 or R-21+3.1" },
  { wood: "R-13+3 wall, 16 in o.c.", steel: "R-0+11.2 or R-13+6.1 or R-15+5.7 or R-19+5.0 or R-21+4.7" },
  { wood: "R-20 wall, 16 in o.c.", steel: "R-0+14.0 or R-13+8.9 or R-15+8.5 or R-19+7.8 or R-21+7.5" },
  { wood: "R-20+5 wall, 16 in o.c.", steel: "R-13+12.7 or R-15+12.3 or R-19+11.6 or R-21+11.3 or R-25+10.9" },
  { wood: "R-21 wall, 16 in o.c.", steel: "R-0+14.6 or R-13+9.5 or R-15+9.1 or R-19+8.4 or R-21+8.1 or R-25+7.7" },
  { wood: "R-13 wall, 24 in o.c.", steel: "R-0+9.3 or R-13+3.0 or R-15+2.4" },
  { wood: "R-13+3 wall, 24 in o.c.", steel: "R-0+11.2 or R-13+4.9 or R-15+4.3 or R-19+3.5 or R-21+3.1" },
  { wood: "R-20 wall, 24 in o.c.", steel: "R-0+14.0 or R-13+7.7 or R-15+7.1 or R-19+6.3 or R-21+5.9" },
  { wood: "R-20+5 wall, 24 in o.c.", steel: "R-13+11.5 or R-15+10.9 or R-19+10.1 or R-21+9.7 or R-25+9.1" },
  { wood: "R-21 wall, 24 in o.c.", steel: "R-0+14.6 or R-13+8.3 or R-15+7.7 or R-19+6.9 or R-21+6.5 or R-25+5.9" },
  { wood: "R-13 steel joist floor", steel: "R-19 in 2×6, or R-19+6 in 2×8/2×10" },
  { wood: "R-19 steel joist floor", steel: "R-19+6 in 2×6, or R-19+12 in 2×8/2×10" },
];

export const STEEL_STUD_ER = [
  { depth: '3½"', spacing: 16, cavity: 13, fc: 0.46, er: 5.98 },
  { depth: '3½"', spacing: 16, cavity: 15, fc: 0.43, er: 6.45 },
  { depth: '3½"', spacing: 24, cavity: 13, fc: 0.55, er: 7.15 },
  { depth: '3½"', spacing: 24, cavity: 15, fc: 0.52, er: 7.8 },
  { depth: "6\"", spacing: 16, cavity: 19, fc: 0.37, er: 7.03 },
  { depth: "6\"", spacing: 16, cavity: 21, fc: 0.35, er: 7.35 },
  { depth: "6\"", spacing: 24, cavity: 19, fc: 0.45, er: 8.55 },
  { depth: "6\"", spacing: 24, cavity: 21, fc: 0.43, er: 9.03 },
  { depth: "8\"", spacing: 16, cavity: 25, fc: 0.31, er: 7.75 },
  { depth: "8\"", spacing: 24, cavity: 25, fc: 0.38, er: 9.5 },
];

export function steelStudU(rs: number, er: number): number {
  return 1 / (rs + er);
}

export const DUCT_R = {
  attic: "R-8",
  other: "R-6",
  leakageTotal: 4,
  leakageRoughInAH: 3,
  leakageRoughInNoAH: 4,
};

export const TRADEOFF_CAPS = {
  fenU_z45: 0.48,
  fenU_z68: 0.4,
  skyU_z48: 0.75,
  shgc_z13: 0.5,
};

export const SUNROOM = {
  ceilingR_z14: 19,
  ceilingR_z58: 24,
  wallR: 13,
  fenU: 0.45,
  skyU: 0.7,
};

export type UaAssemblyKind =
  | "ceiling"
  | "wall"
  | "massWall"
  | "floor"
  | "basement"
  | "crawl"
  | "fenestration"
  | "skylight"
  | "door";

export const UA_KINDS: { id: UaAssemblyKind; label: string }[] = [
  { id: "ceiling", label: "Ceiling / roof" },
  { id: "wall", label: "Frame wall" },
  { id: "massWall", label: "Mass wall" },
  { id: "floor", label: "Floor" },
  { id: "basement", label: "Basement wall" },
  { id: "crawl", label: "Crawl space wall" },
  { id: "fenestration", label: "Vertical fenestration" },
  { id: "skylight", label: "Skylight" },
  { id: "door", label: "Opaque door" },
];

export function codeU(kind: UaAssemblyKind, env: ResEnvelope): number {
  switch (kind) {
    case "ceiling":
      return env.ceilingU;
    case "wall":
      return env.wallU;
    case "massWall":
      return env.massU;
    case "floor":
      return env.floorU;
    case "basement":
      return env.basementU;
    case "crawl":
      return env.crawlU;
    case "fenestration":
    case "door":
      return env.fenUeq;
    case "skylight":
      return env.skyUeq;
  }
}
