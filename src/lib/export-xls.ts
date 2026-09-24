import type { ClimateKey } from "@/lib/iecc/types";
import {
  commercialColumn,
  residentialColumn,
  zoneFromDegreeDays,
  zoneLabel,
  dryThresholdInches,
  isDryClimate,
} from "@/lib/iecc/climate";
import {
  RES_COL_LABEL,
  UA_KINDS,
  ach50Limit,
  codeU,
  eriMax,
  resFor,
  steelStudU,
  STEEL_STUD_ER,
  wholeHouseVentCfm,
} from "@/lib/iecc/residential";
import {
  COM_RVALUE,
  COM_UFACTOR,
  VERTICAL_FEN_MAX,
  SKYLIGHT_MAX,
  agedReflectance,
  comU,
  fenFor,
  pfBin,
  projectionFactor,
  skylightEffectiveAperture,
  type UFactorKind,
} from "@/lib/iecc/commercial";
import { LPD_BUILDING, LPD_EXTERIOR, LPD_EXTERIOR_BASE, LPD_SPACE } from "@/lib/iecc/lighting";
import {
  PIPE_INSULATION,
  PIPE_RADIUS_IN,
  chillerAdjKwPerTon,
  chillerKadj,
  equivalentThickness,
  ervRequired,
  ervThresholdCfm,
  fanNameplateHp,
  fanSystemBhp,
  HOOD_RATES,
  ptacCap,
  ptacCoolEer,
  pthpHeatCop,
  standbyLossBtu,
} from "@/lib/iecc/mechanical";
import type { Occupancy, ProjectInputs, Snapshot } from "@/lib/project";
import { slugFile } from "@/lib/project";

type Cell = string | number | boolean | null;
type Sheet = { name: string; rows: Cell[][] };

function sheet(name: string, rows: Cell[][]): Sheet {
  return { name: name.slice(0, 31), rows };
}

