import { useMemo, useState } from "react";
import { LIGHTING_ZONES, LPD_BUILDING, LPD_EXTERIOR, LPD_EXTERIOR_BASE, LPD_SPACE, type LightingZone } from "@/lib/iecc/lighting";
import { Field, GhostButton, NumInput, Panel, Select, Stat, Verdict } from "@/components/sheet";
import { fmt } from "@/lib/utils";

type BRow = { id: number; type: string; area: number; watts: number };
type SRow = { id: number; type: string; area: number; watts: number };
type ERow = { id: number; surface: string; qty: number; watts: number };

let bSeq = 1;
let sSeq = 1;
let eSeq = 1;

export function LpdBuildingCalc() {
  const [rows, setRows] = useState<BRow[]>([{ id: 1, type: "Office", area: 20000, watts: 14000 }]);
  const tot = useMemo(() => {
    let allowed = 0;
    let used = 0;
    for (const r of rows) {
      const lpd = LPD_BUILDING.find((x) => x.type === r.type)?.wsf ?? 0;
      allowed += lpd * r.area;
      used += r.watts;
    }
    return { allowed, used, pass: used <= allowed };
  }, [rows]);
  return (
    <Panel kicker="Table C405.3.2(1)" title="Building-area method">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              <th className="px-2 py-2 text-xs text-muted">Building type</th>
              <th className="px-2 py-2 text-xs text-muted">Area ft²</th>
              <th className="px-2 py-2 text-xs text-muted">LPD</th>
              <th className="px-2 py-2 text-xs text-muted">Allowed W</th>
              <th className="px-2 py-2 text-xs text-muted">Installed W</th>
              <th />
            </tr>
          </thead>
          <tbody className="font-mono tabular-nums">
            {rows.map((r) => {
              const lpd = LPD_BUILDING.find((x) => x.type === r.type)?.wsf ?? 0;
              return (
                <tr key={r.id} className="border-b border-line">
                  <td className="px-2 py-1">
                    <select
                      className="h-11 w-full rounded-sm border border-line bg-bg px-2 font-sans text-sm"
                      value={r.type}
                      onChange={(e) => setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, type: e.target.value } : x)))}
                    >
                      {LPD_BUILDING.map((t) => (
                        <option key={t.type}>{t.type}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1">
                    <NumInput value={r.area} onChange={(n) => setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, area: n } : x)))} />
                  </td>
                  <td className="px-2 py-2">{lpd.toFixed(2)}</td>
                  <td className="px-2 py-2">{fmt(lpd * r.area, 0)}</td>
                  <td className="px-2 py-1">
                    <NumInput value={r.watts} onChange={(n) => setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, watts: n } : x)))} />
                  </td>
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
        <GhostButton onClick={() => setRows((rs) => [...rs, { id: ++bSeq, type: "Office", area: 5000, watts: 3000 }])}>Add type</GhostButton>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Allowed" value={`${fmt(tot.allowed, 0)} W`} />
        <Stat label="Installed" value={`${fmt(tot.used, 0)} W`} />
        <Stat label="Remainder" value={`${fmt(tot.allowed - tot.used, 0)} W`} />
      </div>
      <div className="mt-3">
        <Verdict status={tot.pass ? "pass" : "fail"}>
          {tot.pass ? "Installed lighting power is within the building-area allowance." : "Installed lighting exceeds the building-area allowance."}
        </Verdict>
      </div>
    </Panel>
  );
}

export function LpdSpaceCalc() {
  const [rows, setRows] = useState<SRow[]>([
    { id: 1, type: "Office — open plan", area: 12000, watts: 10000 },
    { id: 2, type: "Corridor / transition", area: 2000, watts: 1000 },
  ]);
  const tot = useMemo(() => {
    let allowed = 0;
    let used = 0;
    for (const r of rows) {
      const lpd = LPD_SPACE.find((x) => x.type === r.type)?.wsf ?? 0;
      allowed += lpd * r.area;
      used += r.watts;
    }
    return { allowed, used, pass: used <= allowed };
  }, [rows]);
  return (
    <Panel kicker="Table C405.3.2(2)" title="Space-by-space method">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              <th className="px-2 py-2 text-xs text-muted">Space</th>
              <th className="px-2 py-2 text-xs text-muted">Area ft²</th>
              <th className="px-2 py-2 text-xs text-muted">LPD</th>
              <th className="px-2 py-2 text-xs text-muted">Allowed W</th>
              <th className="px-2 py-2 text-xs text-muted">Installed W</th>
              <th />
            </tr>
          </thead>
          <tbody className="font-mono tabular-nums">
            {rows.map((r) => {
              const lpd = LPD_SPACE.find((x) => x.type === r.type)?.wsf ?? 0;
              return (
                <tr key={r.id} className="border-b border-line">
                  <td className="px-2 py-1">
                    <select
                      className="h-11 w-full rounded-sm border border-line bg-bg px-2 font-sans text-sm"
                      value={r.type}
                      onChange={(e) => setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, type: e.target.value } : x)))}
                    >
                      {LPD_SPACE.map((t) => (
                        <option key={t.type}>{t.type}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1">
                    <NumInput value={r.area} onChange={(n) => setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, area: n } : x)))} />
                  </td>
                  <td className="px-2 py-2">{lpd.toFixed(2)}</td>
                  <td className="px-2 py-2">{fmt(lpd * r.area, 0)}</td>
                  <td className="px-2 py-1">
                    <NumInput value={r.watts} onChange={(n) => setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, watts: n } : x)))} />
                  </td>
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
        <GhostButton onClick={() => setRows((rs) => [...rs, { id: ++sSeq, type: "Restroom", area: 400, watts: 300 }])}>Add space</GhostButton>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Allowed" value={`${fmt(tot.allowed, 0)} W`} />
        <Stat label="Installed" value={`${fmt(tot.used, 0)} W`} />
        <Stat label="Remainder" value={`${fmt(tot.allowed - tot.used, 0)} W`} />
      </div>
      <div className="mt-3">
        <Verdict status={tot.pass ? "pass" : "fail"}>
          {tot.pass ? "Installed lighting power is within the space-by-space allowance." : "Installed lighting exceeds the space-by-space allowance."}
        </Verdict>
      </div>
    </Panel>
  );
}

