"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { ContactModal } from "./contact-modal";

// One contact modal for the whole app. Any "Get in touch" button — in the
// header, the hero, or a case-study page — opens this same form via useContact().
const ContactContext = createContext<{ openContact: () => void }>({
  openContact: () => {},
});

export function useContact() {
  return useContext(ContactContext);
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openContact = useCallback(() => setOpen(true), []);

  return (
    <ContactContext.Provider value={{ openContact }}>
      {children}
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </ContactContext.Provider>
  );
}
