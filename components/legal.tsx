// Privacy and terms wording, shared by the portfolio (ryanalexanderblack.com) and Greenline AI
// (greenlineai.nz), so the two policies can't drift apart. Each site passes its own Brand; the
// markup is plain sections, styled by the page that renders it.
import type { ReactNode } from "react";

export type Brand = {
  name: ReactNode; // how the business is named in the policy
  short: string; // the short name in the Google API wording
  site: string; // the website the policy covers
  who: ReactNode; // the "Who I am" / "The website" opening
  contact: string; // the email for questions and data requests
  newsletter: string; // the weekly email visitors join with the report
  contactForm: boolean; // the site has a contact form
  themeToggle: boolean; // the site remembers a light/dark choice
};

export const PORTFOLIO: Brand = {
  name: <strong>Ryan Alexander Black — AI Solutions (AIS)</strong>,
  short: "AIS",
  site: "ryanalexanderblack.com",
  who: (
    <>
      I&apos;m Ryan Alexander Black, operating as <strong>Ryan Alexander Black — AI Solutions (AIS)</strong>. I build
      AI-powered operating systems, reporting dashboards and automations for small to medium businesses. This policy
      covers this website (ryanalexanderblack.com) and the client services I run.
    </>
  ),
  contact: "ai@ryanalexanderblack.com",
  newsletter: "the weekly business pulse",
  contactForm: true,
  themeToggle: true,
};

export const GREENLINE: Brand = {
  name: <strong>Greenline AI</strong>,
  short: "Greenline AI",
  site: "greenlineai.nz",
  who: (
    <>
      <strong>Greenline AI</strong> is the AI business of Ryan Alexander Black. I build AI tools and automations that
      help growing New Zealand businesses grow their profit. This policy covers this website (greenlineai.nz) and the
      client services I run.
    </>
  ),
  contact: "ryan@greenlineai.nz",
  newsletter: "Signal over Noise, the weekly Greenline AI email",
  contactForm: false,
  themeToggle: false,
};

const Mail = ({ to }: { to: string }) => <a className="underline" href={`mailto:${to}`}>{to}</a>;