export function LpdExteriorCalc() {
  const [lz, setLz] = useState<LightingZone>(3);
  const [rows, setRows] = useState<ERow[]>([{ id: 1, surface: "Uncovered parking areas", qty: 40000, watts: 3200 }]);
  const tot = useMemo(() => {
    const base = LPD_EXTERIOR_BASE[lz];
    let allowed = base;
    let used = 0;
    for (const r of rows) {
      const spec = LPD_EXTERIOR.find((x) => x.surface === r.surface);
      const lpd = spec?.values[lz] ?? 0;
      allowed += (lpd ?? 0) * r.qty;
      used += r.watts;
    }
    return { allowed, used, base, pass: used <= allowed };
  }, [rows, lz]);
  return (
    <Panel kicker="Table C405.4.2(2)" title="Exterior lighting power">
      <div className="mb-4 max-w-sm">
        <Field label="Lighting zone">
          <Select value={String(lz)} onChange={(v) => setLz(Number(v) as LightingZone)}>
            {LIGHTING_ZONES.map((z) => (
              <option key={z.id} value={z.id}>
                {z.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              <th className="px-2 py-2 text-xs text-muted">Surface</th>
              <th className="px-2 py-2 text-xs text-muted">Area or length</th>
              <th className="px-2 py-2 text-xs text-muted">Allowance</th>
              <th className="px-2 py-2 text-xs text-muted">Allowed W</th>
              <th className="px-2 py-2 text-xs text-muted">Installed W</th>
              <th />
            </tr>
          </thead>
          <tbody className="font-mono tabular-nums">
            {rows.map((r) => {
              const spec = LPD_EXTERIOR.find((x) => x.surface === r.surface);
              const lpd = spec?.values[lz];
              return (
                <tr key={r.id} className="border-b border-line">
                  <td className="px-2 py-1">
                    <select
                      className="h-11 w-full rounded-sm border border-line bg-bg px-2 font-sans text-sm"
                      value={r.surface}
                      onChange={(e) => setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, surface: e.target.value } : x)))}
                    >
                      {LPD_EXTERIOR.map((s) => (
                        <option key={s.surface}>{s.surface}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1">
                    <NumInput value={r.qty} onChange={(n) => setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, qty: n } : x)))} />
                  </td>
                  <td className="px-2 py-2">
                    {lpd == null ? "NR" : `${lpd} ${spec?.unit}`}
                  </td>
                  <td className="px-2 py-2">{lpd == null ? "—" : fmt(lpd * r.qty, 0)}</td>
                  <td className="px-2 py-1">
                    <NumInput value={r.watts} onChange={(n) => setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, watts: n } : x)))} />
                  </td>
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
        <GhostButton
          onClick={() => setRows((rs) => [...rs, { id: ++eSeq, surface: "Walkways less than 10 ft wide", qty: 200, watts: 120 }])}
        >
          Add surface
        </GhostButton>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Base site allowance" value={`${tot.base} W`} />
        <Stat label="Total allowed" value={`${fmt(tot.allowed, 0)} W`} />
        <Stat label="Installed" value={`${fmt(tot.used, 0)} W`} />
      </div>
      <div className="mt-3">
        <Verdict status={tot.pass ? "pass" : "fail"}>
          {tot.pass ? "Exterior lighting is within the tradable allowance plus base site wattage." : "Exterior lighting exceeds the allowance."}
        </Verdict>
      </div>
    </Panel>
  );
}
