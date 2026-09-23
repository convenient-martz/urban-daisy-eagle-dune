import { useMemo, useState } from "react";
import { CLIMATE_KEYS, INTERIOR_DESIGN, STATES, THERMAL_CRITERIA, dryThresholdInches, searchCounties, zoneFromDegreeDays, zoneLabel } from "@/lib/iecc/climate";
import { DEFAULT_FEN, OPAQUE_DOOR_DEFAULT } from "@/lib/iecc/mechanical";
import { useWorkbook } from "@/lib/store";
import { Field, Formula, NumInput, Panel, Select, Stat, TextInput, Verdict } from "@/components/sheet";
import type { ClimateKey } from "@/lib/iecc/types";

export function ClimateCalc() {
  const zone = useWorkbook((s) => s.zone);
  const setZone = useWorkbook((s) => s.setZone);
  const [state, setState] = useState("");
  const [q, setQ] = useState("");
  const [cdd, setCdd] = useState(4500);
  const [hdd, setHdd] = useState(5400);
  const [marine, setMarine] = useState(false);
  const [precip, setPrecip] = useState(20);
  const [meanT, setMeanT] = useState(55);

  const hits = useMemo(() => searchCounties(q, state || undefined), [q, state]);
  const dry = precip < dryThresholdInches(meanT);
  const fromDd = zoneFromDegreeDays({ cdd50: cdd, hdd65: hdd, marine, dry });

  return (
    <div className="grid gap-5">
      <Panel kicker="Table C301.1 / R301.1" title="County lookup">
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <Field label="State">
            <Select value={state} onChange={setState}>
              <option value="">All states</option>
              {STATES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="County">
            <TextInput value={q} onChange={setQ} placeholder="Start typing a county" />
          </Field>
        </div>
        <div className="max-h-80 overflow-auto rounded-md border border-line">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-surface">
              <tr className="border-b border-line">
                <th className="px-3 py-2 text-xs font-medium text-muted">County</th>
                <th className="px-3 py-2 text-xs font-medium text-muted">State</th>
                <th className="px-3 py-2 text-xs font-medium text-muted">Zone</th>
                <th className="px-3 py-2 text-xs font-medium text-muted">Warm-humid</th>
              </tr>
            </thead>
            <tbody>
              {hits.map((h) => (
                <tr
                  key={`${h.state}-${h.county}`}
                  className="cursor-pointer border-b border-line last:border-0 hover:bg-bg-2"
                  onClick={() => setZone(h.zone)}
                >
                  <td className="px-3 py-2">{h.county}</td>
                  <td className="px-3 py-2 font-mono">{h.state}</td>
                  <td className="px-3 py-2 font-mono">{h.zone}</td>
                  <td className="px-3 py-2 text-muted">{h.warmHumid ? "Yes (R301.2)" : "—"}</td>
                </tr>
              ))}
              {hits.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-3 py-6 text-center text-muted">
                    No counties match.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted">Select a row to set the workbook climate zone. Current: {zoneLabel(zone)}.</p>
      </Panel>

      <Panel kicker="Table C301.3" title="Thermal criteria">
        <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="CDD50°F">
            <NumInput value={cdd} onChange={setCdd} />
          </Field>
          <Field label="HDD65°F">
            <NumInput value={hdd} onChange={setHdd} />
          </Field>
          <Field label="Annual precip (in)">
            <NumInput value={precip} onChange={setPrecip} />
          </Field>
          <Field label="Mean annual temp (°F)">
            <NumInput value={meanT} onChange={setMeanT} />
          </Field>
        </div>
        <label className="mb-4 flex h-11 items-center gap-2 text-sm">
          <input type="checkbox" checked={marine} onChange={(e) => setMarine(e.target.checked)} />
          Marine location (C301.3)
        </label>
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          <Stat label="Dry threshold" value={`${dryThresholdInches(meanT).toFixed(1)} in`} hint="0.44 × (T − 19.5)" />
          <Stat label="Moisture" value={dry ? "Dry (B)" : "Moist (A)"} />
          <Stat label="Resulting zone" value={fromDd} />
        </div>
        <Verdict status="info">
          Computed zone {fromDd}. Apply this zone to the workbook?
        </Verdict>
        <button
          type="button"
          className="mt-3 h-11 rounded-sm bg-accent px-4 text-sm font-medium text-accent-fg"
          onClick={() => setZone(fromDd as ClimateKey)}
        >
          Use {fromDd}
        </button>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="py-2 text-xs text-muted">Zone</th>
                <th className="py-2 text-xs text-muted">IP</th>
                <th className="py-2 text-xs text-muted">SI</th>
              </tr>
            </thead>
            <tbody>
              {THERMAL_CRITERIA.map((r) => (
                <tr key={r.zone} className="border-b border-line">
                  <td className="py-2 font-mono">{r.zone}</td>
                  <td className="py-2">{r.ip}</td>
                  <td className="py-2 text-muted">{r.si}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

export function DefaultsCalc() {
  return (
    <div className="grid gap-5">
      <Panel kicker="C302.1 / R302.1" title="Interior design temperatures">
        <Formula>{INTERIOR_DESIGN.note}</Formula>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Stat label="Heating, maximum" value={`${INTERIOR_DESIGN.heatingMaxF} °F`} />
          <Stat label="Cooling, minimum" value={`${INTERIOR_DESIGN.coolingMinF} °F`} />
        </div>
      </Panel>
      <Panel kicker="Table C303.1.3(1)" title="Unlabeled fenestration defaults">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="py-2 text-xs text-muted">Glazing</th>
                <th className="py-2 text-xs text-muted">U-factor</th>
                <th className="py-2 text-xs text-muted">SHGC</th>
                <th className="py-2 text-xs text-muted">VT</th>
              </tr>
            </thead>
            <tbody className="font-mono tabular-nums">
              {DEFAULT_FEN.map((r) => (
                <tr key={r.desc} className="border-b border-line">
                  <td className="py-2 font-sans">{r.desc}</td>
                  <td className="py-2">{r.u.toFixed(2)}</td>
                  <td className="py-2">{r.shgc.toFixed(2)}</td>
                  <td className="py-2">{r.vt.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Stat label="Swinging opaque door (default U)" value={OPAQUE_DOOR_DEFAULT.swinging.toFixed(2)} />
          <Stat label="Nonswinging opaque door (default U)" value={OPAQUE_DOOR_DEFAULT.nonswinging.toFixed(2)} />
        </div>
      </Panel>
      <Panel kicker="C301.3" title="All climate keys">
        <div className="flex flex-wrap gap-2">
          {CLIMATE_KEYS.map((k) => (
            <span key={k} className="rounded-sm border border-line bg-bg px-2 py-1 font-mono text-sm">
              {k}
            </span>
          ))}
        </div>
      </Panel>
    </div>
  );
}