export function PrivacyBody({ brand: b }: { brand: Brand }) {
  return (
    <>
      <section>
        <h2>Who I am</h2>
        <p>{b.who}</p>
      </section>

      <section>
        <h2>This website</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong>Analytics and ad measurement.</strong> To see which pages and ads bring people here, the site may use
            Google Analytics, Google Ads conversion tracking and the Meta (Facebook/Instagram) Pixel. These set cookies
            and send those companies details such as the pages you visit and whether you asked for a report. Your
            browser also stores{b.themeToggle ? " your light/dark theme preference and" : ""}, for the current visit
            only, the campaign link you arrived from.
          </li>
          {b.contactForm && (
            <li>
              <strong>Contact form.</strong> If you use the contact form, the details you send (name, email, message) are
              delivered to me by email and used only to reply to you. They are not added to any marketing list or shared
              with anyone.
            </li>
          )}
          <li>
            <strong>Hosting.</strong> The site is hosted on Vercel, which may keep standard server logs (IP address,
            request time) for security and operations.
          </li>
        </ul>
      </section>

      <section>
        <h2>The free AI Profit Snapshot</h2>
        <p>If you ask for the free AI Profit Snapshot on this site, here is what happens with your information:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong>What I collect:</strong> your email, your business website address, the answers you choose to give
            (role, team size, revenue band, tools and so on), the campaign link you arrived from, and, if you apply for
            the Full AI Opportunity Report, your name, mobile and best time to call.
          </li>
          <li>
            <strong>How the report is made:</strong>{" "}the public pages of your website are read by Firecrawl, and the
            report is written by Anthropic&apos;s Claude AI from those pages and your answers.
          </li>
          <li>
            <strong>How it&apos;s used:</strong>{" "}your report is emailed to you (sent through Resend), and I get a copy so
            I can follow up. If you apply for the full report, I&apos;ll ring you to talk it through. You&apos;ll also
            get {b.newsletter} by email; every email lets you unsubscribe.
          </li>
          <li>Your details are never sold or shared beyond the services named here, and I&apos;ll delete them whenever you ask.</li>
        </ul>
      </section>

      <section>
        <h2>Client services and business data</h2>
        <p>
          My client work involves connecting to a client&apos;s own business systems (for example accounting, booking,
          and advertising platforms) to build private, password-gated reporting dashboards and automations for that
          client. In that work:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Data is accessed <strong>only with the client&apos;s authorisation</strong>, through accounts and credentials
            the client controls, and is used solely to deliver the agreed service to that client.
          </li>
          <li>
            Each client&apos;s data is kept separate and is visible only in that client&apos;s own private dashboard.
            Client data is never sold, rented, or shared with third parties.
          </li>
          <li>
            Credentials are stored in encrypted hosting-platform configuration and a password vault — never in public
            code or client-facing surfaces.
          </li>
        </ul>
      </section>

      <section>
        <h2>Google API Services (including the Google Ads API)</h2>
        <p>
          Some client dashboards retrieve data from Google services — for example campaign performance data (spend,
          impressions, clicks, conversions) from a client&apos;s own Google Ads account, accessed via a manager-account
          link the client has approved.
        </p>
        <p>
          {b.short}&apos;s use of information received from Google APIs adheres to the{" "}
          <a className="underline" href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements. In practice: Google data is used only to render reports in the
          relevant client&apos;s own dashboard; it is cached briefly for page loading, is not used for advertising, and
          is never sold or transferred to third parties except as needed to provide the service, with the client&apos;s
          consent, or where required by law. No AI or machine-learning models are trained on this data.
        </p>
      </section>

      <section>
        <h2>Retention and deletion</h2>
        <p>
          Contact messages are kept only as long as our correspondence needs them. Client business data lives in the
          client&apos;s own systems; dashboard caches are short-lived and rebuilt from source. When an engagement ends,
          access credentials are handed over to the client or revoked, and any working copies are deleted on request.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions, or a data request? Email <Mail to={b.contact} />.
        </p>
      </section>
    </>
  );
}

export function TermsBody({ brand: b }: { brand: Brand }) {
  return (
    <>
      <section>
        <h2>The website</h2>
        <p>
          {b.site === PORTFOLIO.site ? (
            <>
              ryanalexanderblack.com is the portfolio and contact site of Ryan Alexander Black, operating as {b.name}.
            </>
          ) : (
            <>
              {b.site} is the website of {b.name}, the AI business of Ryan Alexander Black.
            </>
          )}{" "}
          The content is provided for general information about my work. You may browse and link to it freely; please
          don&apos;t misrepresent the work shown here as your own.
        </p>
      </section>

      <section>
        <h2>Client services</h2>
        <p>
          Consulting, build and installation work is delivered under a written proposal or agreement made with each
          client. Where these terms and a signed client agreement differ, the client agreement applies. Client
          dashboards and tools are private services for the named client and their authorised team only.
        </p>
      </section>

      <section>
        <h2>Connected services</h2>
        <p>
          Client services may connect to third-party platforms (for example Google, Meta, Xero) under those
          platforms&apos; own terms. Access is authorised by the client and can be revoked by the client at any time. Use
          of data from Google APIs is described in the{" "}
          <a className="underline" href="/privacy">
            Privacy Policy
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Liability</h2>
        <p>
          The website and its content are provided &quot;as is&quot; without warranties of any kind. To the extent
          permitted by law, I&apos;m not liable for loss arising from use of the website. Liability in client engagements
          is governed by the relevant client agreement.
        </p>
      </section>

      <section>
        <h2>Changes and contact</h2>
        <p>
          These terms may be updated from time to time; the effective date above changes when they do. Questions:{" "}
          <Mail to={b.contact} />.
        </p>
      </section>
    </>
  );
}
