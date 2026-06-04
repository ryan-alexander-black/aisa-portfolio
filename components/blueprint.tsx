// "System blueprint" motif primitives.
//
// The AISA mark is three nodes joined into an upward peak — an 'A' that also
// reads as a system diagram. These reuse that exact vocabulary (peak, nodes,
// connector lines) as section furniture, so the whole site reads like a
// schematic the work is plotted on. Additive only — drop them in beside the
// existing layout; they don't replace it.

export function Peak({ className = "" }: { className?: string }) {
  // The apex of the mark on its own — a narrow upward chevron.
  return (
    <svg viewBox="0 0 32 22" className={className} fill="none" aria-hidden>
      <path
        d="M2 20 L16 3 L30 20"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// A mono eyebrow prefixed with the peak — the primary section signal.
export function MarkEyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`inline-flex items-center gap-2.5 ${className}`}>
      <Peak className="h-3 w-[18px] text-accent" />
      <span className="eyebrow">{children}</span>
    </p>
  );
}

// A group/node label: index · peak · name, trailed by a connector line so a
// list of groups reads like plotted nodes on the schematic.
export function NodeLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-plate inline-flex items-center gap-3">
        <span className="font-mono text-xs text-accent">{index}</span>
        <Peak className="h-2.5 w-3.5 text-accent" />
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-fg-muted">{children}</span>
      </span>
      <span className="h-px flex-1 bg-border" aria-hidden />
    </div>
  );
}

// L-shaped registration marks at each corner — a technical-drawing detail that
// frames whatever it wraps (use inside a `relative` container).
export function CornerTicks({ className = "" }: { className?: string }) {
  const base = "pointer-events-none absolute h-3 w-3 border-accent/60";
  return (
    <span className={className} aria-hidden>
      <span className={`${base} -left-px -top-px border-l border-t`} />
      <span className={`${base} -right-px -top-px border-r border-t`} />
      <span className={`${base} -bottom-px -left-px border-b border-l`} />
      <span className={`${base} -bottom-px -right-px border-b border-r`} />
    </span>
  );
}

// line — node — peak — node — line: the mark's crossbar + apex, as a divider.
export function PeakDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-border ${className}`} aria-hidden>
      <span className="h-px flex-1 bg-current" />
      <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
      <Peak className="h-3 w-[18px] text-accent" />
      <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
      <span className="h-px flex-1 bg-current" />
    </div>
  );
}
