import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  title,
  kicker,
  children,
  className,
}: {
  title?: string;
  kicker?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-xl border border-line bg-surface p-4 shadow-sheet sm:p-5", className)}>
      {(kicker || title) && (
        <header className="mb-4">
          {kicker && (
            <p className="font-mono text-xs tracking-wide text-faint uppercase">{kicker}</p>
          )}
          {title && <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>}
        </header>
      )}
      {children}
    </section>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className="text-sm font-medium text-ink-2">{label}</span>
      {children}
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-sm border border-line bg-bg px-3 font-mono text-sm text-ink tabular-nums outline-none transition-colors duration-150 focus:border-accent";

export function NumInput({
  value,
  onChange,
  step = "any",
  min,
  max,
  suffix,
  disabled,
}: {
  value: number;
  onChange: (n: number) => void;
  step?: string;
  min?: number;
  max?: number;
  suffix?: string;
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      <input
        type="number"
        inputMode="decimal"
        className={cn(inputClass, suffix && "pr-12", disabled && "opacity-60")}
        value={Number.isFinite(value) ? value : ""}
        step={step}
        min={min}
        max={max}
        disabled={disabled}
        onChange={(e) => {
          const v = e.target.value;
          onChange(v === "" ? Number.NaN : Number(v));
        }}
      />
      {suffix && (
        <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 font-mono text-xs text-faint">
          {suffix}
        </span>
      )}
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      className={cn(inputClass, "font-sans")}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function Select({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: ReactNode;
}) {
  return (
    <select
      className={cn(inputClass, "font-sans")}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {children}
    </select>
  );
}

export function Verdict({
  status,
  children,
}: {
  status: "pass" | "fail" | "na" | "info";
  children: ReactNode;
}) {
  const cls =
    status === "pass"
      ? "bg-pass-bg text-pass"
      : status === "fail"
        ? "bg-fail-bg text-fail"
        : status === "na"
          ? "bg-warn-bg text-warn"
          : "bg-info-bg text-info";
  const word =
    status === "pass" ? "Pass" : status === "fail" ? "Fail" : status === "na" ? "N/A" : "Note";
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
        cls,
      )}
    >
      <span className="font-mono text-xs tracking-wide uppercase">{word}</span>
      <span>{children}</span>
    </div>
  );
}

export function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-md border border-line bg-bg px-3 py-2.5">
      <p className="text-xs text-muted">{label}</p>
      <p className="font-mono text-lg text-ink tabular-nums">{value}</p>
      {hint && <p className="text-xs text-faint">{hint}</p>}
    </div>
  );
}

export function SheetTable({
  columns,
  children,
}: {
  columns: string[];
  children: ReactNode;
}) {
  return (
    <div className="-mx-1 overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line">
            {columns.map((c) => (
              <th key={c} className="px-2 py-2 text-xs font-medium tracking-wide text-muted uppercase">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-mono text-sm tabular-nums">{children}</tbody>
      </table>
    </div>
  );
}

export function Formula({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-md bg-bg-2 px-3 py-2 font-mono text-sm text-ink-2">{children}</p>
  );
}

export function GhostButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-11 rounded-sm border border-line bg-bg px-3 text-sm font-medium text-ink-2 transition-colors duration-150 hover:border-line-strong hover:bg-bg-2"
    >
      {children}
    </button>
  );
}

export function PrimaryButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-11 rounded-sm bg-accent px-4 text-sm font-medium text-accent-fg transition-colors duration-150 hover:bg-accent-2"
    >
      {children}
    </button>
  );
}