function buildSheets(opts: {
  projectName: string;
  zone: ClimateKey;
  occupancy: Occupancy;
  inputs: ProjectInputs;
  snapshotName?: string;
  savedAt?: string;
}): Sheet[] {
  const { projectName, zone, occupancy, inputs, snapshotName, savedAt } = opts;
  const occLabel = occupancy === "groupR" ? "Group R" : "All other";
  const env = resFor(zone);
  const rcol = residentialColumn(zone);
  const ccol = commercialColumn(zone);
  const fen = fenFor(zone);
  const dry = isDryClimate(inputs.climate.precip, inputs.climate.meanT);
  const fromDd = zoneFromDegreeDays({
    cdd50: inputs.climate.cdd,
    hdd65: inputs.climate.hdd,
    marine: inputs.climate.marine,
    dry,
  });

  let resProp = 0;
  let resCode = 0;
  const resUaRows: Cell[][] = [
    ["Assembly", "Area ft²", "Proposed U", "Code U", "UA proposed", "UA code"],
  ];
  for (const r of inputs.resUa) {
    const cu = codeU(r.kind, env);
    const label = UA_KINDS.find((k) => k.id === r.kind)?.label ?? r.kind;
    resProp += r.u * r.area;
    resCode += cu * r.area;
    resUaRows.push([label, r.area, r.u, cu, r.u * r.area, cu * r.area]);
  }
  resUaRows.push(["TOTAL", "", "", "", resProp, resCode]);
  resUaRows.push(["Result", resProp <= resCode ? "PASS" : "FAIL", "UA proposed ≤ UA standard", "", "", ""]);

  let comProp = 0;
  let comCode = 0;
  const comUaRows: Cell[][] = [["Assembly", "A or P", "Proposed", "Code", "UA proposed", "UA code"]];
  for (const r of inputs.comUa) {
    const meta = COM_UFACTOR[r.kind];
    const cu = comU(r.kind, zone, occupancy);
    comProp += r.u * r.area;
    comCode += cu * r.area;
    comUaRows.push([`${meta.unit}-${meta.label}`, r.area, r.u, cu, r.u * r.area, cu * r.area]);
  }
  comUaRows.push(["TOTAL", "", "", "", comProp, comCode]);
  comUaRows.push(["Result", comProp <= comCode ? "PASS" : "FAIL", "", "", "", ""]);

  const resEnv: Cell[][] = [
    ["Assembly", "R-value method", "U-factor equivalent"],
    ["Fenestration U-factor", env.fenU == null ? "NR" : `U-${env.fenU}`, env.fenUeq],
    ["Skylight U-factor", `U-${env.skyU}`, env.skyUeq],
    ["Glazed SHGC", env.shgc == null ? "NR" : env.shgc, env.shgc == null ? "NR" : env.shgc],
    ["Ceiling", env.ceilingR, env.ceilingU],
    ["Wood-frame wall", env.woodWallR, env.wallU],
    ["Mass wall", env.massWallR, env.massU],
    ["Floor", env.floorR, env.floorU],
    ["Basement wall", env.basementR, env.basementU],
    ["Slab", env.slabR, "—"],
    ["Crawl wall", env.crawlR, env.crawlU],
  ];

  const comEnv: Cell[][] = [["Group", "Assembly", "Requirement"]];
  for (const row of COM_RVALUE) {
    const v = occupancy === "groupR" ? row.values[ccol].groupR : row.values[ccol].all;
    comEnv.push([row.group, row.assembly, v]);
  }
  comEnv.push([]);
  comEnv.push(["Group", "Assembly", "Unit", "Max"]);
  for (const k of Object.keys(COM_UFACTOR) as UFactorKind[]) {
    const row = COM_UFACTOR[k];
    const v = occupancy === "groupR" ? row.values[ccol].groupR : row.values[ccol].all;
    comEnv.push([row.group, row.label, row.unit, v]);
  }

  const wwr = inputs.fen.wall > 0 ? inputs.fen.vert / inputs.fen.wall : 0;
  const srr = inputs.fen.roof > 0 ? inputs.fen.sky / inputs.fen.roof : 0;
  const pf = projectionFactor(inputs.fen.a, inputs.fen.b);
  const shgcMax = fen.shgc[pfBin(pf)].sew;
  const ea = skylightEffectiveAperture(
    inputs.skylight.area,
    inputs.skylight.vt,
    inputs.skylight.depth,
    inputs.skylight.toplit,
  );
  const aged = agedReflectance(inputs.reflectance.initial);

  const air = inputs.resAir;
  const vent = wholeHouseVentCfm(air.cfa, air.br);
  const achLimit = ach50Limit(zone);
  const steel = STEEL_STUD_ER[Math.min(inputs.steel.idx, STEEL_STUD_ER.length - 1)] ?? STEEL_STUD_ER[0];

  let lpdBAllow = 0;
  let lpdBUsed = 0;
  const lpdB: Cell[][] = [["Building type", "Area ft²", "LPD W/ft²", "Allowed W", "Installed W"]];
  for (const r of inputs.lpdBuilding) {
    const lpd = LPD_BUILDING.find((x) => x.type === r.type)?.wsf ?? 0;
    lpdBAllow += lpd * r.area;
    lpdBUsed += r.watts;
    lpdB.push([r.type, r.area, lpd, lpd * r.area, r.watts]);
  }
  lpdB.push(["TOTAL", "", "", lpdBAllow, lpdBUsed]);
  lpdB.push(["Result", lpdBUsed <= lpdBAllow ? "PASS" : "FAIL"]);

  let lpdSAllow = 0;
  let lpdSUsed = 0;
  const lpdS: Cell[][] = [["Space", "Area ft²", "LPD W/ft²", "Allowed W", "Installed W"]];
  for (const r of inputs.lpdSpace) {
    const lpd = LPD_SPACE.find((x) => x.type === r.type)?.wsf ?? 0;
    lpdSAllow += lpd * r.area;
    lpdSUsed += r.watts;
    lpdS.push([r.type, r.area, lpd, lpd * r.area, r.watts]);
  }
  lpdS.push(["TOTAL", "", "", lpdSAllow, lpdSUsed]);
  lpdS.push(["Result", lpdSUsed <= lpdSAllow ? "PASS" : "FAIL"]);

  const lz = inputs.lpdExterior.lz;
  let lpdEAllow = LPD_EXTERIOR_BASE[lz];
  let lpdEUsed = 0;
  const lpdE: Cell[][] = [
    ["Lighting zone", lz],
    ["Base site allowance W", LPD_EXTERIOR_BASE[lz]],
    [],
    ["Surface", "Qty", "Allowance", "Allowed W", "Installed W"],
  ];
  for (const r of inputs.lpdExterior.rows) {
    const spec = LPD_EXTERIOR.find((x) => x.surface === r.surface);
    const lpd = spec?.values[lz] ?? 0;
    lpdEAllow += (lpd ?? 0) * r.qty;
    lpdEUsed += r.watts;
    lpdE.push([r.surface, r.qty, lpd ?? "NR", (lpd ?? 0) * r.qty, r.watts]);
  }
  lpdE.push(["TOTAL", "", "", lpdEAllow, lpdEUsed]);
  lpdE.push(["Result", lpdEUsed <= lpdEAllow ? "PASS" : "FAIL"]);

  const fanHp = fanNameplateHp(inputs.fan.cfm, inputs.fan.vav);
  const fanBhp = fanSystemBhp(inputs.fan.cfm, inputs.fan.vav, inputs.fan.adj);
  const ervT = ervThresholdCfm(zone, inputs.erv.oa, inputs.erv.hours8000);
  const ervReq = ervRequired(zone, inputs.erv.oa, inputs.erv.cfm, inputs.erv.hours8000);
  const pipeRow = PIPE_INSULATION[inputs.pipe.tempIdx] ?? PIPE_INSULATION[0];
  const t = pipeRow.nps[inputs.pipe.nps];
  const rPipe = PIPE_RADIUS_IN[inputs.pipe.nps];
  const teq = equivalentThickness(rPipe, t, inputs.pipe.kInst, inputs.pipe.kTable);
  const lift = inputs.chiller.cewt - inputs.chiller.clwt;
  const ka = chillerKadj(lift, "A");
  const kb = chillerKadj(lift, "B");
  const hoodRow = HOOD_RATES.find((h) => h.type === inputs.hood.type) ?? HOOD_RATES[0];
  const hoodRate = hoodRow[inputs.hood.duty];
  const hoodAllow = hoodRate * inputs.hood.length;

  return [
    sheet("Cover", [
      ["2018 IECC Workbook"],
      ["International Energy Conservation Code — extracted tables and formulae"],
      [],
      ["Project", projectName],
      ["Snapshot", snapshotName ?? "(current working copy)"],
      ["Saved", savedAt ? new Date(savedAt).toLocaleString() : new Date().toLocaleString()],
      ["Climate zone", zone, zoneLabel(zone)],
      ["Occupancy", occLabel],
      ["Residential column", RES_COL_LABEL[rcol]],
      ["Commercial column", ccol],
      [],
      ["Pass / fail summary"],
      ["Residential UA", resProp <= resCode ? "PASS" : "FAIL", resProp, resCode],
      ["Commercial UA", comProp <= comCode ? "PASS" : "FAIL", comProp, comCode],
      ["ACH50", air.ach <= achLimit ? "PASS" : "FAIL", air.ach, achLimit],
      ["ERI", air && inputs.eri.value <= eriMax(zone) ? "PASS" : "FAIL", inputs.eri.value, eriMax(zone)],
      ["WWR ≤ 30%", wwr <= VERTICAL_FEN_MAX ? "PASS" : wwr <= 0.4 ? "DAYLIGHT" : "FAIL", wwr],
      ["Skylight ≤ 3%", srr <= SKYLIGHT_MAX ? "PASS" : srr <= 0.06 ? "TOPLIT" : "FAIL", srr],
      ["LPD building area", lpdBUsed <= lpdBAllow ? "PASS" : "FAIL"],
      ["LPD space-by-space", lpdSUsed <= lpdSAllow ? "PASS" : "FAIL"],
      ["Exterior lighting", lpdEUsed <= lpdEAllow ? "PASS" : "FAIL"],
      ["Fan nameplate", inputs.fan.nameplate <= fanHp ? "PASS" : "FAIL"],
      ["Kitchen hood", inputs.hood.exhaust <= hoodAllow ? "PASS" : "FAIL"],
    ]),
    sheet("Climate", [
      ["County / thermal criteria"],
      ["Workbook zone", zone, zoneLabel(zone)],
      ["CDD50°F", inputs.climate.cdd],
      ["HDD65°F", inputs.climate.hdd],
      ["Annual precip in", inputs.climate.precip],
      ["Mean annual temp °F", inputs.climate.meanT],
      ["Marine", inputs.climate.marine ? "Yes" : "No"],
      ["Dry threshold in", dryThresholdInches(inputs.climate.meanT)],
      ["Moisture class", dry ? "Dry (B)" : "Moist (A)"],
      ["Zone from degree-days", fromDd],
    ]),
    sheet("Res Envelope", [["Table R402.1.2 / R402.1.4", RES_COL_LABEL[rcol]], [], ...resEnv]),
    sheet("Res UA", [["R402.1.5 Total UA alternative"], [], ...resUaRows]),
    sheet("Air leakage", [
      ["R402.4 / R403.6"],
      ["Tested ACH50", air.ach],
      ["Limit ACH50", achLimit],
      ["Result", air.ach <= achLimit ? "PASS" : "FAIL"],
      [],
      ["Conditioned floor area ft²", air.cfa],
      ["Bedrooms", air.br],
      ["Whole-house Q cfm", vent],
      ["Fan airflow cfm", air.flow],
      ["Fan power W", air.watts],
      ["Efficacy cfm/W", air.watts > 0 ? air.flow / air.watts : ""],
      [],
      ["ERI proposed", inputs.eri.value],
      ["ERI maximum Table R406.4", eriMax(zone)],
      ["ERI result", inputs.eri.value <= eriMax(zone) ? "PASS" : "FAIL"],
      [],
      ["Steel stud index", inputs.steel.idx],
      ["Steel depth", steel.depth],
      ["Spacing in o.c.", steel.spacing],
      ["Cavity R", steel.cavity],
      ["Fc", steel.fc],
      ["ER", steel.er],
      ["Rs", inputs.steel.rs],
      ["U = 1/(Rs+ER)", steelStudU(inputs.steel.rs, steel.er)],
    ]),
    sheet("Com Envelope", [["Table C402.1.3 / C402.1.4", `Zone ${ccol}`, occLabel], [], ...comEnv]),
    sheet("Com UA", [["C402.1.5 Component performance"], [], ...comUaRows]),
    sheet("Fenestration", [
      ["C402.4"],
      ["Gross wall ft²", inputs.fen.wall],
      ["Vertical fenestration ft²", inputs.fen.vert],
      ["WWR", wwr],
      ["Roof ft²", inputs.fen.roof],
      ["Skylight ft²", inputs.fen.sky],
      ["Skylight ratio", srr],
      ["Overhang A ft", inputs.fen.a],
      ["Sill to overhang B ft", inputs.fen.b],
      ["PF = A/B", pf],
      ["Proposed fixed U", inputs.fen.fixedU],
      ["Max fixed U", fen.fixedU],
      ["Proposed SHGC SEW", inputs.fen.shgc],
      ["Max SHGC SEW", shgcMax ?? "NR"],
      ["Skylight area ft²", inputs.skylight.area],
      ["VT", inputs.skylight.vt],
      ["Well depth ft", inputs.skylight.depth],
      ["Toplit area ft²", inputs.skylight.toplit],
      ["Effective aperture Eq 4-4", ea],
      ["Initial roof reflectance", inputs.reflectance.initial],
      ["Aged reflectance Eq 4-3", aged],
    ]),
    sheet("Lighting", [
      ["Building-area method C405.3.2(1)"],
      ...lpdB,
      [],
      ["Space-by-space C405.3.2(2)"],
      ...lpdS,
      [],
      ["Exterior C405.4.2"],
      ...lpdE,
    ]),
    sheet("Mechanical", [
      ["Fan power C403.8.1"],
      ["Supply cfm", inputs.fan.cfm],
      ["System", inputs.fan.vav ? "VAV" : "Constant volume"],
      ["Nameplate hp proposed", inputs.fan.nameplate],
      ["Allowable nameplate hp", fanHp],
      ["Fan system bhp proposed", inputs.fan.bhp],
      ["Allowable bhp", fanBhp],
      ["Pressure adjustment A", inputs.fan.adj],
      [],
      ["Energy recovery C403.7.4.2"],
      ["OA fraction", inputs.erv.oa],
      ["Supply cfm", inputs.erv.cfm],
      ["≥ 8000 h/yr", inputs.erv.hours8000 ? "Yes" : "No"],
      ["Threshold cfm", ervT ?? "NR"],
      ["ERV required", ervReq ? "Yes" : "No"],
      [],
      ["PTAC / PTHP C403.3.2(3)"],
      ["Capacity Btu/h", inputs.hvac.btuh],
      ["Cap used", ptacCap(inputs.hvac.btuh)],
      ["Construction", inputs.hvac.replacement ? "Replacement" : "New"],
      ["Cooling EER", ptacCoolEer(inputs.hvac.btuh, inputs.hvac.replacement)],
      ["Heating COP", pthpHeatCop(inputs.hvac.btuh, inputs.hvac.replacement)],
      [],
      ["Chiller Kadj C403.3.2.1"],
      ["CEWT °F", inputs.chiller.cewt],
      ["CLWT °F", inputs.chiller.clwt],
      ["LIFT °F", lift],
      ["Table FL kW/ton", inputs.chiller.tableKw],
      ["Kadj Path A", ka],
      ["Adj FL kW/ton", chillerAdjKwPerTon(inputs.chiller.tableKw, ka)],
      ["Kadj Path B", kb],
      ["Adj IPLV kW/ton", chillerAdjKwPerTon(inputs.chiller.tableKw, kb)],
      [],
      ["Pipe insulation C403.11.3"],
      ["Fluid temp", pipeRow.temp],
      ["NPS", inputs.pipe.nps],
      ["Table t in", t],
      ["r in", rPipe],
      ["k installed", inputs.pipe.kInst],
      ["K table", inputs.pipe.kTable],
      ["Equivalent T in", teq],
      ["SWH volume gal", inputs.swh.volume],
      ["Standby loss Btu/h", standbyLossBtu(inputs.swh.volume)],
      [],
      ["Kitchen hood C403.7.5"],
      ["Type", inputs.hood.type],
      ["Duty", inputs.hood.duty],
      ["Length ft", inputs.hood.length],
      ["Max cfm/ft", hoodRate],
      ["Max exhaust cfm", hoodAllow],
      ["Design exhaust cfm", inputs.hood.exhaust],
      ["Result", inputs.hood.exhaust <= hoodAllow ? "PASS" : "FAIL"],
    ]),
  ];
}

