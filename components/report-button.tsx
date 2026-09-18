"use client";

import { useContact } from "./contact-modal-provider";

// The primary call to action everywhere: request the Free AI Opportunity Report.
export function ReportButton({ className = "" }: { className?: string }) {
  const { openReport } = useContact();
  return (
    <button
      onClick={openReport}
      className={`rounded-md bg-accent-solid px-5 py-2.5 font-medium text-accent-contrast transition-opacity hover:opacity-90 ${className}`}
    >
      Get Free AI Opportunity Report
    </button>
  );
}
