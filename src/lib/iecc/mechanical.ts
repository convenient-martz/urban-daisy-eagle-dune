import type { ClimateKey } from "./types";
import { moistureOf, zoneNumber } from "./climate";
import { clamp } from "@/lib/utils";

/** C403.8.1 fan power limitation coefficients */
export const FAN_COEFF = {
  nameplate: { cv: 0.0011, vav: 0.0015 },
  bhp: { cv: 0.00094, vav: 0.0013 },
};

export function fanNameplateHp(cfm: number, vav: boolean): number {
  return cfm * (vav ? FAN_COEFF.nameplate.vav : FAN_COEFF.nameplate.cv);
}

export function fanSystemBhp(cfm: number, vav: boolean, pressureAdjA = 0): number {
  return cfm * (vav ? FAN_COEFF.bhp.vav : FAN_COEFF.bhp.cv) + pressureAdjA;
}

/**
 * 2018 IECC Table C403.7.4.2(1)/(2) — minimum supply cfm at which ERV is required.
 * `null` means NR for that OA bin.
 */
const OA_BINS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8] as const;

type ErvRow = (number | null)[];

function ervGroup(zone: ClimateKey): "nr" | "a" | "b" | "c" {
  const n = zoneNumber(zone);
  const m = moistureOf(zone);
  if ((n === 3 && (m === "B" || m === "C")) || (n === 4 && (m === "B" || m === "C")) || (n === 5 && m === "B")) {
    return "nr";
  }
  if ((n === 1 || n === 2) && m === "B") return "b";
  if (n === 5 && m === "C") return "b";
  if (n === 6 && m === "B") return "c";
  if (n >= 7) return "c";
  return "a";
}

const ERV_LT8000: Record<"nr" | "a" | "b" | "c", ErvRow> = {
  nr: [null, null, null, null, null, null, null, null],
  a: [null, null, null, null, 26000, 12000, 5000, 4000],
  b: [null, null, null, 19500, 9000, 5000, 4000, 3000],
  c: [2500, 2000, 1000, 500, 140, 120, 100, 80],
};

const ERV_GE8000: Record<"nr" | "a" | "b" | "c", ErvRow> = {
  nr: [null, null, null, null, null, 26500, 20000, 4000],
  a: [26000, 16000, 5500, 4500, 3500, 2000, 1000, 120],
  b: [10000, 6500, 5500, 4500, 3500, 2000, 1000, 0],
  c: [0, 0, 0, 0, 0, 0, 0, 0],
};

export function ervThresholdCfm(zone: ClimateKey, oaFrac: number, hours8000: boolean): number | null {
  const row = (hours8000 ? ERV_GE8000 : ERV_LT8000)[ervGroup(zone)];
  let bin = 0;
  for (let i = 0; i < OA_BINS.length; i++) {
    if (oaFrac >= OA_BINS[i]) bin = i;
  }
  return row[bin] ?? null;
}

export function ervRequired(zone: ClimateKey, oaFrac: number, supplyCfm: number, hours8000: boolean): boolean {
  const t = ervThresholdCfm(zone, oaFrac, hours8000);
  if (t === null) return false;
  return supplyCfm >= t;
}

/** C403.3.2(3) PTAC / PTHP — Cap in Btu/h, bounded 7,000–15,000 */
export function ptacCap(btuh: number): number {
  return clamp(btuh, 7000, 15000);
}

export function ptacCoolEer(btuh: number, replacement = false): number {
  const c = ptacCap(btuh) / 1000;
  return replacement ? 10.9 - 0.213 * c : 14.0 - 0.3 * c;
}

export function pthpHeatCop(btuh: number, replacement = false): number {
  const c = ptacCap(btuh) / 1000;
  return replacement ? 2.9 - 0.026 * c : 3.7 - 0.052 * c;
}

/**
 * C403.3.2.1 centrifugal chiller lift adjustment.
 * A = LIFT = CEWT − CLWT (°F)
 * Eq 4-6 Path A (FL), Eq 4-7 Path B (IPLV)
 */
export function chillerKadj(liftF: number, path: "A" | "B"): number {
  const A = liftF;
  if (path === "A") {
    return 6.174722 - 0.303813 * A + 0.006251 * A ** 2 - 0.00004583 * A ** 3;
  }
  return 5.741807 - 0.287119 * A + 0.005995 * A ** 2 - 0.000043008 * A ** 3;
}

export function chillerAdjKwPerTon(tableKwPerTon: number, kadj: number): number {
  if (kadj <= 0) return Number.NaN;
  return tableKwPerTon / kadj;
}

/** C403.11.3 minimum insulation thickness (in) by fluid temp and NPS */
export const PIPE_INSULATION: {
  temp: string;
  conductivity: string;
  nps: Record<string, number>;
}[] = [
  {
    temp: "105–140°F",
    conductivity: "0.21–0.28",
    nps: { "<1\"": 1.0, "1–1¼\"": 1.0, "1½–3\"": 1.5, "4–6\"": 1.5, "≥8\"": 1.5 },
  },
  {
    temp: "141–200°F",
    conductivity: "0.25–0.29",
    nps: { "<1\"": 1.5, "1–1¼\"": 1.5, "1½–3\"": 2.0, "4–6\"": 2.0, "≥8\"": 2.0 },
  },
  {
    temp: "201–250°F",
    conductivity: "0.27–0.30",
    nps: { "<1\"": 2.0, "1–1¼\"": 2.5, "1½–3\"": 2.5, "4–6\"": 3.0, "≥8\"": 3.0 },
  },
  {
    temp: "251–350°F",
    conductivity: "0.29–0.32",
    nps: { "<1\"": 2.5, "1–1¼\"": 2.5, "1½–3\"": 3.0, "4–6\"": 3.5, "≥8\"": 3.5 },
  },
  {
    temp: "40–60°F (cooling)",
    conductivity: "0.21–0.27",
    nps: { "<1\"": 0.5, "1–1¼\"": 0.5, "1½–3\"": 1.0, "4–6\"": 1.0, "≥8\"": 1.0 },
  },
  {
    temp: "<40°F",
    conductivity: "0.20–0.26",
    nps: { "<1\"": 1.0, "1–1¼\"": 1.5, "1½–3\"": 1.5, "4–6\"": 1.5, "≥8\"": 1.5 },
  },
];

