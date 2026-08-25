export function SiteFooter() {
  return (
    <footer>
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-10 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-display font-semibold text-fg">Ryan Alexander Black</span>
          {" — AI Solutions"}
        </p>
        <p className="flex items-center gap-4 font-mono text-xs">
          <a className="hover:underline" href="/privacy">
            Privacy
          </a>
          <a className="hover:underline" href="/terms">
            Terms
          </a>
          <span>Built with Next.js · Tailwind</span>
        </p>
      </div>
    </footer>
  );
}
