import { useMemo, useState } from "react";
import {
  DUCT_R,
  FAN_EFFICACY,
  RES_COL_LABEL,
  STEEL_FRAME,
  STEEL_STUD_ER,
  SUNROOM,
  TRADEOFF_CAPS,
  UA_KINDS,
  ach50Limit,
  codeU,
  eriMax,
  resFor,
  steelStudU,
  wholeHouseVentCfm,
  type UaAssemblyKind,
} from "@/lib/iecc/residential";
import { residentialColumn, zoneNumber } from "@/lib/iecc/climate";
import { useWorkbook } from "@/lib/store";
import { nextRowId, type UaRow } from "@/lib/project";
import { Field, Formula, GhostButton, NumInput, Panel, Select, SheetTable, Stat, Verdict } from "@/components/sheet";
import { fmt } from "@/lib/utils";

export function ResEnvelopeCalc() {
  const zone = useWorkbook((s) => s.zone);
  const env = resFor(zone);
  const col = residentialColumn(zone);
  const rows: { label: string; r: string; u: string }[] = [
    { label: "Fenestration U-factor", r: env.fenU == null ? "NR" : `U-${env.fenU}`, u: `U-${env.fenUeq}` },
    { label: "Skylight U-factor", r: `U-${env.skyU}`, u: `U-${env.skyUeq}` },
    { label: "Glazed SHGC", r: env.shgc == null ? "NR" : String(env.shgc), u: env.shgc == null ? "NR" : String(env.shgc) },
    { label: "Ceiling", r: env.ceilingR, u: String(env.ceilingU) },
    { label: "Wood-frame wall", r: env.woodWallR, u: String(env.wallU) },
    { label: "Mass wall", r: env.massWallR, u: String(env.massU) },
    { label: "Floor", r: env.floorR, u: String(env.floorU) },
    { label: "Basement wall", r: env.basementR, u: String(env.basementU) },
    { label: "Slab", r: env.slabR, u: "—" },
    { label: "Crawl wall", r: env.crawlR, u: String(env.crawlU) },
  ];
  return (
    <Panel kicker={`Tables R402.1.2 & R402.1.4 · ${RES_COL_LABEL[col]}`} title="Prescriptive residential envelope">
      <SheetTable columns={["Assembly", "R-value method", "U-factor equivalent"]}>
        {rows.map((r) => (
          <tr key={r.label} className="border-b border-line">
            <td className="px-2 py-2 font-sans">{r.label}</td>
            <td className="px-2 py-2">{r.r}</td>
            <td className="px-2 py-2">{r.u}</td>
          </tr>
        ))}
      </SheetTable>
      <p className="mt-4 text-xs text-muted">
        Marine 4 uses the Zone 5 column. Zones 7 and 8 share a column. Mass-wall interior insulation uses the more stringent footnote U-factors.
      </p>
    </Panel>
  );
}

