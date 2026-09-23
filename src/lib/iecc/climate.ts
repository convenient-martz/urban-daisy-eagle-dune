import type { ClimateKey, ClimateZoneNumber, CountyHit } from "./types";
import { COUNTY_RAW } from "./counties";

export const CLIMATE_KEYS: ClimateKey[] = [
  "1A",
  "1B",
  "2A",
  "2B",
  "3A",
  "3B",
  "3C",
  "4A",
  "4B",
  "4C",
  "5A",
  "5B",
  "5C",
  "6A",
  "6B",
  "7",
  "8",
];

export const STATES: { code: string; name: string }[] = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
  { code: "AS", name: "American Samoa" },
  { code: "GU", name: "Guam" },
  { code: "MP", name: "Northern Mariana Islands" },
  { code: "PR", name: "Puerto Rico" },
  { code: "VI", name: "U.S. Virgin Islands" },
];

let cache: CountyHit[] | null = null;

export function allCounties(): CountyHit[] {
  if (cache) return cache;
  const rows: CountyHit[] = [];
  let state = "";
  for (const line of COUNTY_RAW.split("\n")) {
    const t = line.trim();
    if (!t) continue;
    if (/^[A-Z]{2}$/.test(t)) {
      state = t;
      continue;
    }
    for (const part of t.split(",")) {
      const p = part.trim();
      if (!p) continue;
      const m = p.match(/^(.+?):(\d[ABC]?)(\*?)$/);
      if (!m) continue;
      const zone = m[2] as ClimateKey;
      rows.push({
        state,
        county: m[1],
        zone,
        warmHumid: m[3] === "*",
      });
    }
  }
  cache = rows;
  return rows;
}

export function searchCounties(q: string, state?: string): CountyHit[] {
  const query = q.trim().toLowerCase();
  return allCounties()
    .filter((c) => {
      if (state && c.state !== state) return false;
      if (!query) return true;
      return c.county.toLowerCase().includes(query);
    })
    .slice(0, 80);
}

export function zoneNumber(zone: ClimateKey): ClimateZoneNumber {
  return Number(zone[0]) as ClimateZoneNumber;
}

export function moistureOf(zone: ClimateKey): "A" | "B" | "C" | "" {
  const m = zone.slice(1);
  if (m === "A" || m === "B" || m === "C") return m;
  return "";
}

/** Residential Table R402 grouping: Marine 4 uses CZ5 column; 7 and 8 share a column. */
export function residentialColumn(zone: ClimateKey): "1" | "2" | "3" | "4" | "5" | "6" | "7" {
  const n = zoneNumber(zone);
  if (n === 4 && moistureOf(zone) === "C") return "5";
  if (n >= 7) return "7";
  return String(n) as "1" | "2" | "3" | "4" | "5" | "6";
}

/** Commercial: “4 except Marine” vs “5 and Marine 4”. */
export function commercialColumn(zone: ClimateKey): ClimateZoneNumber {
  const n = zoneNumber(zone);
  if (n === 4 && moistureOf(zone) === "C") return 5;
  return n;
}

export function isMarine4(zone: ClimateKey): boolean {
  return zone === "4C";
}

export function zoneLabel(zone: ClimateKey): string {
  const n = zoneNumber(zone);
  const m = moistureOf(zone);
  const moist =
    m === "A" ? "Moist" : m === "B" ? "Dry" : m === "C" ? "Marine" : n >= 7 ? "—" : "";
  return `Climate Zone ${zone}${moist ? ` (${moist})` : ""}`;
}

/** Table C301.3(1) Dry (B): P_m < 0.44 × (T_F − 19.5) */
export function isDryClimate(annualPrecipIn: number, meanTempF: number): boolean {
  return annualPrecipIn < 0.44 * (meanTempF - 19.5);
}

export function dryThresholdInches(meanTempF: number): number {
  return 0.44 * (meanTempF - 19.5);
}

/**
 * Table C301.3(2) thermal criteria (IP). Marine locations use 3C/4C rows.
 * Apply marine test first, then this thermal table, then A/B moisture.
 */
export function zoneFromDegreeDays(opts: {
  cdd50: number;
  hdd65: number;
  marine: boolean;
  dry: boolean;
}): ClimateKey {
  const { cdd50, hdd65, marine, dry } = opts;
  if (marine) {
    if (hdd65 <= 3600) return "3C";
    return "4C";
  }
  let n: ClimateZoneNumber;
  if (cdd50 > 9000) n = 1;
  else if (cdd50 > 6300) n = 2;
  else if (cdd50 > 4500 && hdd65 <= 5400) n = 3;
  else if (cdd50 <= 4500 && hdd65 <= 5400) n = 4;
  else if (hdd65 <= 7200) n = 5;
  else if (hdd65 <= 9000) n = 6;
  else if (hdd65 <= 12600) n = 7;
  else n = 8;

  if (n >= 7) return String(n) as ClimateKey;
  return `${n}${dry ? "B" : "A"}` as ClimateKey;
}

export const THERMAL_CRITERIA = [
  { zone: "1", ip: "9000 < CDD50°F", si: "5000 < CDD10°C" },
  { zone: "2", ip: "6300 < CDD50°F ≤ 9000", si: "3500 < CDD10°C ≤ 5000" },
  { zone: "3A and 3B", ip: "4500 < CDD50°F ≤ 6300 AND HDD65°F ≤ 5400", si: "2500 < CDD10°C ≤ 3500 AND HDD18°C ≤ 3000" },
  { zone: "4A and 4B", ip: "CDD50°F ≤ 4500 AND HDD65°F ≤ 5400", si: "CDD10°C ≤ 2500 AND HDD18°C ≤ 3000" },
  { zone: "3C", ip: "HDD65°F ≤ 3600", si: "HDD18°C ≤ 2000" },
  { zone: "4C", ip: "3600 < HDD65°F ≤ 5400", si: "2000 < HDD18°C ≤ 3000" },
  { zone: "5", ip: "5400 < HDD65°F ≤ 7200", si: "3000 < HDD18°C ≤ 4000" },
  { zone: "6", ip: "7200 < HDD65°F ≤ 9000", si: "4000 < HDD18°C ≤ 5000" },
  { zone: "7", ip: "9000 < HDD65°F ≤ 12600", si: "5000 < HDD18°C ≤ 7000" },
  { zone: "8", ip: "12600 < HDD65°F", si: "7000 < HDD18°C" },
];

export const INTERIOR_DESIGN = {
  heatingMaxF: 72,
  coolingMinF: 75,
  note: "C302.1 / R302.1 — interior design temperatures used for heating and cooling load calculations shall be a maximum of 72°F for heating and minimum of 75°F for cooling.",
};
