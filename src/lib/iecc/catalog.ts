import type { CalcId } from "./types";

export type CalcMeta = {
  id: CalcId;
  title: string;
  section: string;
  group: "Start" | "Project" | "Climate" | "Residential" | "Commercial" | "Lighting" | "Mechanical" | "Reference";
  blurb: string;
};

export const CATALOG: CalcMeta[] = [
  { id: "home", title: "Workbook", section: "—", group: "Start", blurb: "All 2018 IECC spreadsheet calculators." },
  { id: "snapshots", title: "Snapshots", section: "Project", group: "Project", blurb: "Save named copies of this workbook and export Excel (.xls)." },
  { id: "climate", title: "Climate zone", section: "C301 / R301", group: "Climate", blurb: "County lookup and HDD/CDD thermal criteria." },
  { id: "defaults", title: "Defaults & design temps", section: "C302 / C303", group: "Climate", blurb: "Interior design temperatures and unlabeled fenestration defaults." },
  { id: "res-envelope", title: "Residential envelope", section: "R402.1.2 / R402.1.4", group: "Residential", blurb: "Prescriptive R-values and equivalent U-factors by climate zone." },
  { id: "res-ua", title: "Residential UA trade-off", section: "R402.1.5", group: "Residential", blurb: "Total UA proposed versus code reference UA." },
  { id: "res-air", title: "Air leakage & ventilation", section: "R402.4 / R403.6", group: "Residential", blurb: "ACH50 limit, whole-house CFM, and fan efficacy." },
  { id: "steel", title: "Steel-frame equivalents", section: "R402.2.6", group: "Residential", blurb: "Wood-to-steel R-value equivalents and steel-stud U-factor." },
  { id: "eri", title: "ERI path", section: "R406", group: "Residential", blurb: "Maximum Energy Rating Index by climate zone." },
  { id: "com-envelope", title: "Commercial envelope", section: "C402.1.3 / C402.1.4", group: "Commercial", blurb: "Opaque R-value and U/C/F-factor lookups." },
  { id: "com-ua", title: "Component performance", section: "C402.1.5", group: "Commercial", blurb: "Assembly-by-assembly UA versus the code baseline." },
  { id: "fenestration", title: "Fenestration", section: "C402.4", group: "Commercial", blurb: "WWR, U-factor, SHGC, and projection factor." },
  { id: "skylight", title: "Skylight aperture", section: "C402.4.2", group: "Commercial", blurb: "Effective aperture Equation 4-4." },
  { id: "reflectance", title: "Aged roof reflectance", section: "C402.3", group: "Commercial", blurb: "Three-year aged reflectance Equation 4-3." },
  { id: "lpd-building", title: "Lighting — building area", section: "C405.3.2(1)", group: "Lighting", blurb: "Building-area method interior LPD." },
  { id: "lpd-space", title: "Lighting — space-by-space", section: "C405.3.2(2)", group: "Lighting", blurb: "Space-by-space interior lighting power." },
  { id: "lpd-exterior", title: "Exterior lighting", section: "C405.4.2", group: "Lighting", blurb: "Exterior lighting power by lighting zone." },
  { id: "fan", title: "Fan power limitation", section: "C403.8.1", group: "Mechanical", blurb: "Nameplate hp and fan-system bhp allowances." },
  { id: "erv", title: "Energy recovery", section: "C403.7.4.2", group: "Mechanical", blurb: "ERV required by climate, OA fraction, and airflow." },
  { id: "hvac", title: "PTAC / PTHP efficiency", section: "C403.3.2(3)", group: "Mechanical", blurb: "Capacity-dependent EER and COP formulae." },
  { id: "chiller", title: "Centrifugal chiller Kadj", section: "C403.3.2.1", group: "Mechanical", blurb: "Lift adjustment Equations 4-6 and 4-7." },
  { id: "pipe", title: "Pipe insulation", section: "C403.11.3", group: "Mechanical", blurb: "Minimum thickness and conductivity correction." },
  { id: "swh", title: "Service water heating", section: "C404.2", group: "Mechanical", blurb: "Minimum efficiency for water heaters." },
  { id: "hw-pipe", title: "Hot-water piping", section: "C404.4 / R403.5.3", group: "Mechanical", blurb: "Piping insulation for service hot water." },
  { id: "hood", title: "Kitchen hoods", section: "C403.7.5", group: "Mechanical", blurb: "Exhaust rate by hood type and duty." },
  { id: "formulas", title: "Formula library", section: "Ch. 4", group: "Reference", blurb: "Live versions of every extracted equation." },
  { id: "tables", title: "Code tables", section: "R402 / C402", group: "Reference", blurb: "Full envelope tables for the selected zone." },
];

export const GROUPS = ["Start", "Project", "Climate", "Residential", "Commercial", "Lighting", "Mechanical", "Reference"] as const;

export function calcMeta(id: CalcId): CalcMeta {
  return CATALOG.find((c) => c.id === id) ?? CATALOG[0];
}
