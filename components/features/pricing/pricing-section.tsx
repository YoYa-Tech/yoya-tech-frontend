"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles } from "lucide-react";

const DIVISIONS = [
  {
    id: "web",
    name: "Web & digital presence",
    short: "Web & Commerce",
    summary:
      "Websites and online stores that carry your brand, load fast and turn visitors into customers.",
    note: "Starting points in US dollars · Transparent flat scoping",
    tiers: [
      {
        name: "Business website",
        price: "$800",
        period: "",
        desc: "Three core pages designed from the ground up, on a CMS you run yourself.",
        highlights: ["Custom typography & layout", "CMS setup with visual editor", "Mobile & SEO optimized"],
      },
      {
        name: "eCommerce store",
        price: "$1,500",
        period: "",
        desc: "Catalogue, cart and checkout, with a dashboard you can actually run.",
        highlights: ["Stripe / payment gateway setup", "Inventory management dashboard", "Order tracking & emails"],
      },
      {
        name: "Custom build",
        price: "$3,000",
        period: "",
        desc: "Multi-collection CMS, advanced motion and larger sites, scoped together first.",
        highlights: ["Bespoke animations & 3D WebGL", "Multi-lingual & localization", "Performance SLA guarantee"],
      },
    ],
  },
  {
    id: "product",
    name: "Product engineering",
    short: "Product Engineering",
    summary:
      "Customer-facing platforms, web and mobile apps, and the infrastructure underneath them, built to scale.",
    note: "Starting points in US dollars, confirmed after discovery call",
    tiers: [
      {
        name: "MVP launch",
        price: "$2,500",
        period: "",
        desc: "A focused first version: core flows, accounts and an admin, ready for real users.",
        highlights: ["User authentication & roles", "Database architecture & API", "Production cloud deployment"],
      },
      {
        name: "Mobile app",
        price: "$4,000",
        period: "",
        desc: "iOS and Android from one codebase, connected to your backend and payments.",
        highlights: ["Flutter / React Native cross-platform", "Push notifications & maps", "App Store & Google Play setup"],
      },
      {
        name: "Web platform",
        price: "$6,000",
        period: "",
        desc: "Portals, dashboards and SaaS products with roles, billing and integrations.",
        highlights: ["Multi-tenant architecture", "Subscription billing (Stripe)", "Comprehensive admin console"],
      },
    ],
  },
  {
    id: "ai",
    name: "Automation & AI",
    short: "Automation & AI",
    summary:
      "Repetitive work handed to automations and AI, so your team spends its time on what matters.",
    note: "Starting points in US dollars, per workflow or assistant",
    tiers: [
      {
        name: "Workflow automation",
        price: "$400",
        period: "",
        desc: "Connect your tools with n8n, Make or Zapier and take one process off your team’s plate.",
        highlights: ["Process audit & mapping", "Error alerts to Slack/WhatsApp", "Data sync between CRM & ERP"],
      },
      {
        name: "AI assistant",
        price: "$1,200",
        period: "",
        desc: "A chat assistant that answers from your own documents, on your site or WhatsApp.",
        highlights: ["RAG vector knowledge retrieval", "Site widget & WhatsApp integration", "Hallucination safeguards"],
      },
      {
        name: "AI agents & custom ML",
        price: "$3,000",
        period: "",
        desc: "Agents that act across your systems, and models trained on your own business data.",
        highlights: ["Multi-agent tool invocation", "Automated email & order triage", "Custom fine-tuned pipelines"],
      },
    ],
  },
  {
    id: "support",
    name: "Partnership & support",
    short: "Ongoing Support",
    summary:
      "A long-term technical partner for upkeep, steady improvement and new ideas after launch.",
    note: "Monthly retainers in US dollars · Cancel anytime",
    tiers: [
      {
        name: "Care plan",
        price: "$150",
        period: "/mo",
        desc: "Updates, backups, monitoring and small fixes for one site or app.",
        highlights: ["Weekly security patches", "Automated daily backups", "Uptime & performance monitoring"],
      },
      {
        name: "Growth plan",
        price: "$500",
        period: "/mo",
        desc: "Monthly hours for improvements, content, analytics and new automations.",
        highlights: ["15 dedicated hours / month", "Feature backlog delivery", "Conversion rate optimization"],
      },
      {
        name: "Dedicated capacity",
        price: "$1,500",
        period: "/mo",
        desc: "A part-time designer and engineer working inside your product roadmap.",
        highlights: ["45 hours dedicated sprint time", "Direct Slack / WhatsApp channel", "Sprint planning & architecture review"],
      },
    ],
  },
];

export function PricingSection() {
  const [activeDivision, setActiveDivision] = React.useState("web");

  const current = DIVISIONS.find((d) => d.id === activeDivision) || DIVISIONS[0];

  return (
    <section id="pricing" className="relative z-10 bg-black py-28 sm:py-36 border-b border-white/5">
      <div className="mx-auto max-w-[1316px] px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              // TRANSPARENT INVESTMENT
            </span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white">
              Pricing
            </h2>
            <p className="mt-3 text-base text-text-primary max-w-lg">
              Straightforward starting points with zero hidden fees. Scope and deliverables confirmed before any code is written.
            </p>
          </div>

          {/* Division switcher pills */}
          <div className="flex flex-wrap items-center gap-2">
            {DIVISIONS.map((div) => (
              <button
                key={div.id}
                onClick={() => setActiveDivision(div.id)}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                  activeDivision === div.id
                    ? "bg-accent text-black font-semibold shadow-md"
                    : "text-text-primary hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {div.short}
              </button>
            ))}
          </div>
        </div>

        {/* Division Summary */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-medium text-white">
              {current.name}
            </h3>
            <p className="text-sm text-text-primary mt-1 max-w-xl">
              {current.summary}
            </p>
          </div>
          <span className="rounded-full bg-white/5 border border-white/10 px-3.5 py-1 text-xs font-mono text-text-muted">
            {current.note}
          </span>
        </div>

        {/* Tiers List using .kuru-tier styling */}
        <div className="kuru-tiers mt-10">
          {current.tiers.map((tier) => (
            <div
              key={tier.name}
              className="kuru-tier group"
            >
              <div className="kuru-tier-name font-display text-lg text-white group-hover:text-accent transition-colors">
                {tier.name}
              </div>

              <div className="kuru-tier-text">
                <p>{tier.desc}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted">
                  {tier.highlights.map((h) => (
                    <span key={h} className="inline-flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-accent" />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="kuru-tier-price text-accent font-display">
                <span>{tier.price}</span>
                {tier.period && <small className="text-white/60">{tier.period}</small>}
              </div>
            </div>
          ))}
        </div>

        {/* Custom enterprise or tailored package banner */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between rounded-2xl border border-white/10 bg-[#121212] p-6 sm:p-8 gap-6">
          <div>
            <h4 className="font-display text-lg font-medium text-white">
              Have specific constraints or custom multi-system requirements?
            </h4>
            <p className="text-xs sm:text-sm text-text-muted mt-1">
              We scope multi-stage enterprise architectures, legacy migrations, and custom AI deployments.
            </p>
          </div>
          <Button asChild className="rounded-full px-6 font-semibold shrink-0">
            <Link href="mailto:contact@kurulabs.com">
              Request Discovery Scope
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