export function ResUaCalc() {
  const zone = useWorkbook((s) => s.zone);
  const env = resFor(zone);
  const [rows, setRows] = useState<UaRow[]>([
    { id: 1, kind: "ceiling", area: 1200, u: env.ceilingU },
    { id: 2, kind: "wall", area: 1800, u: env.wallU },
    { id: 3, kind: "fenestration", area: 240, u: env.fenUeq },
    { id: 4, kind: "floor", area: 1200, u: env.floorU },
  ]);

  const tot = useMemo(() => {
    let prop = 0;
    let code = 0;
    let area = 0;
    for (const r of rows) {
      const cu = codeU(r.kind, env);
      prop += r.u * r.area;
      code += cu * r.area;
      area += r.area;
    }
    return { prop, code, area, pass: prop <= code };
  }, [rows, env]);

  const n = zoneNumber(zone);
  const fenCap = n >= 6 ? TRADEOFF_CAPS.fenU_z68 : n >= 4 ? TRADEOFF_CAPS.fenU_z45 : null;

  return (
    <div className="grid gap-5">
      <Panel kicker="R402.1.5 Total UA alternative" title="Residential UA trade-off">
        <Formula>UA_proposed = Σ (U_i × A_i) ≤ UA_standard = Σ (U_code,i × A_i)</Formula>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[44rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="px-2 py-2 text-xs text-muted">Assembly</th>
                <th className="px-2 py-2 text-xs text-muted">Area ft²</th>
                <th className="px-2 py-2 text-xs text-muted">Proposed U</th>
                <th className="px-2 py-2 text-xs text-muted">Code U</th>
                <th className="px-2 py-2 text-xs text-muted">UA prop.</th>
                <th className="px-2 py-2 text-xs text-muted">UA code</th>
                <th className="px-2 py-2" />
              </tr>
            </thead>
            <tbody className="font-mono tabular-nums">
              {rows.map((r) => {
                const cu = codeU(r.kind, env);
                return (
                  <tr key={r.id} className="border-b border-line">
                    <td className="px-2 py-1">
                      <select
                        className="h-11 w-full rounded-sm border border-line bg-bg px-2 font-sans text-sm"
                        value={r.kind}
                        onChange={(e) =>
                          setRows((rs) =>
                            rs.map((x) =>
                              x.id === r.id
                                ? { ...x, kind: e.target.value as UaAssemblyKind, u: codeU(e.target.value as UaAssemblyKind, env) }
                                : x,
                            ),
                          )
                        }
                      >
                        {UA_KINDS.map((k) => (
                          <option key={k.id} value={k.id}>
                            {k.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 py-1">
                      <NumInput
                        value={r.area}
                        onChange={(n) => setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, area: n } : x)))}
                      />
                    </td>
                    <td className="px-2 py-1">
                      <NumInput
                        value={r.u}
                        step="0.001"
                        onChange={(n) => setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, u: n } : x)))}
                      />
                    </td>
                    <td className="px-2 py-2">{cu}</td>
                    <td className="px-2 py-2">{fmt(r.u * r.area, 2)}</td>
                    <td className="px-2 py-2">{fmt(cu * r.area, 2)}</td>
                    <td className="px-2 py-1">
                      <button
                        type="button"
                        className="h-11 px-2 text-sm text-fail"
                        onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-3">
          <GhostButton
            onClick={() =>
              setRows((rs) => [...rs, { id: nextRowId(rs), kind: "wall", area: 100, u: env.wallU }])
            }
          >
            Add assembly
          </GhostButton>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Stat label="UA proposed" value={fmt(tot.prop, 1)} />
          <Stat label="UA standard" value={fmt(tot.code, 1)} />
          <Stat label="Margin" value={fmt(tot.code - tot.prop, 1)} hint="positive = better than code" />
        </div>
        <div className="mt-3">
          <Verdict status={tot.pass ? "pass" : "fail"}>
            {tot.pass
              ? `Proposed UA ${fmt(tot.prop, 1)} ≤ standard ${fmt(tot.code, 1)}`
              : `Proposed UA ${fmt(tot.prop, 1)} exceeds standard ${fmt(tot.code, 1)}`}
          </Verdict>
        </div>
        {fenCap && (
          <p className="mt-3 text-xs text-muted">
            Trade-off cap: vertical fenestration U ≤ {fenCap} in this zone (R402.1.5). SHGC in zones 1–3 cannot exceed 0.50.
          </p>
        )}
      </Panel>
    </div>
  );
}

export function ResAirCalc() {
  const zone = useWorkbook((s) => s.zone);
  const [cfa, setCfa] = useState(2400);
  const [br, setBr] = useState(3);
  const [ach, setAch] = useState(2.5);
  const [flow, setFlow] = useState(80);
  const [watts, setWatts] = useState(25);
  const limit = ach50Limit(zone);
  const vent = wholeHouseVentCfm(cfa, br);
  const efficacy = flow > 0 ? flow / watts : Number.NaN;
  return (
    <div className="grid gap-5">
      <Panel kicker="R402.4.1.2" title="Blower door">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Tested ACH50">
            <NumInput value={ach} onChange={setAch} step="0.1" />
          </Field>
          <Stat label="Limit" value={`${limit} ACH50`} hint={zoneNumber(zone) <= 2 ? "Zones 1–2" : "Zones 3–8"} />
        </div>
        <div className="mt-3">
          <Verdict status={ach <= limit ? "pass" : "fail"}>
            {ach <= limit ? `≤ ${limit} ACH50` : `${ach} exceeds ${limit} ACH50`}
          </Verdict>
        </div>
      </Panel>
      <Panel kicker="R403.6.1 / ASHRAE 62.2" title="Whole-house mechanical ventilation">
        <Formula>Q = 0.01 × CFA + 7.5 × (N_br + 1)</Formula>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Field label="Conditioned floor area">
            <NumInput value={cfa} onChange={setCfa} suffix="ft²" />
          </Field>
          <Field label="Bedrooms">
            <NumInput value={br} onChange={setBr} step="1" />
          </Field>
          <Stat label="Required Q" value={`${fmt(vent, 1)} cfm`} />
        </div>
      </Panel>
      <Panel kicker="Table R403.6.1" title="Fan efficacy">
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <Field label="Airflow">
            <NumInput value={flow} onChange={setFlow} suffix="cfm" />
          </Field>
          <Field label="Power">
            <NumInput value={watts} onChange={setWatts} suffix="W" />
          </Field>
        </div>
        <Stat label="Efficacy" value={`${fmt(efficacy, 2)} cfm/W`} />
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="py-2 text-xs text-muted">Fan location</th>
                <th className="py-2 text-xs text-muted">Airflow</th>
                <th className="py-2 text-xs text-muted">Min cfm/W</th>
              </tr>
            </thead>
            <tbody>
              {FAN_EFFICACY.map((r) => (
                <tr key={r.location} className="border-b border-line">
                  <td className="py-2">{r.location}</td>
                  <td className="py-2">{r.airflow}</td>
                  <td className="py-2 font-mono">{r.efficacy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted">
          Ducts: attic {DUCT_R.attic}, other {DUCT_R.other}. Total leakage ≤ {DUCT_R.leakageTotal} cfm/100 ft². Rough-in with air handler ≤ {DUCT_R.leakageRoughInAH}; without ≤ {DUCT_R.leakageRoughInNoAH}.
        </p>
      </Panel>
    </div>
  );
}

export function SteelCalc() {
  const [idx, setIdx] = useState(0);
  const [rs, setRs] = useState(0.79);
  const row = STEEL_STUD_ER[idx];
  const u = steelStudU(rs, row.er);
  return (
    <div className="grid gap-5">
      <Panel kicker="Table R402.2.6" title="Steel-frame R-value equivalents">
        <div className="max-h-80 overflow-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="sticky top-0 bg-surface">
              <tr className="border-b border-line">
                <th className="py-2 text-xs text-muted">Wood-frame (required)</th>
                <th className="py-2 text-xs text-muted">Steel-frame equivalent</th>
              </tr>
            </thead>
            <tbody>
              {STEEL_FRAME.map((r) => (
                <tr key={r.wood} className="border-b border-line">
                  <td className="py-2">{r.wood}</td>
                  <td className="py-2">{r.steel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <Panel kicker="Equation 4-1 / Table R402.2.6" title="Steel stud U-factor">
        <Formula>U = 1 / (R_s + E_R)</Formula>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Field label="Stud / cavity">
            <Select
              value={String(idx)}
              onChange={(v) => setIdx(Number(v))}
            >
              {STEEL_STUD_ER.map((r, i) => (
                <option key={`${r.depth}-${r.spacing}-${r.cavity}`} value={i}>
                  {r.depth} @ {r.spacing} in o.c., R-{r.cavity} cavity
                </option>
              ))}
            </Select>
          </Field>
          <Field label="R_s (exterior air films + ci + sheathing)">
            <NumInput value={rs} onChange={setRs} step="0.01" />
          </Field>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Stat label="Correction Fc" value={String(row.fc)} />
          <Stat label="Effective R (E_R)" value={String(row.er)} />
          <Stat label="U-factor" value={fmt(u, 3)} />
        </div>
      </Panel>
      <Panel kicker="R402.2.12" title="Sunroom insulation">
        <p className="text-sm text-muted">
          Ceilings R-{SUNROOM.ceilingR_z14} in zones 1–4, R-{SUNROOM.ceilingR_z58} in zones 5–8. Walls R-{SUNROOM.wallR}. Fenestration U-{SUNROOM.fenU}, skylight U-{SUNROOM.skyU}.
        </p>
      </Panel>
    </div>
  );
}

export function EriCalc() {
  const zone = useWorkbook((s) => s.zone);
  const [eri, setEri] = useState(eriMax(zone));
  const max = eriMax(zone);
  return (
    <Panel kicker="Table R406.4" title="Energy Rating Index">
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Proposed ERI">
          <NumInput value={eri} onChange={setEri} />
        </Field>
        <Stat label="Maximum ERI" value={String(max)} hint={`Climate zone ${zoneNumber(zone)}`} />
        <Stat label="On-site power" value="Excluded" hint="R406.3 — without on-site generation" />
      </div>
      <div className="mt-4">
        <Verdict status={eri <= max ? "pass" : "fail"}>
          {eri <= max ? `ERI ${eri} ≤ ${max}` : `ERI ${eri} exceeds ${max}`}
        </Verdict>
      </div>
    </Panel>
  );
}
