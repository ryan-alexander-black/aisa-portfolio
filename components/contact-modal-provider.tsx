"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { ContactModal, type ContactVariant } from "./contact-modal";

// One contact modal for the whole app. Any "Get in touch" button — in the
// header, the hero, or a case-study page — opens this same form via useContact().
// The "report" variant is the Free AI Opportunity Report request (the main CTA).
const ContactContext = createContext<{
  openContact: () => void;
  openReport: () => void;
}>({
  openContact: () => {},
  openReport: () => {},
});

export function useContact() {
  return useContext(ContactContext);
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<ContactVariant>("message");
  const openContact = useCallback(() => {
    setVariant("message");
    setOpen(true);
  }, []);
  const openReport = useCallback(() => {
    setVariant("report");
    setOpen(true);
  }, []);

  return (
    <ContactContext.Provider value={{ openContact, openReport }}>
      {children}
      <ContactModal open={open} variant={variant} onClose={() => setOpen(false)} />
    </ContactContext.Provider>
  );
}