function xmlEscape(s: string): string {
  return s.replace(/[&<>"]/g, (ch) => {
    if (ch === "&") return "&" + "amp;";
    if (ch === "<") return "&" + "lt;";
    if (ch === ">") return "&" + "gt;";
    return "&" + "quot;";
  });
}

function cellXml(v: Cell): string {
  if (v === null || v === undefined || v === "") {
    return `<Cell><Data ss:Type="String"></Data></Cell>`;
  }
  if (typeof v === "boolean") {
    return `<Cell><Data ss:Type="Boolean">${v ? 1 : 0}</Data></Cell>`;
  }
  if (typeof v === "number" && Number.isFinite(v)) {
    return `<Cell><Data ss:Type="Number">${v}</Data></Cell>`;
  }
  return `<Cell><Data ss:Type="String">${xmlEscape(String(v))}</Data></Cell>`;
}

function toSpreadsheetMl(sheets: Sheet[]): string {
  const body = sheets
    .map((s) => {
      const name = xmlEscape(s.name.replace(/[\\/?*:[\]]/g, "-").slice(0, 31));
      const rows = s.rows.map((r) => `<Row>${r.map(cellXml).join("")}</Row>`).join("");
      return `<Worksheet ss:Name="${name}"><Table>${rows}</Table></Worksheet>`;
    })
    .join("");
  return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
${body}
</Workbook>`;
}

function stamp(d = new Date()): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;
}

function downloadBlob(filename: string, xml: string) {
  if (typeof document === "undefined") return;
  const blob = new Blob([xml], { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function downloadProjectXls(opts: {
  projectName: string;
  zone: ClimateKey;
  occupancy: Occupancy;
  inputs: ProjectInputs;
  snapshotName?: string;
  savedAt?: string;
}): string {
  const sheets = buildSheets(opts);
  const xml = toSpreadsheetMl(sheets);
  const base = slugFile(opts.snapshotName || opts.projectName);
  const filename = `IECC-2018-${base}-${opts.zone}-${stamp()}.xls`;
  downloadBlob(filename, xml);
  return filename;
}

export function downloadSnapshotXls(snap: Snapshot): string {
  return downloadProjectXls({
    projectName: snap.projectName,
    zone: snap.zone,
    occupancy: snap.occupancy,
    inputs: snap.inputs,
    snapshotName: snap.name,
    savedAt: snap.savedAt,
  });
}
