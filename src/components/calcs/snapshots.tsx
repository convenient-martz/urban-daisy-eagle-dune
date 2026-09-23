import { useState } from "react";
import { Download, FolderOpen, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useWorkbook } from "@/lib/store";
import { downloadProjectXls, downloadSnapshotXls } from "@/lib/export-xls";
import { Field, GhostButton, Panel, PrimaryButton, Stat, TextInput } from "@/components/sheet";
import { zoneLabel } from "@/lib/iecc/climate";

function formatWhen(iso: string): string {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export function SnapshotsCalc() {
  const projectName = useWorkbook((s) => s.projectName);
  const setProjectName = useWorkbook((s) => s.setProjectName);
  const zone = useWorkbook((s) => s.zone);
  const occupancy = useWorkbook((s) => s.occupancy);
  const inputs = useWorkbook((s) => s.inputs);
  const snapshots = useWorkbook((s) => s.snapshots);
  const saveSnapshot = useWorkbook((s) => s.saveSnapshot);
  const restoreSnapshot = useWorkbook((s) => s.restoreSnapshot);
  const deleteSnapshot = useWorkbook((s) => s.deleteSnapshot);
  const [name, setName] = useState("");

  const defaultName = `${projectName || "Project"} · ${zone} · ${new Date().toLocaleDateString()}`;

  function save() {
    const snap = saveSnapshot(name.trim() || defaultName);
    setName("");
    toast.success(`Saved “${snap.name}”`);
  }

  function exportCurrent() {
    const file = downloadProjectXls({
      projectName,
      zone,
      occupancy,
      inputs,
      snapshotName: "Working copy",
    });
    toast.success(`Downloaded ${file}`);
  }

  return (
    <div className="grid gap-5">
      <Panel kicker="Working copy" title="Save and export this workbook">
        <p className="mb-4 text-sm text-muted">
          Snapshots freeze climate zone, occupancy, and every calculator input. Export writes an Excel workbook (.xls) with pass/fail sheets.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Project name">
            <TextInput value={projectName} onChange={setProjectName} placeholder="e.g. 120 Oak Street" />
          </Field>
          <Field label="Snapshot name">
            <TextInput value={name} onChange={setName} placeholder={defaultName} />
          </Field>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <PrimaryButton onClick={save}>Save snapshot</PrimaryButton>
          <GhostButton onClick={exportCurrent}>Export current as Excel</GhostButton>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Stat label="Zone" value={zone} hint={zoneLabel(zone)} />
          <Stat label="Occupancy" value={occupancy === "groupR" ? "Group R" : "All other"} />
          <Stat label="Saved snapshots" value={String(snapshots.length)} />
        </div>
      </Panel>

      <Panel kicker={`${snapshots.length} stored locally`} title="Snapshot library">
        {snapshots.length === 0 ? (
          <p className="text-sm text-muted">No snapshots yet. Save the working copy to keep a restore point.</p>
        ) : (
          <ul className="divide-y divide-line">
            {snapshots.map((snap) => (
              <li key={snap.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-ink">{snap.name}</p>
                  <p className="text-xs text-muted">
                    {formatWhen(snap.savedAt)} · {snap.zone} · {snap.occupancy === "groupR" ? "Group R" : "All other"}
                    {snap.projectName ? ` · ${snap.projectName}` : ""}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="inline-flex h-11 items-center gap-2 rounded-sm border border-line bg-bg px-3 text-sm font-medium text-ink-2"
                    onClick={() => {
                      restoreSnapshot(snap.id);
                      toast.success(`Restored “${snap.name}”`);
                    }}
                  >
                    <FolderOpen className="size-4" />
                    Restore
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-11 items-center gap-2 rounded-sm border border-line bg-bg px-3 text-sm font-medium text-ink-2"
                    onClick={() => {
                      const file = downloadSnapshotXls(snap);
                      toast.success(`Downloaded ${file}`);
                    }}
                  >
                    <Download className="size-4" />
                    Excel
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-11 items-center gap-2 rounded-sm px-3 text-sm font-medium text-fail"
                    onClick={() => {
                      deleteSnapshot(snap.id);
                      toast.message("Snapshot deleted");
                    }}
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
