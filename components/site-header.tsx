import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-header backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/brand/logo-mark.svg"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7"
            priority
          />
          <span className="font-display text-base font-bold tracking-tight">
            Ryan Alexander Black
          </span>
        </Link>
        <nav className="flex items-center gap-3 text-sm sm:gap-6">
          <Link href="/#work" className="text-fg-muted transition-colors hover:text-fg">
            Work
          </Link>
          <a
            href="mailto:alexanderthegreatcoaching@gmail.com"
            className="hidden rounded-md bg-accent-solid px-3.5 py-1.5 font-medium text-accent-contrast transition-opacity hover:opacity-90 sm:inline-block"
          >
            Get in touch
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