export const PIPE_NPS = ["<1\"", "1–1¼\"", "1½–3\"", "4–6\"", "≥8\""] as const;

/**
 * Equivalent thickness when installed k differs from table K.
 * T = r [ (1 + t/r)^(k/K) − 1 ]
 */
export function equivalentThickness(r: number, t: number, k: number, K: number): number {
  if (r <= 0 || K <= 0) return Number.NaN;
  return r * ((1 + t / r) ** (k / K) - 1);
}

/** Nominal pipe radius (in) for the NPS bins — outside radius of steel pipe */
export const PIPE_RADIUS_IN: Record<(typeof PIPE_NPS)[number], number> = {
  "<1\"": 0.42,
  "1–1¼\"": 0.83,
  "1½–3\"": 1.75,
  "4–6\"": 3.0,
  "≥8\"": 4.5,
};

export const SWH_TABLE: { equipment: string; size: string; efficiency: string }[] = [
  { equipment: "Electric storage ≤ 12 kW", size: "≥ 20 gal", efficiency: "UEF per 10 CFR 430" },
  { equipment: "Electric storage ≤ 12 kW, heat pump", size: "Any", efficiency: "UEF ≥ 2.00 (typical ≥55 gal)" },
  { equipment: "Gas storage ≤ 75 kBtu/h", size: "≥ 20 gal", efficiency: "UEF per 10 CFR 430" },
  { equipment: "Gas storage > 75 kBtu/h", size: "≤ 4,000 Btu/h·gal", efficiency: "80% Et, SL ≤ 110√V + 800/V/2 (Btu/h)" },
  { equipment: "Instantaneous gas ≥ 4,000 Btu/h·gal", size: "< 200 kBtu/h", efficiency: "UEF per 10 CFR 430" },
  { equipment: "Instantaneous gas ≥ 4,000 Btu/h·gal", size: "≥ 200 kBtu/h", efficiency: "80% Et" },
  { equipment: "Oil storage > 105 kBtu/h", size: "≤ 4,000 Btu/h·gal", efficiency: "80% Et, SL ≤ 110√V + 800/V/2" },
  { equipment: "Hot-water supply boiler, gas", size: "≥ 4,000 Btu/h·gal", efficiency: "80% Et" },
  { equipment: "Pool heater, gas", size: "Any", efficiency: "82% Et" },
  { equipment: "Unfired storage tank", size: "Any", efficiency: "R-12.5 insulation" },
];

export function standbyLossBtu(volumeGal: number): number {
  if (volumeGal <= 0) return Number.NaN;
  return 110 * Math.sqrt(volumeGal) + 800 / (volumeGal / 2);
}

export const HOOD_RATES: { type: string; light: number; medium: number; heavy: number; extra: number }[] = [
  { type: "Wall-mounted canopy", light: 250, medium: 300, heavy: 400, extra: 550 },
  { type: "Single island", light: 400, medium: 500, heavy: 600, extra: 700 },
  { type: "Double island (per side)", light: 250, medium: 300, heavy: 400, extra: 550 },
  { type: "Eyebrow", light: 250, medium: 250, heavy: 250, extra: 250 },
  { type: "Backshelf / passover", light: 300, medium: 300, heavy: 400, extra: 400 },
];

export const HW_PIPE_MIN = [
  { location: "Recirculating system piping, including supply and return", thickness: "1 in. (per C403.11.3 105–140°F)" },
  { location: "First 8 ft from storage tank (non-recirc)", thickness: "1 in." },
  { location: "Piping from a recirculating pump to a storage tank", thickness: "1 in." },
  { location: "Piping under a floor slab", thickness: "1 in." },
  { location: "Buried piping", thickness: "1 in." },
  { location: "Supply and return in a circulating system to the heating plant", thickness: "1 in." },
];

/** Default unlabeled fenestration Table C303.1.3(1) / R303.1.3 */
export const DEFAULT_FEN = [
  { desc: "Metal frame, single glazing", u: 1.2, shgc: 0.82, vt: 0.76 },
  { desc: "Metal frame, single + operable", u: 1.2, shgc: 0.82, vt: 0.76 },
  { desc: "Metal frame, double glazing", u: 0.8, shgc: 0.7, vt: 0.64 },
  { desc: "Metal frame, double + low-e", u: 0.65, shgc: 0.4, vt: 0.44 },
  { desc: "Nonmetal frame, single glazing", u: 0.95, shgc: 0.82, vt: 0.76 },
  { desc: "Nonmetal frame, double glazing", u: 0.55, shgc: 0.7, vt: 0.64 },
  { desc: "Nonmetal frame, double + low-e", u: 0.4, shgc: 0.4, vt: 0.44 },
  { desc: "Glazed block", u: 0.6, shgc: 0.6, vt: 0.56 },
  { desc: "Skylight, metal, single", u: 1.98, shgc: 0.82, vt: 0.76 },
  { desc: "Skylight, metal, double", u: 1.31, shgc: 0.7, vt: 0.64 },
];

export const OPAQUE_DOOR_DEFAULT = { swinging: 0.7, nonswinging: 0.5 };
