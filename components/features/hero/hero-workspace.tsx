"use client";

import * as React from "react";
import Image from "next/image";
import { ToolIcon } from "@/components/ui/tool-icon";
import { Check, ArrowRight, Play, Sparkles } from "lucide-react";

type TabId = "website" | "automation" | "agent" | "analytics";

const SITES = [
  {
    name: "Meridian",
    kind: "Online store",
    title: "Meridian · The 2026 collection",
    desktop: "/kuru/showcase/ws-meridian.webp",
    phone: "/kuru/showcase/screen-meridian.webp",
  },
  {
    name: "Tarn",
    kind: "Cash forecasting app",
    title: "Tarn · Know how long your cash will last",
    desktop: "/kuru/showcase/ws-tarn.webp",
    phone: "/kuru/showcase/screen-tarn.webp",
  },
  {
    name: "HealthCore",
    kind: "Booking platform",
    title: "HealthCore · Book a visit",
    desktop: "/kuru/showcase/ws-health.webp",
    phone: "/kuru/showcase/screen-health.webp",
  },
];

const FLOW = [
  { title: "New lead", subtitle: "Website form", slug: null },
  { title: "Enrich with Claude", subtitle: "Company, size & intent", slug: "claude" },
  { title: "Create deal", subtitle: "HubSpot CRM", slug: "hubspot" },
  { title: "Notify team", subtitle: "WhatsApp dispatch", slug: "whatsapp" },
];

const ORDERS = [
  {
    img: "/kuru/showcase/ws-watch-luxury.webp",
    name: "Chronoveil GMT",
    meta: "#4821 · waiting on stock",
    tag: "Awaiting Stock",
  },
  {
    img: "/kuru/showcase/ws-watch-sports.webp",
    name: "Vantage Field",
    meta: "#4817 · waiting on stock",
    tag: "Awaiting Stock",
  },
  {
    img: "/kuru/showcase/ws-watch-smart.webp",
    name: "Pulse S2",
    meta: "#4809 · payment pending",
    tag: "Pending Auth",
  },
];

