import Link from "next/link";

// The primary call to action everywhere: the free AI report at /ai-report, the one front door
// (Ryan, 9 Nov 2026). The 2-minute report comes first, then the visitor applies for the full
// AI Opportunity Report. "Get in touch" keeps the contact form.
export function ReportButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/ai-report"
      className={`inline-block rounded-md bg-accent-solid px-5 py-2.5 font-medium text-accent-contrast transition-opacity hover:opacity-90 ${className}`}
    >
      Get Free AI Opportunity Report
    </Link>
  );
}
