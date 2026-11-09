import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Ryan Alexander Black",
  description:
    "How Ryan Alexander Black — AI Solutions (AIS) handles personal information, client business data, and data accessed through connected services such as the Google Ads API.",
};

// Effective date is maintained by hand — bump it whenever the policy's substance changes.
const EFFECTIVE = "5 November 2026";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-fg-muted">
        Ryan Alexander Black — AI Solutions (AIS)
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-fg-muted">Effective {EFFECTIVE}</p>

      <div className="mt-10 space-y-8 leading-relaxed text-fg [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_p]:mt-3 [&_p]:text-[15px] [&_li]:text-[15px]">
        <section>
          <h2>Who I am</h2>
          <p>
            I&apos;m Ryan Alexander Black, operating as{" "}
            <strong>Ryan Alexander Black — AI Solutions (AIS)</strong>. I build
            AI-powered operating systems, reporting dashboards and automations
            for small to medium businesses. This policy covers this website
            (ryanalexanderblack.com) and the client services I run.
          </p>
        </section>

        <section>
          <h2>This website</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong>Analytics and ad measurement.</strong> To see which pages
              and ads bring people here, the site may use Google Analytics,
              Google Ads conversion tracking and the Meta (Facebook/Instagram)
              Pixel. These set cookies and send those companies details such as
              the pages you visit and whether you asked for a report. Your
              browser also stores your light/dark theme preference and, for
              the current visit only, the campaign link you arrived from.
            </li>
            <li>
              <strong>Contact form.</strong> If you use the contact form, the
              details you send (name, email, message) are delivered to me by
              email and used only to reply to you. They are not added to any
              marketing list or shared with anyone.
            </li>
            <li>
              <strong>Hosting.</strong> The site is hosted on Vercel, which may
              keep standard server logs (IP address, request time) for security
              and operations.
            </li>
          </ul>
        </section>

        <section>
          <h2>The free AI report</h2>
          <p>
            If you ask for the free AI report on this site, here is what
            happens with your information:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong>What I collect:</strong> your email, your business
              website address, the answers you choose to give (role, team size,
              revenue band, tools and so on), the campaign link you arrived
              from, and, if you apply for the full AI Opportunity Report, your
              name, mobile and best time to call.
            </li>
            <li>
              <strong>How the report is made:</strong> the public pages of your
              website are read by Firecrawl, and the report is written by
              Anthropic&apos;s Claude AI from those pages and your answers.
            </li>
            <li>
              <strong>How it&apos;s used:</strong> your report is emailed to you
              (sent through Resend), and I get a copy so I can follow up. If
              you apply for the full report, I&apos;ll ring you to talk it
              through. You&apos;ll also get the weekly business pulse by email;
              every email lets you unsubscribe.
            </li>
            <li>
              Your details are never sold or shared beyond the services named
              here, and I&apos;ll delete them whenever you ask.
            </li>
          </ul>
        </section>

        <section>
          <h2>Client services and business data</h2>
          <p>
            My client work involves connecting to a client&apos;s own business
            systems (for example accounting, booking, and advertising
            platforms) to build private, password-gated reporting dashboards
            and automations for that client. In that work:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              Data is accessed <strong>only with the client&apos;s
              authorisation</strong>, through accounts and credentials the
              client controls, and is used solely to deliver the agreed service
              to that client.
            </li>
            <li>
              Each client&apos;s data is kept separate and is visible only in
              that client&apos;s own private dashboard. Client data is never
              sold, rented, or shared with third parties.
            </li>
            <li>
              Credentials are stored in encrypted hosting-platform
              configuration and a password vault — never in public code or
              client-facing surfaces.
            </li>
          </ul>
        </section>

        <section>
          <h2>Google API Services (including the Google Ads API)</h2>
          <p>
            Some client dashboards retrieve data from Google services — for
            example campaign performance data (spend, impressions, clicks,
            conversions) from a client&apos;s own Google Ads account, accessed
            via a manager-account link the client has approved.
          </p>
          <p>
            AIS&apos;s use of information received from Google APIs adheres to
            the{" "}
            <a
              className="underline"
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements. In practice: Google data
            is used only to render reports in the relevant client&apos;s own
            dashboard; it is cached briefly for page loading, is not used for
            advertising, and is never sold or transferred to third parties
            except as needed to provide the service, with the client&apos;s
            consent, or where required by law. No AI or machine-learning models
            are trained on this data.
          </p>
        </section>

        <section>
          <h2>Retention and deletion</h2>
          <p>
            Contact messages are kept only as long as our correspondence needs
            them. Client business data lives in the client&apos;s own systems;
            dashboard caches are short-lived and rebuilt from source. When an
            engagement ends, access credentials are handed over to the client
            or revoked, and any working copies are deleted on request.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions, or a data request? Email{" "}
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
