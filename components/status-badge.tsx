import { STATUS_LABEL, type ProjectStatus } from "@/lib/projects";

// Raw hex palette (green-brand) for the tinted states — alpha modifiers only
// work on hex colours, not the var()-based semantic tokens.
const STYLES: Record<ProjectStatus, string> = {
  shipped: "text-accent border-green-brand/40 bg-green-brand/10",
  live: "text-accent border-green-brand/40 bg-green-brand/10",
  building: "text-warning border-border bg-surface",
  planned: "text-fg-muted border-border bg-surface",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider ${STYLES[status]}`}
    >
      {(status === "shipped" || status === "live") && (
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
      )}
      {STATUS_LABEL[status]}
    </span>
  );
}
