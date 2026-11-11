// Renders the Greenline snapshot email with a sample report, for a local look in the browser.
// Run: npx tsx scripts/preview-greenline-email.ts <out.html>
import { writeFileSync } from "node:fs";
import { greenlineSnapshotPreview } from "../lib/mini-report/emails";

const rep = {
  business_name: "Bay Signs & Print",
  opportunities: [
    { title: "Quotes written in minutes, not evenings", today: "Each quote is typed up by hand after hours from site notes and supplier price lists.", with_ai: "Talk through the job on site; AI drafts the quote on your own prices, ready to check and send.", evidence: "Your site says quotes go out within 48 hours and lists 6 sign types.", profit: "Quotes out the same day win more jobs, and your evenings go back to paid work.", hours_low: 3, hours_high: 5 },
    { title: "Every enquiry answered the same day", today: "Website and Facebook enquiries wait until someone is back at the desk.", with_ai: "AI replies straight away with the right questions and books a site visit into your calendar.", evidence: "You answered that enquiries come in by phone, email and Facebook.", hours_low: 2, hours_high: 3 },
    { title: "Job updates without the phone tag", today: "Customers ring to ask where their job is up to.", with_ai: "A short AI update goes out at each stage, from proof to install.", evidence: "You picked 'Customer messages' as a time-sink.", hours_low: 1, hours_high: 2 },
  ],
} as Parameters<typeof greenlineSnapshotPreview>[0];

writeFileSync(process.argv[2] ?? "greenline-email-preview.html", greenlineSnapshotPreview(rep, "good"));
console.log("written");
