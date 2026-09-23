import { useState } from "react";
import { Camera, Download, X } from "lucide-react";
import { toast } from "sonner";
import { useWorkbook } from "@/lib/store";
import { downloadProjectXls } from "@/lib/export-xls";

export function SnapshotBar() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const projectName = useWorkbook((s) => s.projectName);
  const zone = useWorkbook((s) => s.zone);
  const occupancy = useWorkbook((s) => s.occupancy);
  const inputs = useWorkbook((s) => s.inputs);
  const saveSnapshot = useWorkbook((s) => s.saveSnapshot);
  const setCalc = useWorkbook((s) => s.setCalc);

  const placeholder = `${projectName || "Project"} · ${zone}`;

  return (
    <div className="relative flex items-center gap-2">
      <button
        type="button"
        className="grid size-11 place-items-center rounded-sm border border-line bg-bg text-ink-2"
        aria-label="Save snapshot"
        title="Save snapshot"
        onClick={() => setOpen((v) => !v)}
      >
        <Camera className="size-4" />
      </button>
      <button
        type="button"
        className="grid size-11 place-items-center rounded-sm border border-line bg-bg text-ink-2"
        aria-label="Export Excel"
        title="Export Excel (.xls)"
        onClick={() => {
          const file = downloadProjectXls({
            projectName,
            zone,
            occupancy,
            inputs,
            snapshotName: "Working copy",
          });
          toast.success(`Downloaded ${file}`);
        }}
      >
        <Download className="size-4" />
      </button>
      {open && (
        <div className="absolute top-12 right-0 z-40 w-[min(20rem,calc(100vw-2rem))] rounded-lg border border-line bg-surface p-3 shadow-sheet">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium">Save snapshot</p>
            <button type="button" className="grid size-8 place-items-center" onClick={() => setOpen(false)} aria-label="Close">
              <X className="size-4" />
            </button>
          </div>
          <input
            className="h-11 w-full rounded-sm border border-line bg-bg px-3 text-sm outline-none focus:border-accent"
            value={name}
            placeholder={placeholder}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const snap = saveSnapshot(name.trim() || placeholder);
                setName("");
                setOpen(false);
                toast.success(`Saved “${snap.name}”`);
              }
            }}
          />
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              className="h-11 flex-1 rounded-sm bg-accent px-3 text-sm font-medium text-accent-fg"
              onClick={() => {
                const snap = saveSnapshot(name.trim() || placeholder);
                setName("");
                setOpen(false);
                toast.success(`Saved “${snap.name}”`);
              }}
            >
              Save
            </button>
            <button
              type="button"
              className="h-11 rounded-sm border border-line px-3 text-sm"
              onClick={() => {
                setOpen(false);
                setCalc("snapshots");
              }}
            >
              Library
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
