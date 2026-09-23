import { CATALOG, GROUPS } from "@/lib/iecc/catalog";
import type { CalcId } from "@/lib/iecc/types";
import { useWorkbook } from "@/lib/store";

export function HomeCalc({ onOpen }: { onOpen: (id: CalcId) => void }) {
  const zone = useWorkbook((s) => s.zone);
  return (
    <div>
      <header className="mb-8 max-w-2xl">
        <p className="font-mono text-xs tracking-widest text-faint uppercase">International Energy Conservation Code</p>
        <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">2018 IECC Workbook</h2>
        <p className="mt-3 text-base text-muted">
          Spreadsheet calculators built from the code tables and equations — climate zone {zone} is active and drives every lookup.
        </p>
      </header>
      <div className="grid gap-8">
        {GROUPS.filter((g) => g !== "Start").map((group) => (
          <section key={group}>
            <h3 className="mb-3 font-mono text-xs tracking-widest text-faint uppercase">{group}</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {CATALOG.filter((c) => c.group === group).map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onOpen(c.id)}
                  className="rounded-lg border border-line bg-surface p-4 text-left shadow-sheet transition-colors duration-150 hover:border-line-strong"
                >
                  <p className="font-mono text-xs text-faint">{c.section}</p>
                  <p className="font-display mt-1 text-lg font-semibold">{c.title}</p>
                  <p className="mt-1 text-sm text-muted">{c.blurb}</p>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
