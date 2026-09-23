import type { CalcId } from "@/lib/iecc/types";
import { HomeCalc } from "./home";
import { ClimateCalc, DefaultsCalc } from "./climate-calcs";
import { EriCalc, ResAirCalc, ResEnvelopeCalc, ResUaCalc, SteelCalc } from "./res-calcs";
import { ComEnvelopeCalc, ComUaCalc, FenestrationCalc, ReflectanceCalc, SkylightCalc, TablesCalc } from "./com-calcs";
import { LpdBuildingCalc, LpdExteriorCalc, LpdSpaceCalc } from "./lighting-calcs";
import { ChillerCalc, ErvCalc, FanCalc, HoodCalc, HvacCalc, HwPipeCalc, PipeCalc, SwhCalc } from "./mech-calcs";
import { FormulaLibrary } from "./formula-calcs";
import { SnapshotsCalc } from "./snapshots";

export function CalcView({ id, onOpen }: { id: CalcId; onOpen: (id: CalcId) => void }) {
  switch (id) {
    case "home":
      return <HomeCalc onOpen={onOpen} />;
    case "snapshots":
      return <SnapshotsCalc />;
    case "climate":
      return <ClimateCalc />;
    case "defaults":
      return <DefaultsCalc />;
    case "res-envelope":
      return <ResEnvelopeCalc />;
    case "res-ua":
      return <ResUaCalc />;
    case "res-air":
      return <ResAirCalc />;
    case "steel":
      return <SteelCalc />;
    case "eri":
      return <EriCalc />;
    case "com-envelope":
      return <ComEnvelopeCalc />;
    case "com-ua":
      return <ComUaCalc />;
    case "fenestration":
      return <FenestrationCalc />;
    case "skylight":
      return <SkylightCalc />;
    case "reflectance":
      return <ReflectanceCalc />;
    case "lpd-building":
      return <LpdBuildingCalc />;
    case "lpd-space":
      return <LpdSpaceCalc />;
    case "lpd-exterior":
      return <LpdExteriorCalc />;
    case "fan":
      return <FanCalc />;
    case "erv":
      return <ErvCalc />;
    case "hvac":
      return <HvacCalc />;
    case "chiller":
      return <ChillerCalc />;
    case "pipe":
      return <PipeCalc />;
    case "swh":
      return <SwhCalc />;
    case "hw-pipe":
      return <HwPipeCalc />;
    case "hood":
      return <HoodCalc />;
    case "formulas":
      return <FormulaLibrary />;
    case "tables":
      return <TablesCalc />;
    default:
      return <HomeCalc onOpen={onOpen} />;
  }
}
