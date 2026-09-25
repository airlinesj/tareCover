import { notFound } from "next/navigation";
import { TareCheckout } from "@/components/tare-checkout";
import { ClaimsPortal } from "@/components/claims-portal";
import { HealthInsurancePage } from "@/components/health-insurance-page";
import { WorkspaceSection } from "@/components/workspace-section";
import { WorkspaceTools } from "@/components/workspace-tools";

const sections = {
  policies: {
    title: "Policies",
    eyebrow: "Policy register",
    description: "Review active cover issued across Mbare, Siyaso and nearby market stalls.",
    metric: "326",
    metricLabel: "Active policies",
    items: ["Filter policies by market, trader or cover status", "Open a digital certificate for each active policy", "Export a monthly policy register for association records"],
  },
  claims: {
    title: "Claims",
    eyebrow: "Claims desk",
    description: "Verify reported stock losses and keep mobile-wallet payouts moving.",
    metric: "7",
    metricLabel: "Open claims",
    items: ["Prioritise the 2 claims due for review today", "Check captured stock evidence and claim timelines", "Approve verified payouts in United States dollars"],
  },
  traders: {
    title: "Traders",
    eyebrow: "Trader directory",
    description: "Keep one clear view of the people and small businesses you protect.",
    metric: "184",
    metricLabel: "Registered traders",
    items: ["Find traders by stall, market association or phone number", "View cover history and current stock values", "Invite a new trader into the workspace"],
  },
  capture: {
    title: "Stock capture",
    eyebrow: "Field tools",
    description: "Capture purchase evidence from a phone with a timestamp and market context.",
    metric: "98%",
    metricLabel: "Capture completion",
    items: ["Open the mobile-first capture flow for a new purchase", "Attach a compressed stock photo to the policy record", "Review recent captures before issuing cover"],
  },
  checkout: {
    title: "Checkout widget",
    eyebrow: "Wholesaler tools",
    description: "Add a clear protection option to invoices without changing the way customers pay.",
    metric: "0.8%",
    metricLabel: "Starting premium",
    items: ["Preview premiums in United States dollars as stock value changes", "Choose Essential or Plus cover for each invoice", "Copy the embed configuration for a partner checkout"],
  },
  health: {
    title: "Health insurance",
    eyebrow: "Health micro-voucher",
    description: "See the health amount taken from each protected restock, the benefits it unlocks, and how to claim them.",
    metric: "US$1.00",
    metricLabel: "Maximum health contribution",
    items: ["See your health deduction separately from stock insurance", "Understand the care and pharmacy benefits attached to your tier", "Start a demo claim against your available health allowance"],
  },
  help: {
    title: "Help centre",
    eyebrow: "Support",
    description: "Find the answers market leaders and field agents need most often.",
    metric: "24/7",
    metricLabel: "Guidance available",
    items: ["Learn how stock evidence is captured and verified", "Review payout and policy status definitions", "Contact the Tare Cover operations team"],
  },
} as const;

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const page = sections[section as keyof typeof sections];
  return page ? { title: page.title, description: page.description } : { title: "Workspace" };
}

export default async function WorkspaceSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const page = sections[section as keyof typeof sections];
  if (!page) notFound();
  return <WorkspaceSection active={`/dashboard/${section}`} {...page}>{section === "checkout" && <div className="section-widget"><TareCheckout /></div>}{section === "health" && <HealthInsurancePage />}{section === "claims" && <ClaimsPortal />}{["policies", "traders", "capture"].includes(section) && <WorkspaceTools section={section} />}</WorkspaceSection>;
}