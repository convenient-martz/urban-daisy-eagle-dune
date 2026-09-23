import { create } from "zustand";
import type { CalcId, ClimateKey } from "@/lib/iecc/types";
import {
  cloneInputs,
  defaultInputs,
  newSnapshotId,
  type Occupancy,
  type ProjectInputs,
  type Snapshot,
} from "@/lib/project";

const STORE_KEY = "iecc2018.v2";
const MAX_SNAPSHOTS = 40;

type WorkbookState = {
  zone: ClimateKey;
  occupancy: Occupancy;
  calc: CalcId;
  projectName: string;
  inputs: ProjectInputs;
  snapshots: Snapshot[];
  setZone: (zone: ClimateKey) => void;
  setOccupancy: (occupancy: Occupancy) => void;
  setCalc: (calc: CalcId) => void;
  setProjectName: (projectName: string) => void;
  patchInputs: (update: Partial<ProjectInputs> | ((prev: ProjectInputs) => ProjectInputs)) => void;
  saveSnapshot: (name: string) => Snapshot;
  restoreSnapshot: (id: string) => boolean;
  deleteSnapshot: (id: string) => void;
};

function persist(state: WorkbookState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      STORE_KEY,
      JSON.stringify({
        zone: state.zone,
        occupancy: state.occupancy,
        calc: state.calc,
        projectName: state.projectName,
        inputs: state.inputs,
        snapshots: state.snapshots,
      }),
    );
  } catch {
    /* quota */
  }
}

function after(set: (fn: (s: WorkbookState) => Partial<WorkbookState>) => void, fn: (s: WorkbookState) => Partial<WorkbookState>) {
  set((s) => {
    const patch = fn(s);
    const next = { ...s, ...patch } as WorkbookState;
    persist(next);
    return patch;
  });
}

export const useWorkbook = create<WorkbookState>((set, get) => ({
  zone: "5A",
  occupancy: "all",
  calc: "home",
  projectName: "Untitled project",
  inputs: defaultInputs("5A", "all"),
  snapshots: [],
  setZone: (zone) =>
    after(set, () => ({ zone })),
  setOccupancy: (occupancy) =>
    after(set, () => ({ occupancy })),
  setCalc: (calc) =>
    after(set, () => ({ calc })),
  setProjectName: (projectName) =>
    after(set, () => ({ projectName })),
  patchInputs: (update) =>
    after(set, (s) => ({
      inputs: typeof update === "function" ? update(s.inputs) : { ...s.inputs, ...update },
    })),
  saveSnapshot: (name) => {
    const s = get();
    const snap: Snapshot = {
      id: newSnapshotId(),
      name: name.trim() || `${s.projectName} · ${s.zone}`,
      savedAt: new Date().toISOString(),
      zone: s.zone,
      occupancy: s.occupancy,
      projectName: s.projectName,
      inputs: cloneInputs(s.inputs),
    };
    after(set, (cur) => ({ snapshots: [snap, ...cur.snapshots].slice(0, MAX_SNAPSHOTS) }));
    return snap;
  },
  restoreSnapshot: (id) => {
    const snap = get().snapshots.find((x) => x.id === id);
    if (!snap) return false;
    after(set, () => ({
      zone: snap.zone,
      occupancy: snap.occupancy,
      projectName: snap.projectName,
      inputs: cloneInputs(snap.inputs),
      calc: "home",
    }));
    return true;
  },
  deleteSnapshot: (id) =>
    after(set, (s) => ({ snapshots: s.snapshots.filter((x) => x.id !== id) })),
}));

export function hydrateWorkbook() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) {
      // migrate v1 keys if present
      const zone = window.localStorage.getItem("iecc2018.zone");
      const occ = window.localStorage.getItem("iecc2018.occ");
      const calc = window.localStorage.getItem("iecc2018.calc");
      const patch: Partial<WorkbookState> = {};
      if (zone && /^[1-8][ABC]?$/.test(zone)) patch.zone = zone as ClimateKey;
      if (occ === "all" || occ === "groupR") patch.occupancy = occ;
      if (calc) patch.calc = calc as CalcId;
      if (Object.keys(patch).length) {
        const z = (patch.zone ?? "5A") as ClimateKey;
        const o = (patch.occupancy ?? "all") as Occupancy;
        useWorkbook.setState({ ...patch, inputs: defaultInputs(z, o) });
      }
      persist(useWorkbook.getState());
      return;
    }
    const data = JSON.parse(raw) as Partial<WorkbookState>;
    const zone = (data.zone ?? "5A") as ClimateKey;
    const occupancy = (data.occupancy ?? "all") as Occupancy;
    useWorkbook.setState({
      zone,
      occupancy,
      calc: (data.calc ?? "home") as CalcId,
      projectName: typeof data.projectName === "string" ? data.projectName : "Untitled project",
      inputs: data.inputs ? { ...defaultInputs(zone, occupancy), ...data.inputs } : defaultInputs(zone, occupancy),
      snapshots: Array.isArray(data.snapshots) ? data.snapshots : [],
    });
  } catch {
    /* ignore corrupt store */
  }
}