export function HeroWorkspace() {
  const [activeTab, setActiveTab] = React.useState<TabId>("website");
  const [siteIndex, setSiteIndex] = React.useState(0);

  // Auto-cycle website showcase
  React.useEffect(() => {
    if (activeTab !== "website") return;
    const interval = setInterval(() => {
      setSiteIndex((prev) => (prev + 1) % SITES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [activeTab]);

  const currentSite = SITES[siteIndex];

  return (
    <div className="relative mx-auto mt-12 w-full max-w-[1180px] overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f]/90 backdrop-blur-xl shadow-2xl">
      {/* Workspace Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setActiveTab("website")}
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all ${
              activeTab === "website"
                ? "bg-accent text-black font-semibold shadow-sm"
                : "text-text-primary hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Website
          </button>

          <button
            onClick={() => setActiveTab("automation")}
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all ${
              activeTab === "automation"
                ? "bg-accent text-black font-semibold shadow-sm"
                : "text-text-primary hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Automation
          </button>

          <button
            onClick={() => setActiveTab("agent")}
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all ${
              activeTab === "agent"
                ? "bg-accent text-black font-semibold shadow-sm"
                : "text-text-primary hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            AI Agent
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all ${
              activeTab === "analytics"
                ? "bg-accent text-black font-semibold shadow-sm"
                : "text-text-primary hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
            Analytics
          </button>
        </div>

        {/* Live Status indicator */}
        <div className="hidden sm:flex items-center gap-3 text-xs text-text-muted">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-accent animate-ping" />
            <span className="font-mono text-white/90">LIVE WORKSPACE</span>
          </span>
          <span className="text-white/20">|</span>
          <span className="font-mono text-[11px] text-white/60">AD-ET-01 CLUSTER</span>
        </div>
      </div>

      {/* Main Workspace Stage */}
      <div className="relative min-h-[460px] p-4 sm:p-6 lg:p-8">
        {/* TAB 1: WEBSITE STAGE */}
        {activeTab === "website" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
            {/* Desktop and Mobile Mockup frame */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative rounded-xl border border-white/10 bg-black/60 overflow-hidden shadow-2xl">
                {/* Browser bar */}
                <div className="flex items-center justify-between border-b border-white/10 bg-[#161616] px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="rounded-full bg-black/50 px-4 py-1 text-[11px] font-mono text-white/70">
                    {currentSite.title}
                  </div>
                  <div className="w-10" />
                </div>

                {/* Browser Screen */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <Image
                    src={currentSite.desktop}
                    alt={currentSite.name}
                    fill
                    className="object-cover object-top transition-opacity duration-700"
                    priority
                  />

                  {/* Overlaid Floating Mobile Mockup */}
                  <div className="absolute right-3 bottom-3 w-[120px] sm:w-[150px] aspect-[9/19] rounded-2xl border-2 border-white/20 bg-black shadow-2xl overflow-hidden hidden sm:block">
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 h-1 w-8 rounded-full bg-white/30 z-10" />
                    <Image
                      src={currentSite.phone}
                      alt={`${currentSite.name} mobile`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Site selector tabs */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  {SITES.map((site, idx) => (
                    <button
                      key={site.name}
                      onClick={() => setSiteIndex(idx)}
                      className={`text-xs px-2.5 py-1 rounded-full transition-all ${
                        siteIndex === idx
                          ? "bg-white/15 text-white font-medium"
                          : "text-text-muted hover:text-white"
                      }`}
                    >
                      {site.name}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-text-muted">
                  {currentSite.name} · {currentSite.kind} · Web & Mobile
                </div>
              </div>
            </div>

            {/* Right: Lighthouse Performance & Telemetry */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-xl border border-white/10 bg-[#161616]/70 p-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Lighthouse Audit
                  </span>
                  <span className="rounded bg-accent/20 px-2 py-0.5 text-[11px] font-mono text-accent">
                    OPTIMIZED
                  </span>
                </div>

                <div className="mt-4 space-y-3.5">
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-medium">
                      <span>Performance</span>
                      <span className="text-accent font-mono">98 / 100</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: "98%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-medium">
                      <span>Accessibility</span>
                      <span className="text-accent font-mono">96 / 100</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: "96%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-medium">
                      <span>Best Practices</span>
                      <span className="text-accent font-mono">100 / 100</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-medium">
                      <span>SEO & Structured Data</span>
                      <span className="text-accent font-mono">100 / 100</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#161616]/70 p-4 text-xs space-y-2">
                <div className="flex items-center justify-between text-text-muted">
                  <span>Stack</span>
                  <span className="text-white font-mono">Next.js 16 + Tailwind</span>
                </div>
                <div className="flex items-center justify-between text-text-muted">
                  <span>Edge Delivery</span>
                  <span className="text-white font-mono">Vercel Global CDN</span>
                </div>
                <div className="flex items-center justify-between text-text-muted">
                  <span>TTFB</span>
                  <span className="text-accent font-mono">24ms (Instant)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AUTOMATION FLOW STAGE */}
        {activeTab === "automation" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
            {/* Flow Graph */}
            <div className="lg:col-span-8 space-y-3">
              <div className="text-xs font-mono text-text-muted uppercase">
                Active Pipeline: Inbound Lead Intelligence & Auto-Dispatch
              </div>

              <div className="space-y-3">
                {FLOW.map((step, idx) => (
                  <div
                    key={step.title}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#161616]/80 p-3.5 transition-all hover:border-accent/40"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black/60 border border-white/10">
                      {step.slug ? (
                        <ToolIcon slug={step.slug} size={22} className="text-accent" />
                      ) : (
                        <Sparkles className="h-5 w-5 text-accent" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white text-sm">{step.title}</span>
                        <span className="rounded bg-white/10 px-1.5 py-0.2 text-[10px] font-mono text-accent">
                          STEP 0{idx + 1}
                        </span>
                      </div>
                      <div className="text-xs text-text-muted">{step.subtitle}</div>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>PASSED</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Automation Metrics */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-xl border border-white/10 bg-[#161616]/70 p-5 space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Pipeline Telemetry
                </span>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-black/40 p-3 border border-white/5">
                    <div className="text-xl font-bold font-mono text-white">1,284</div>
                    <div className="text-[11px] text-text-muted">Runs today</div>
                  </div>
                  <div className="rounded-lg bg-black/40 p-3 border border-white/5">
                    <div className="text-xl font-bold font-mono text-accent">99.7%</div>
                    <div className="text-[11px] text-text-muted">Success rate</div>
                  </div>
                  <div className="rounded-lg bg-black/40 p-3 border border-white/5">
                    <div className="text-xl font-bold font-mono text-white">2.4 s</div>
                    <div className="text-[11px] text-text-muted">Average duration</div>
                  </div>
                  <div className="rounded-lg bg-black/40 p-3 border border-white/5">
                    <div className="text-xl font-bold font-mono text-emerald-400">312 hrs</div>
                    <div className="text-[11px] text-text-muted">Saved this month</div>
                  </div>
                </div>

                <div className="rounded-lg bg-accent/10 border border-accent/20 p-3 text-xs text-accent">
                  ✓ Autonomous trigger verified via Webhook + n8n + Make orchestration
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AI AGENT STAGE */}
        {activeTab === "agent" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
            {/* Dialogue & Delayed Orders List */}
            <div className="lg:col-span-8 space-y-4">
              {/* Agent Bubble */}
              <div className="rounded-xl border border-accent/30 bg-accent/5 p-4 text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="font-mono text-xs text-accent uppercase font-semibold">
                    Support Agent · Auto-Drafted Follow-up
                  </span>
                </div>
                <p className="text-white/95 leading-relaxed">
                  "Three orders are delayed: two are waiting on stock and one on payment. I've drafted personalized follow-ups for all three customers with updated ETA timelines."
                </p>
              </div>

              {/* Order Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ORDERS.map((order) => (
                  <div
                    key={order.name}
                    className="rounded-xl border border-white/10 bg-[#161616]/90 p-3 flex flex-col items-center text-center space-y-2"
                  >
                    <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-black/50">
                      <Image
                        src={order.img}
                        alt={order.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-white text-xs">{order.name}</div>
                      <div className="text-[10px] text-text-muted font-mono">{order.meta}</div>
                    </div>
                    <span className="text-[10px] rounded-full bg-white/10 px-2 py-0.5 text-accent font-mono">
                      {order.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent Telemetry */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-xl border border-white/10 bg-[#161616]/70 p-5 space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Agent Telemetry
                </span>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-black/40 p-3 border border-white/5">
                    <div className="text-xl font-bold font-mono text-white">418</div>
                    <div className="text-[11px] text-text-muted">Answered today</div>
                  </div>
                  <div className="rounded-lg bg-black/40 p-3 border border-white/5">
                    <div className="text-xl font-bold font-mono text-accent">87%</div>
                    <div className="text-[11px] text-text-muted">Zero-human resolution</div>
                  </div>
                  <div className="rounded-lg bg-black/40 p-3 border border-white/5">
                    <div className="text-xl font-bold font-mono text-white">1.8 s</div>
                    <div className="text-[11px] text-text-muted">Avg response time</div>
                  </div>
                  <div className="rounded-lg bg-black/40 p-3 border border-white/5">
                    <div className="text-xl font-bold font-mono text-purple-400">1,940</div>
                    <div className="text-[11px] text-text-muted">Knowledge sources</div>
                  </div>
                </div>

                <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-3 text-xs text-purple-300">
                  ⚡ Claude 3.5 Sonnet + RAG over client inventory DB & CRM
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ANALYTICS STAGE */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="rounded-xl border border-white/10 bg-[#161616]/80 p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs text-text-muted font-mono uppercase">
                      Revenue & Conversions
                    </div>
                    <div className="text-2xl font-bold font-mono text-white">$148,920</div>
                  </div>
                  <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-mono text-accent">
                    +42.6% MoM
                  </span>
                </div>

                {/* Simulated Chart Bars */}
                <div className="flex items-end gap-2 h-44 pt-6 pb-2 px-2 border-b border-white/10">
                  {[35, 45, 30, 60, 55, 75, 65, 80, 70, 90, 85, 100].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t transition-all duration-500 hover:brightness-125"
                        style={{
                          height: `${h}%`,
                          backgroundColor: i === 11 ? "#6fff54" : "rgba(255, 255, 255, 0.15)",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[11px] font-mono text-text-muted">
                  <span>Jan</span>
                  <span>Apr</span>
                  <span>Jul</span>
                  <span>Oct</span>
                  <span>Today</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-xl border border-white/10 bg-[#161616]/70 p-5 space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Real-Time Insights
                </span>
                <div className="rounded-lg bg-black/40 p-3 border border-white/5 flex justify-between items-center">
                  <span className="text-xs text-text-muted">Bounce Rate</span>
                  <span className="text-sm font-mono text-white">21.4%</span>
                </div>
                <div className="rounded-lg bg-black/40 p-3 border border-white/5 flex justify-between items-center">
                  <span className="text-xs text-text-muted">Avg Session</span>
                  <span className="text-sm font-mono text-white">3m 48s</span>
                </div>
                <div className="rounded-lg bg-black/40 p-3 border border-white/5 flex justify-between items-center">
                  <span className="text-xs text-text-muted">Checkout Rate</span>
                  <span className="text-sm font-mono text-accent">4.8% (+1.9%)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

