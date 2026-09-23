import { useState } from "react";
import {
  FAN_COEFF,
  HOOD_RATES,
  HW_PIPE_MIN,
  PIPE_INSULATION,
  PIPE_NPS,
  PIPE_RADIUS_IN,
  SWH_TABLE,
  chillerAdjKwPerTon,
  chillerKadj,
  equivalentThickness,
  ervRequired,
  ervThresholdCfm,
  fanNameplateHp,
  fanSystemBhp,
  ptacCap,
  ptacCoolEer,
  pthpHeatCop,
  standbyLossBtu,
} from "@/lib/iecc/mechanical";
import { useWorkbook } from "@/lib/store";
import { Field, Formula, NumInput, Panel, Select, Stat, Verdict } from "@/components/sheet";
import { fmt } from "@/lib/utils";

export function FanCalc() {
  const [cfm, setCfm] = useState(12000);
  const [vav, setVav] = useState(true);
  const [nameplate, setNameplate] = useState(15);
  const [bhp, setBhp] = useState(12);
  const [adj, setAdj] = useState(0);
  const allowHp = fanNameplateHp(cfm, vav);
  const allowBhp = fanSystemBhp(cfm, vav, adj);
  return (
    <Panel kicker="Table C403.8.1" title="Fan power limitation">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Supply airflow">
          <NumInput value={cfm} onChange={setCfm} suffix="cfm" />
        </Field>
        <Field label="System type">
          <Select value={vav ? "vav" : "cv"} onChange={(v) => setVav(v === "vav")}>
            <option value="cv">Constant volume</option>
            <option value="vav">Variable volume</option>
          </Select>
        </Field>
        <Field label="Nameplate hp (proposed)">
          <NumInput value={nameplate} onChange={setNameplate} suffix="hp" />
        </Field>
        <Field label="Fan system bhp">
          <NumInput value={bhp} onChange={setBhp} suffix="bhp" />
        </Field>
      </div>
      <Field label="Pressure-drop adjustment A (Option 2)">
        <NumInput value={adj} onChange={setAdj} />
      </Field>
      <Formula>
        Option 1 nameplate: CFM × {vav ? FAN_COEFF.nameplate.vav : FAN_COEFF.nameplate.cv}. Option 2 bhp: CFM ×{" "}
        {vav ? FAN_COEFF.bhp.vav : FAN_COEFF.bhp.cv} + A
      </Formula>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Stat label="Allowable nameplate" value={`${fmt(allowHp, 2)} hp`} />
        <Stat label="Allowable bhp" value={`${fmt(allowBhp, 2)} bhp`} />
      </div>
      <div className="mt-3 grid gap-2">
        <Verdict status={nameplate <= allowHp ? "pass" : "fail"}>
          Option 1: {fmt(nameplate, 2)} hp vs {fmt(allowHp, 2)} hp allowed
        </Verdict>
        <Verdict status={bhp <= allowBhp ? "pass" : "fail"}>
          Option 2: {fmt(bhp, 2)} bhp vs {fmt(allowBhp, 2)} bhp allowed
        </Verdict>
      </div>
      <p className="mt-3 text-xs text-muted">Applies to each fan system with total nameplate ≥ 5 hp. Either option may be used.</p>
    </Panel>
  );
}

export function ErvCalc() {
  const zone = useWorkbook((s) => s.zone);
  const [oa, setOa] = useState(0.4);
  const [cfm, setCfm] = useState(8000);
  const [hrs, setHrs] = useState(false);
  const t = ervThresholdCfm(zone, oa, hrs);
  const req = ervRequired(zone, oa, cfm, hrs);
  return (
    <Panel kicker="Table C403.7.4.2" title="Exhaust air energy recovery">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Outdoor air fraction">
          <NumInput value={oa} onChange={setOa} step="0.05" min={0} max={1} />
        </Field>
        <Field label="Design supply airflow">
          <NumInput value={cfm} onChange={setCfm} suffix="cfm" />
        </Field>
        <Field label="Annual hours">
          <Select value={hrs ? "ge" : "lt"} onChange={(v) => setHrs(v === "ge")}>
            <option value="lt">Less than 8,000 h/yr</option>
            <option value="ge">8,000 h/yr or more</option>
          </Select>
        </Field>
        <Stat label="Threshold" value={t == null ? "NR" : `${fmt(t, 0)} cfm`} />
      </div>
      <div className="mt-3">
        <Verdict status={req ? "fail" : "pass"}>
          {req
            ? `Energy recovery is required — supply ${fmt(cfm, 0)} cfm is at or above the ${fmt(t ?? 0, 0)} cfm threshold.`
            : t == null
              ? "Energy recovery is not required (NR) for this climate / OA bin."
              : `Energy recovery is not required — supply is below ${fmt(t, 0)} cfm.`}
        </Verdict>
      </div>
      <p className="mt-3 text-xs text-muted">
        Sensible recovery effectiveness ≥ 50% where required. Several exceptions in C403.7.4.2 still apply (kitchen exhaust, dedicated outdoor air already recovered, etc.).
      </p>
    </Panel>
  );
}

