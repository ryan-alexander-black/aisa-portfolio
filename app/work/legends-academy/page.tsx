import type { Metadata } from "next";
import { getClient } from "@/lib/clients";
import { ClientCaseStudy } from "@/components/client-case-study";

const client = getClient("legends-academy")!;

export const metadata: Metadata = {
  title: `${client.company} — Client case study | Ryan Alexander Black`,
  description: client.page!.intro,
};

export default function Page() {
  return <ClientCaseStudy client={client} />;
}
