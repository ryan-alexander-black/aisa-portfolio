import type { Metadata } from "next";
import { MiniReportFlow } from "./mini-report-flow";
import "./mini-report.css";

export const metadata: Metadata = {
  title: "Free AI report for your business | Ryan Alexander Black",
  description:
    "Pop in your website. AI reads it and finds 3 places AI could save your Hawke's Bay business time and money, in about two minutes. Free.",
  alternates: { canonical: "/ai-report" },
};

export default function AiReportPage() {
  return <MiniReportFlow />;
}
