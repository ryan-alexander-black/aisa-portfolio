import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Ryan Alexander Black",
  description:
    "Terms of service for ryanalexanderblack.com and the client services of Ryan Alexander Black — AI Solutions (AIS).",
};

const EFFECTIVE = "26 August 2026";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">
        Ryan Alexander Black — AI Solutions (AIS)
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-fg-muted">Effective {EFFECTIVE}</p>

      <div className="mt-10 space-y-8 leading-relaxed text-fg [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_p]:mt-3 [&_p]:text-[15px] [&_li]:text-[15px]">
        <section>
          <h2>The website</h2>
          <p>
            ryanalexanderblack.com is the portfolio and contact site of Ryan
            Alexander Black, operating as{" "}
            <strong>Ryan Alexander Black — AI Solutions (AIS)</strong>. The
            content is provided for general information about my work. You may
            browse and link to it freely; please don&apos;t misrepresent the
            work shown here as your own.
          </p>
        </section>

        <section>
          <h2>Client services</h2>
          <p>
            Consulting, build and installation work is delivered under a
            written proposal or agreement made with each client. Where these
            terms and a signed client agreement differ, the client agreement
            applies. Client dashboards and tools are private services for the
            named client and their authorised team only.
          </p>
        </section>

        <section>
          <h2>Connected services</h2>
          <p>
            Client services may connect to third-party platforms (for example
            Google, Meta, Xero) under those platforms&apos; own terms. Access is
            authorised by the client and can be revoked by the client at any
            time. Use of data from Google APIs is described in the{" "}
            <a className="underline" href="/privacy">
              Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Liability</h2>
          <p>
            The website and its content are provided &quot;as is&quot; without
            warranties of any kind. To the extent permitted by law, I&apos;m not
            liable for loss arising from use of the website. Liability in
            client engagements is governed by the relevant client agreement.
          </p>
        </section>

        <section>
          <h2>Changes and contact</h2>
          <p>
            These terms may be updated from time to time; the effective date
            above changes when they do. Questions:{" "}
            <a className="underline" href="mailto:ai@ryanalexanderblack.com">
              ai@ryanalexanderblack.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
