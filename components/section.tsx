// Shared case-study section block. Plain title + body, consistent rhythm.
// Used by every /projects/<slug> case-study page so they stay uniform.

export function Section({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="mt-14">
      <h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-fg [&_p]:text-[15px]">{children}</div>
    </section>
  );
}
