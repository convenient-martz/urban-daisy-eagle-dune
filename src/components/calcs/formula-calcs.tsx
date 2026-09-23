import { useState } from "react";
import { agedReflectance, projectionFactor, skylightEffectiveAperture } from "@/lib/iecc/commercial";
import { equivalentThickness, ptacCoolEer, chillerKadj } from "@/lib/iecc/mechanical";
import { steelStudU, wholeHouseVentCfm } from "@/lib/iecc/residential";
import { isDryClimate } from "@/lib/iecc/climate";
import { Field, Formula, NumInput, Panel, Stat } from "@/components/sheet";
import { fmt } from "@/lib/utils";

export function FormulaLibrary() {
  const [cfa, setCfa] = useState(2000);
  const [br, setBr] = useState(3);
  const [rs, setRs] = useState(0.79);
  const [er, setEr] = useState(6.45);
  const [a, setA] = useState(2);
  const [b, setB] = useState(6);
  const [rho, setRho] = useState(0.7);
  const [skyA, setSkyA] = useState(100);
  const [vt, setVt] = useState(0.55);
  const [depth, setDepth] = useState(4);
  const [toplit, setToplit] = useState(1800);
  const [r, setR] = useState(1.75);
  const [t, setT] = useState(1.5);
  const [kInst, setKInst] = useState(0.28);
  const [kTable, setKTable] = useState(0.27);
  const [cap, setCap] = useState(12000);
  const [lift, setLift] = useState(41);
  const [p, setP] = useState(18);
  const [tm, setTm] = useState(55);
  const [f, setF] = useState(4);
  const [press, setPress] = useState(25);

  return (
    <div className="grid gap-5">
      <Panel kicker="Extracted equations" title="Live formula library">
        <p className="mb-4 text-sm text-muted">
          Each identity is evaluated as you edit. Section references are 2018 IECC unless noted.
        </p>
        <div className="grid gap-6">
          <div>
            <Formula>Q_vent = 0.01 × CFA + 7.5 × (N_br + 1) · R403.6</Formula>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <Field label="CFA">
                <NumInput value={cfa} onChange={setCfa} />
              </Field>
              <Field label="Bedrooms">
                <NumInput value={br} onChange={setBr} />
              </Field>
              <Stat label="Q" value={`${fmt(wholeHouseVentCfm(cfa, br), 1)} cfm`} />
            </div>
          </div>
          <div>
            <Formula>U_steel = 1 / (R_s + E_R) · R402.2.6</Formula>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <Field label="R_s">
                <NumInput value={rs} onChange={setRs} />
              </Field>
              <Field label="E_R">
                <NumInput value={er} onChange={setEr} />
              </Field>
              <Stat label="U" value={fmt(steelStudU(rs, er), 3)} />
            </div>
          </div>
          <div>
            <Formula>PF = A / B · C402.4.3</Formula>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <Field label="A">
                <NumInput value={a} onChange={setA} />
              </Field>
              <Field label="B">
                <NumInput value={b} onChange={setB} />
              </Field>
              <Stat label="PF" value={fmt(projectionFactor(a, b), 2)} />
            </div>
          </div>
          <div>
            <Formula>ρ_aged = 0.2 + 0.7 (ρ_i − 0.2) · Eq. 4-3</Formula>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="ρ initial">
                <NumInput value={rho} onChange={setRho} />
              </Field>
              <Stat label="ρ aged" value={fmt(agedReflectance(rho), 3)} />
            </div>
          </div>
          <div>
            <Formula>EA = 0.85 × A_sky × VT × WF / A_toplit · Eq. 4-4</Formula>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <Field label="A_sky">
                <NumInput value={skyA} onChange={setSkyA} />
              </Field>
              <Field label="VT">
                <NumInput value={vt} onChange={setVt} />
              </Field>
              <Field label="Well depth">
                <NumInput value={depth} onChange={setDepth} />
              </Field>
              <Field label="A_toplit">
                <NumInput value={toplit} onChange={setToplit} />
              </Field>
              <Stat label="EA" value={fmt(skylightEffectiveAperture(skyA, vt, depth, toplit), 3)} />
            </div>
          </div>
          <div>
            <Formula>T = r [(1 + t/r)^(k/K) − 1] · C403.11.3</Formula>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <Field label="r">
                <NumInput value={r} onChange={setR} />
              </Field>
              <Field label="t">
                <NumInput value={t} onChange={setT} />
              </Field>
              <Field label="k">
                <NumInput value={kInst} onChange={setKInst} />
              </Field>
              <Field label="K">
                <NumInput value={kTable} onChange={setKTable} />
              </Field>
              <Stat label="T" value={fmt(equivalentThickness(r, t, kInst, kTable), 2)} />
            </div>
          </div>
          <div>
            <Formula>EER_PTAC = 14.0 − 0.300 × Cap/1000 · C403.3.2(3)</Formula>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="Cap Btu/h">
                <NumInput value={cap} onChange={setCap} />
              </Field>
              <Stat label="EER" value={fmt(ptacCoolEer(cap), 2)} />
            </div>
          </div>
          <div>
            <Formula>Kadj_A = 6.174722 − 0.303813A + 0.006251A² − 0.00004583A³ · Eq. 4-6</Formula>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="LIFT A (°F)">
                <NumInput value={lift} onChange={setLift} />
              </Field>
              <Stat label="Kadj" value={fmt(chillerKadj(lift, "A"), 4)} />
            </div>
          </div>
          <div>
            <Formula>{"Dry if P_m < 0.44 × (T − 19.5) · Table C301.3(1)"}</Formula>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <Field label="P_m (in)">
                <NumInput value={p} onChange={setP} />
              </Field>
              <Field label="T (°F)">
                <NumInput value={tm} onChange={setTm} />
              </Field>
              <Stat label="Class" value={isDryClimate(p, tm) ? "Dry (B)" : "Moist (A)"} />
            </div>
          </div>
          <div>
            <Formula>CL = F × P^0.65 · duct leakage class</Formula>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <Field label="Leakage class F">
                <NumInput value={f} onChange={setF} />
              </Field>
              <Field label="Pressure P (Pa)">
                <NumInput value={press} onChange={setPress} />
              </Field>
              <Stat label="CL" value={fmt(f * press ** 0.65, 2)} />
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
