export function SiteFooter() {
  return (
    <footer>
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-10 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-display font-semibold text-fg">Ryan Alexander Black</span>
          {" — AI Solutions Architect & Builder"}
        </p>
        <p className="font-mono text-xs">
          Built with Next.js · Tailwind · the AISA brand kit
        </p>
      </div>
    </footer>
  );
}
