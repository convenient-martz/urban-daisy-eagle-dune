export type ClimateZoneNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Moisture = "A" | "B" | "C" | "";
export type ClimateKey =
  | "1A"
  | "1B"
  | "2A"
  | "2B"
  | "3A"
  | "3B"
  | "3C"
  | "4A"
  | "4B"
  | "4C"
  | "5A"
  | "5B"
  | "5C"
  | "6A"
  | "6B"
  | "7"
  | "8";

export type CountyHit = {
  state: string;
  county: string;
  zone: ClimateKey;
  warmHumid: boolean;
};

export type Pass = "pass" | "fail" | "na" | "info";

export type CalcId =
  | "home"
  | "snapshots"
  | "climate"
  | "res-envelope"
  | "res-ua"
  | "res-air"
  | "steel"
  | "com-envelope"
  | "com-ua"
  | "fenestration"
  | "defaults"
  | "skylight"
  | "lpd-building"
  | "lpd-space"
  | "lpd-exterior"
  | "fan"
  | "erv"
  | "hvac"
  | "chiller"
  | "pipe"
  | "swh"
  | "hw-pipe"
  | "eri"
  | "reflectance"
  | "hood"
  | "formulas"
  | "tables";
