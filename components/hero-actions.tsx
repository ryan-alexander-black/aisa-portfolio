import { ReportButton } from "./report-button";

export function HeroActions() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
      <ReportButton />
      <a
        href="#client-work"
        className="glass-card rounded-md border border-border px-5 py-2.5 font-medium text-fg transition-colors hover:border-green-brand/50"
      >
        See the work
      </a>
    </div>
  );
}
