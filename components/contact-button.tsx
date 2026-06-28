"use client";

import type { ReactNode } from "react";
import { useContact } from "./contact-modal-provider";

// A contact CTA that opens the app-wide contact modal. Drop-in replacement for
// the old `mailto:` anchors — pass the same className so styling is unchanged.
export function ContactButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { openContact } = useContact();
  return (
    <button type="button" onClick={openContact} className={className}>
      {children}
    </button>
  );
}