export function HvacCalc() {
  const [btuh, setBtuh] = useState(12000);
  const [repl, setRepl] = useState(false);
  const cap = ptacCap(btuh);
  const eer = ptacCoolEer(btuh, repl);
  const cop = pthpHeatCop(btuh, repl);
  return (
    <Panel kicker="Table C403.3.2(3)" title="PTAC / PTHP minimum efficiency">
      <Formula>
        EER = {repl ? "10.9 − 0.213" : "14.0 − 0.300"} × Cap/1000 · COP_h = {repl ? "2.9 − 0.026" : "3.7 − 0.052"} × Cap/1000
      </Formula>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field label="Rated cooling capacity">
          <NumInput value={btuh} onChange={setBtuh} suffix="Btu/h" />
        </Field>
        <Field label="Construction">
          <Select value={repl ? "r" : "n"} onChange={(v) => setRepl(v === "r")}>
            <option value="n">New construction</option>
            <option value="r">Replacement</option>
          </Select>
        </Field>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Cap used" value={`${fmt(cap, 0)} Btu/h`} hint="clamped 7,000–15,000" />
        <Stat label="Cooling EER" value={fmt(eer, 2)} />
        <Stat label="Heating COP (PTHP)" value={fmt(cop, 2)} />
      </div>
    </Panel>
  );
}

export function ChillerCalc() {
  const [cewt, setCewt] = useState(85);
  const [clwt, setClwt] = useState(44);
  const [table, setTable] = useState(0.61);
  const lift = cewt - clwt;
  const ka = chillerKadj(lift, "A");
  const kb = chillerKadj(lift, "B");
  return (
    <Panel kicker="C403.3.2.1 Equations 4-6 / 4-7" title="Centrifugal chiller Kadj">
      <Formula>LIFT = CEWT − CLWT · Kadj_A = 6.174722 − 0.303813A + 0.006251A² − 0.00004583A³</Formula>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Condenser entering (°F)">
          <NumInput value={cewt} onChange={setCewt} />
        </Field>
        <Field label="Chilled leaving (°F)">
          <NumInput value={clwt} onChange={setClwt} />
        </Field>
        <Field label="Table FL kW/ton">
          <NumInput value={table} onChange={setTable} step="0.01" />
        </Field>
        <Stat label="LIFT" value={`${fmt(lift, 1)} °F`} />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Stat label="Kadj Path A (FL)" value={fmt(ka, 4)} hint={`Adj FL ${fmt(chillerAdjKwPerTon(table, ka), 3)} kW/ton`} />
        <Stat label="Kadj Path B (IPLV)" value={fmt(kb, 4)} hint={`Adj IPLV ${fmt(chillerAdjKwPerTon(table, kb), 3)} kW/ton`} />
      </div>
      <p className="mt-3 text-xs text-muted">
        Applies when leaving-fluid or condenser temperatures differ from the AHRI 550/590 rating conditions. Path A is full-load; Path B is IPLV.V.s.
      </p>
    </Panel>
  );
}

