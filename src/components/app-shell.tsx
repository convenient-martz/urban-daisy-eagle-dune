import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { hydrateWorkbook, useWorkbook } from "@/lib/store";
import { CATALOG, GROUPS, calcMeta } from "@/lib/iecc/catalog";
import { CLIMATE_KEYS, zoneLabel } from "@/lib/iecc/climate";
import type { CalcId, ClimateKey } from "@/lib/iecc/types";
import { cn } from "@/lib/utils";
import { CalcView } from "@/components/calcs/calc-view";
import { SnapshotBar } from "@/components/snapshot-bar";

export function AppShell() {
  const zone = useWorkbook((s) => s.zone);
  const occupancy = useWorkbook((s) => s.occupancy);
  const calc = useWorkbook((s) => s.calc);
  const setZone = useWorkbook((s) => s.setZone);
  const setOccupancy = useWorkbook((s) => s.setOccupancy);
  const setCalc = useWorkbook((s) => s.setCalc);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    hydrateWorkbook();
  }, []);

  const meta = calcMeta(calc);
  const grouped = useMemo(
    () => GROUPS.map((g) => ({ group: g, items: CATALOG.filter((c) => c.group === g && c.id !== "home") })),
    [],
  );

  return (
    <div className="min-h-dvh bg-bg text-ink">
      <div className="flex min-h-dvh">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 w-72 overflow-y-auto bg-sidebar text-sidebar-fg transition-transform duration-200 lg:static lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <button
              type="button"
              onClick={() => setCalc("home")}
              className="text-left"
            >
              <p className="font-mono text-xs tracking-widest text-sidebar-muted uppercase">2018 IECC</p>
              <p className="font-display text-lg leading-tight font-semibold">Workbook</p>
            </button>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-sm text-sidebar-fg lg:hidden"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>
          <nav className="px-3 pb-10">
            {grouped.map(({ group, items }) =>
              items.length === 0 ? null : (
                <div key={group} className="mb-4">
                  <p className="px-2 pt-2 pb-1 font-mono text-[10px] tracking-widest text-sidebar-muted uppercase">
                    {group}
                  </p>
                  {items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setCalc(item.id);
                        setOpen(false);
                      }}
                      className={cn(
                        "mb-0.5 w-full rounded-sm px-2 py-2 text-left text-sm leading-snug transition-colors duration-150",
                        calc === item.id
                          ? "bg-sidebar-2 text-sidebar-fg"
                          : "text-sidebar-muted hover:bg-sidebar-2 hover:text-sidebar-fg",
                      )}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              ),
            )}
          </nav>
        </aside>
        {open && (
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-20 bg-ink/40 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 flex flex-wrap items-center gap-3 border-b border-line bg-surface/95 px-4 py-3 backdrop-blur-sm sm:px-6">
            <button
              type="button"
              className="grid size-11 place-items-center rounded-sm border border-line lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-xs text-faint">{meta.section}</p>
              <h1 className="font-display truncate text-lg font-semibold sm:text-xl">{meta.title}</h1>
            </div>
            <label className="flex items-center gap-2">
              <span className="hidden text-xs text-muted sm:inline">Zone</span>
              <select
                className="h-11 rounded-sm border border-line bg-bg px-2 font-mono text-sm"
                value={zone}
                onChange={(e) => setZone(e.target.value as ClimateKey)}
                aria-label="Climate zone"
              >
                {CLIMATE_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2">
              <span className="hidden text-xs text-muted sm:inline">Occ.</span>
              <select
                className="h-11 max-w-[9.5rem] rounded-sm border border-line bg-bg px-2 text-sm"
                value={occupancy}
                onChange={(e) => setOccupancy(e.target.value as "all" | "groupR")}
                aria-label="Occupancy"
              >
                <option value="all">All other</option>
                <option value="groupR">Group R</option>
              </select>
            </label>
            <SnapshotBar />
          </header>

          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
            <p className="mb-5 text-sm text-muted">{zoneLabel(zone)} · {occupancy === "groupR" ? "Group R" : "All other occupancy"}</p>
            <CalcView id={calc} onOpen={(id: CalcId) => setCalc(id)} />
          </main>
        </div>
      </div>
    </div>
  );
}
