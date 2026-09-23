import { useMemo, useState } from "react";
import {
  AIR_LEAKAGE_FEN,
  AIR_LEAKAGE_MAX,
  COM_RVALUE,
  COM_UFACTOR,
  FEN_C402,
  SKYLIGHT_DAYLIGHT,
  SKYLIGHT_MAX,
  VERTICAL_FEN_DAYLIGHT,
  VERTICAL_FEN_MAX,
  agedReflectance,
  comU,
  fenFor,
  pfBin,
  projectionFactor,
  skylightEffectiveAperture,
  type UFactorKind,
} from "@/lib/iecc/commercial";
import { commercialColumn } from "@/lib/iecc/climate";
import { useWorkbook } from "@/lib/store";
import { Field, Formula, GhostButton, NumInput, Panel, Select, Stat, Verdict } from "@/components/sheet";
import { fmt } from "@/lib/utils";

export function ComEnvelopeCalc() {
  const zone = useWorkbook((s) => s.zone);
  const occ = useWorkbook((s) => s.occupancy);
  const col = commercialColumn(zone);
  const groups = [...new Set(COM_RVALUE.map((r) => r.group))];
  return (
    <div className="grid gap-5">
      <Panel kicker={`Table C402.1.3 · Zone ${col}`} title="Opaque R-value method">
        {groups.map((g) => (
          <div key={g} className="mb-4">
            <p className="mb-2 font-mono text-xs tracking-wide text-faint uppercase">{g}</p>
            <table className="w-full text-left text-sm">
              <tbody>
                {COM_RVALUE.filter((r) => r.group === g).map((r) => (
                  <tr key={r.assembly} className="border-b border-line">
                    <td className="py-2 pr-3">{r.assembly}</td>
                    <td className="py-2 font-mono">{occ === "groupR" ? r.values[col].groupR : r.values[col].all}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </Panel>
      <Panel kicker={`Table C402.1.4 · Zone ${col}`} title="U / C / F-factor method">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="py-2 text-xs text-muted">Assembly</th>
                <th className="py-2 text-xs text-muted">Unit</th>
                <th className="py-2 text-xs text-muted">Max</th>
              </tr>
            </thead>
            <tbody className="font-mono tabular-nums">
              {(Object.keys(COM_UFACTOR) as UFactorKind[]).map((k) => {
                const row = COM_UFACTOR[k];
                const v = occ === "groupR" ? row.values[col].groupR : row.values[col].all;
                return (
                  <tr key={k} className="border-b border-line">
                    <td className="py-2 font-sans">
                      {row.group} · {row.label}
                    </td>
                    <td className="py-2">{row.unit}</td>
                    <td className="py-2">{v}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

type ComRow = { id: number; kind: UFactorKind; area: number; u: number };
let comSeq = 1;

export function ComUaCalc() {
  const zone = useWorkbook((s) => s.zone);
  const occ = useWorkbook((s) => s.occupancy);
  const kinds = Object.keys(COM_UFACTOR) as UFactorKind[];
  const [rows, setRows] = useState<ComRow[]>([
    { id: 1, kind: "roofAbove", area: 10000, u: comU("roofAbove", zone, occ) },
    { id: 2, kind: "wallMetalFramed", area: 8000, u: comU("wallMetalFramed", zone, occ) },
    { id: 3, kind: "floorJoist", area: 10000, u: comU("floorJoist", zone, occ) },
  ]);
  const tot = useMemo(() => {
    let prop = 0;
    let code = 0;
    for (const r of rows) {
      const cu = comU(r.kind, zone, occ);
      const isSlab = r.kind === "slabHeated" || r.kind === "slabUnheated";
      if (isSlab) {
        prop += r.u * r.area;
        code += cu * r.area;
      } else {
        prop += r.u * r.area;
        code += cu * r.area;
      }
    }
    return { prop, code, pass: prop <= code };
  }, [rows, zone, occ]);

  return (
    <Panel kicker="C402.1.5 Component performance alternative" title="Proposed UA vs code UA">
      <Formula>Σ (U_p A) + Σ (F_p P) + Σ (C_p A) ≤ Σ (U_std A) + Σ (F_std P) + Σ (C_std A)</Formula>
      <p className="mt-2 text-sm text-muted">
        Enter area for U/C assemblies and perimeter (ft) for F-factor slabs. Equation 4-2 also allows fenestration trade-off within C402.4 limits.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              <th className="px-2 py-2 text-xs text-muted">Assembly</th>
              <th className="px-2 py-2 text-xs text-muted">A or P</th>
              <th className="px-2 py-2 text-xs text-muted">Proposed</th>
              <th className="px-2 py-2 text-xs text-muted">Code</th>
              <th className="px-2 py-2 text-xs text-muted">UA prop.</th>
              <th className="px-2 py-2" />
            </tr>
          </thead>
          <tbody className="font-mono tabular-nums">
            {rows.map((r) => {
              const cu = comU(r.kind, zone, occ);
              return (
                <tr key={r.id} className="border-b border-line">
                  <td className="px-2 py-1">
                    <select
                      className="h-11 w-full rounded-sm border border-line bg-bg px-2 font-sans text-sm"
                      value={r.kind}
                      onChange={(e) => {
                        const kind = e.target.value as UFactorKind;
                        setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, kind, u: comU(kind, zone, occ) } : x)));
                      }}
                    >
                      {kinds.map((k) => (
                        <option key={k} value={k}>
                          {COM_UFACTOR[k].unit}-{COM_UFACTOR[k].label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1">
                    <NumInput value={r.area} onChange={(n) => setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, area: n } : x)))} />
                  </td>
                  <td className="px-2 py-1">
                    <NumInput
                      value={r.u}
                      step="0.001"
                      onChange={(n) => setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, u: n } : x)))}
                    />
                  </td>
                  <td className="px-2 py-2">{cu}</td>
                  <td className="px-2 py-2">{fmt(r.u * r.area, 1)}</td>
                  <td className="px-2 py-1">
                    <button type="button" className="h-11 px-2 text-sm text-fail" onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))}>
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
        <GhostButton onClick={() => setRows((rs) => [...rs, { id: ++comSeq, kind: "wallWood", area: 500, u: comU("wallWood", zone, occ) }])}>
          Add assembly
        </GhostButton>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Proposed ΣUA" value={fmt(tot.prop, 1)} />
        <Stat label="Code ΣUA" value={fmt(tot.code, 1)} />
        <Stat label="Margin" value={fmt(tot.code - tot.prop, 1)} />
      </div>
      <div className="mt-3">
        <Verdict status={tot.pass ? "pass" : "fail"}>
          {tot.pass ? "Component performance alternative is satisfied." : "Proposed UA exceeds the code baseline."}
        </Verdict>
      </div>
    </Panel>
  );
}

export function FenestrationCalc() {
  const zone = useWorkbook((s) => s.zone);
  const fen = fenFor(zone);
  const [wall, setWall] = useState(12000);
  const [vert, setVert] = useState(2800);
  const [sky, setSky] = useState(200);
  const [roof, setRoof] = useState(10000);
  const [a, setA] = useState(3);
  const [b, setB] = useState(8);
  const [fixedU, setFixedU] = useState(fen.fixedU);
  const [shgc, setShgc] = useState(fen.shgc[0].sew ?? 0.4);
  const wwr = wall > 0 ? vert / wall : 0;
  const srr = roof > 0 ? sky / roof : 0;
  const pf = projectionFactor(a, b);
  const bin = pfBin(pf);
  const shgcMax = fen.shgc[bin].sew;
  const wwrOk = wwr <= VERTICAL_FEN_MAX || (wwr <= VERTICAL_FEN_DAYLIGHT && wwr > VERTICAL_FEN_MAX);
  return (
    <div className="grid gap-5">
      <Panel kicker="C402.4" title="Window-to-wall and skylight ratios">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Gross wall area">
            <NumInput value={wall} onChange={setWall} suffix="ft²" />
          </Field>
          <Field label="Vertical fenestration">
            <NumInput value={vert} onChange={setVert} suffix="ft²" />
          </Field>
          <Field label="Roof area">
            <NumInput value={roof} onChange={setRoof} suffix="ft²" />
          </Field>
          <Field label="Skylight area">
            <NumInput value={sky} onChange={setSky} suffix="ft²" />
          </Field>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Stat label="WWR" value={`${fmt(wwr * 100, 1)}%`} hint={`Max ${VERTICAL_FEN_MAX * 100}% (${VERTICAL_FEN_DAYLIGHT * 100}% with daylighting)`} />
          <Stat label="Skylight %" value={`${fmt(srr * 100, 1)}%`} hint={`Max ${SKYLIGHT_MAX * 100}% (${SKYLIGHT_DAYLIGHT * 100}% toplit)`} />
        </div>
        <div className="mt-3">
          <Verdict status={wwr <= VERTICAL_FEN_DAYLIGHT ? (wwr <= VERTICAL_FEN_MAX ? "pass" : "info") : "fail"}>
            {wwr <= VERTICAL_FEN_MAX
              ? "Vertical fenestration within 30%."
              : wwr <= VERTICAL_FEN_DAYLIGHT
                ? "Between 30% and 40% — daylighting of C402.4.1.1 required."
                : "Exceeds 40% WWR (prescriptive)."}
          </Verdict>
        </div>
        <div className="mt-2">
          <Verdict status={srr <= SKYLIGHT_DAYLIGHT ? (srr <= SKYLIGHT_MAX ? "pass" : "info") : "fail"}>
            {srr <= SKYLIGHT_MAX
              ? "Skylight area within 3%."
              : srr <= SKYLIGHT_DAYLIGHT
                ? "Between 3% and 6% — toplit daylight zone of C402.4.2 required."
                : "Exceeds 6% skylight area."}
          </Verdict>
        </div>
      </Panel>
      <Panel kicker="Table C402.4" title="U-factor and SHGC">
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          <Stat label="Fixed U max" value={String(fen.fixedU)} />
          <Stat label="Operable U max" value={String(fen.operU)} />
          <Stat label="Entrance door U" value={String(fen.entranceU)} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Projection A (overhang depth)">
            <NumInput value={a} onChange={setA} suffix="ft" />
          </Field>
          <Field label="Projection B (sill to overhang)">
            <NumInput value={b} onChange={setB} suffix="ft" />
          </Field>
          <Field label="Proposed fixed U">
            <NumInput value={fixedU} onChange={setFixedU} step="0.01" />
          </Field>
          <Field label="Proposed SHGC (SEW)">
            <NumInput value={shgc} onChange={setShgc} step="0.01" />
          </Field>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Stat label="PF = A/B" value={fmt(pf, 2)} />
          <Stat label="PF bin" value={bin === 0 ? "PF < 0.2" : bin === 1 ? "0.2 ≤ PF < 0.5" : "PF ≥ 0.5"} />
          <Stat label="SHGC max (SEW)" value={shgcMax == null ? "NR" : String(shgcMax)} />
        </div>
        <div className="mt-3 grid gap-2">
          <Verdict status={fixedU <= fen.fixedU ? "pass" : "fail"}>Fixed fenestration U {fmt(fixedU, 2)} vs max {fen.fixedU}</Verdict>
          <Verdict status={shgcMax == null || shgc <= shgcMax ? "pass" : "fail"}>
            {shgcMax == null ? "SHGC not required in this zone." : `SHGC ${fmt(shgc, 2)} vs max ${shgcMax}`}
          </Verdict>
        </div>
        <p className="mt-3 text-xs text-muted">
          Skylight U max {fen.skyU}
          {fen.skyShgc != null ? `, SHGC ${fen.skyShgc}` : ", SHGC NR"}. Air leakage of the building envelope ≤ {AIR_LEAKAGE_MAX} cfm/ft² at 75 Pa (C402.5).
        </p>
      </Panel>
      <Panel kicker="Table C402.5.2" title="Fenestration air leakage">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              <th className="py-2 text-xs text-muted">Type</th>
              <th className="py-2 text-xs text-muted">Max cfm/ft²</th>
              <th className="py-2 text-xs text-muted">Test</th>
            </tr>
          </thead>
          <tbody>
            {AIR_LEAKAGE_FEN.map((r) => (
              <tr key={r.type} className="border-b border-line">
                <td className="py-2">{r.type}</td>
                <td className="py-2 font-mono">{r.rate}</td>
                <td className="py-2 text-muted">{r.std}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

export function SkylightCalc() {
  const [area, setArea] = useState(120);
  const [vt, setVt] = useState(0.6);
  const [depth, setDepth] = useState(3);
  const [toplit, setToplit] = useState(2000);
  const ea = skylightEffectiveAperture(area, vt, depth, toplit);
  return (
    <Panel kicker="C402.4.2 Equation 4-4" title="Skylight effective aperture">
      <Formula>EA = 0.85 × skylight area × VT × WF / toplit area</Formula>
      <p className="mt-2 text-sm text-muted">WF = 0.90 when well depth is less than 2 ft, otherwise 0.70. Toplit daylight zone requires EA ≥ 1% (0.01) under C402.4.2.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Skylight area">
          <NumInput value={area} onChange={setArea} suffix="ft²" />
        </Field>
        <Field label="VT">
          <NumInput value={vt} onChange={setVt} step="0.01" />
        </Field>
        <Field label="Well depth">
          <NumInput value={depth} onChange={setDepth} suffix="ft" />
        </Field>
        <Field label="Toplit area">
          <NumInput value={toplit} onChange={setToplit} suffix="ft²" />
        </Field>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Stat label="Well factor" value={depth < 2 ? "0.90" : "0.70"} />
        <Stat label="Effective aperture" value={fmt(ea, 3)} />
      </div>
      <div className="mt-3">
        <Verdict status={ea >= 0.01 ? "pass" : "fail"}>EA {fmt(ea, 3)} {ea >= 0.01 ? "≥ 0.01" : "< 0.01 (does not qualify as toplit)"}</Verdict>
      </div>
    </Panel>
  );
}

export function ReflectanceCalc() {
  const [initial, setInitial] = useState(0.7);
  const aged = agedReflectance(initial);
  return (
    <Panel kicker="C402.3 Equation 4-3" title="Three-year aged solar reflectance">
      <Formula>ρ_aged = 0.2 + 0.7 × (ρ_initial − 0.2)</Formula>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field label="Initial solar reflectance">
          <NumInput value={initial} onChange={setInitial} step="0.01" min={0} max={1} />
        </Field>
        <Stat label="Aged reflectance" value={fmt(aged, 3)} />
      </div>
      <p className="mt-3 text-sm text-muted">
        Low-sloped roofs on buildings in climate zones 1–3 must have a 3-year-aged solar reflectance of at least 0.55 and a thermal emittance of at least 0.75, or an SRI of 64 — unless an exception applies.
      </p>
      <div className="mt-3">
        <Verdict status={aged >= 0.55 ? "pass" : "info"}>Aged reflectance {fmt(aged, 3)} vs 0.55 minimum (CZ 1–3 low-slope).</Verdict>
      </div>
    </Panel>
  );
}

export function TablesCalc() {
  const zone = useWorkbook((s) => s.zone);
  const col = commercialColumn(zone);
  const fen = FEN_C402[col];
  return (
    <Panel kicker="C402.4 snapshot" title={`Fenestration table for zone ${col}`}>
      <table className="w-full text-left text-sm">
        <tbody className="font-mono">
          <tr className="border-b border-line">
            <td className="py-2 font-sans">Fixed U</td>
            <td className="py-2">{fen.fixedU}</td>
          </tr>
          <tr className="border-b border-line">
            <td className="py-2 font-sans">Operable U</td>
            <td className="py-2">{fen.operU}</td>
          </tr>
          <tr className="border-b border-line">
            <td className="py-2 font-sans">Entrance U</td>
            <td className="py-2">{fen.entranceU}</td>
          </tr>
          <tr className="border-b border-line">
            <td className="py-2 font-sans">Skylight U</td>
            <td className="py-2">{fen.skyU}</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-3 text-sm text-muted">Use Residential envelope and Commercial envelope calculators for the full opaque tables of the selected zone.</p>
    </Panel>
  );
}