export function PipeCalc() {
  const [tempIdx, setTempIdx] = useState(1);
  const [nps, setNps] = useState<(typeof PIPE_NPS)[number]>("1½–3\"");
  const [kInst, setKInst] = useState(0.27);
  const [kTable, setKTable] = useState(0.27);
  const row = PIPE_INSULATION[tempIdx];
  const t = row.nps[nps];
  const r = PIPE_RADIUS_IN[nps];
  const teq = equivalentThickness(r, t, kInst, kTable);
  return (
    <Panel kicker="Table C403.11.3" title="HVAC piping insulation">
      <Formula>T = r [(1 + t/r)^(k/K) − 1]</Formula>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field label="Fluid operating temperature">
          <Select value={String(tempIdx)} onChange={(v) => setTempIdx(Number(v))}>
            {PIPE_INSULATION.map((p, i) => (
              <option key={p.temp} value={i}>
                {p.temp}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Nominal pipe size">
          <Select value={nps} onChange={(v) => setNps(v as (typeof PIPE_NPS)[number])}>
            {PIPE_NPS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </Select>
        </Field>
        <Field label="Installed conductivity k">
          <NumInput value={kInst} onChange={setKInst} step="0.01" />
        </Field>
        <Field label="Table conductivity K">
          <NumInput value={kTable} onChange={setKTable} step="0.01" />
        </Field>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Table thickness t" value={`${t} in`} hint={`k range ${row.conductivity}`} />
        <Stat label="Pipe radius r" value={`${r} in`} />
        <Stat label="Equivalent T" value={`${fmt(teq, 2)} in`} />
      </div>
    </Panel>
  );
}

export function SwhCalc() {
  const [v, setV] = useState(80);
  return (
    <div className="grid gap-5">
      <Panel kicker="Table C404.2" title="Service water-heating equipment">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="py-2 text-xs text-muted">Equipment</th>
                <th className="py-2 text-xs text-muted">Size</th>
                <th className="py-2 text-xs text-muted">Minimum efficiency</th>
              </tr>
            </thead>
            <tbody>
              {SWH_TABLE.map((r) => (
                <tr key={r.equipment + r.size} className="border-b border-line">
                  <td className="py-2">{r.equipment}</td>
                  <td className="py-2">{r.size}</td>
                  <td className="py-2">{r.efficiency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Field label="Storage volume V">
            <NumInput value={v} onChange={setV} suffix="gal" />
          </Field>
          <Stat label="Standby loss (gas storage >75 kBtu/h)" value={`${fmt(standbyLossBtu(v), 0)} Btu/h`} hint="110√V + 800/(V/2)" />
        </div>
      </Panel>
    </div>
  );
}

export function HwPipeCalc() {
  return (
    <Panel kicker="C404.4 / R403.5.3" title="Service hot-water piping insulation">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line">
            <th className="py-2 text-xs text-muted">Piping</th>
            <th className="py-2 text-xs text-muted">Minimum insulation</th>
          </tr>
        </thead>
        <tbody>
          {HW_PIPE_MIN.map((r) => (
            <tr key={r.location} className="border-b border-line">
              <td className="py-2 pr-3">{r.location}</td>
              <td className="py-2">{r.thickness}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}

export function HoodCalc() {
  const [type, setType] = useState(HOOD_RATES[0].type);
  const [duty, setDuty] = useState<"light" | "medium" | "heavy" | "extra">("medium");
  const [len, setLen] = useState(8);
  const [exhaust, setExhaust] = useState(2400);
  const row = HOOD_RATES.find((h) => h.type === type) ?? HOOD_RATES[0];
  const rate = row[duty];
  const allow = rate * len;
  return (
    <Panel kicker="Table C403.7.5" title="Kitchen exhaust hoods">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Hood type">
          <Select value={type} onChange={setType}>
            {HOOD_RATES.map((h) => (
              <option key={h.type}>{h.type}</option>
            ))}
          </Select>
        </Field>
        <Field label="Duty">
          <Select value={duty} onChange={(v) => setDuty(v as typeof duty)}>
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="heavy">Heavy</option>
            <option value="extra">Extra heavy</option>
          </Select>
        </Field>
        <Field label="Hood length">
          <NumInput value={len} onChange={setLen} suffix="ft" />
        </Field>
        <Field label="Design exhaust">
          <NumInput value={exhaust} onChange={setExhaust} suffix="cfm" />
        </Field>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Stat label="Max cfm per lip foot" value={String(rate)} />
        <Stat label="Max exhaust" value={`${fmt(allow, 0)} cfm`} />
      </div>
      <div className="mt-3">
        <Verdict status={exhaust <= allow ? "pass" : "fail"}>
          {exhaust <= allow ? "Exhaust is within the Table C403.7.5 rate." : "Exhaust exceeds the maximum for this hood type and duty."}
        </Verdict>
      </div>
    </Panel>
  );
}
