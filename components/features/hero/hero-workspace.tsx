"use client";

import * as React from "react";
import Image from "next/image";
import { ToolIcon } from "@/components/ui/tool-icon";

type TabId = "website" | "automation" | "agent" | "analytics";

interface TabMeta {
  id: TabId;
  label: string;
  module: string;
  status: string;
  icon: string;
}

const TABS: TabMeta[] = [
  { id: "website", label: "Website", module: "Website", status: "Live", icon: "monitor" },
  { id: "automation", label: "Automation", module: "Lead routing", status: "Running", icon: "workflow" },
  { id: "agent", label: "AI agent", module: "Support agent", status: "Online", icon: "bot" },
  { id: "analytics", label: "Analytics", module: "Growth dashboard", status: "Synced", icon: "chart" },
];

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

const FLOW: [string, string, string | null][] = [
  ["New lead", "Website form", null],
  ["Enrich with Claude", "Company, size and intent", "claude"],
  ["Create deal", "HubSpot", "hubspot"],
  ["Notify the team", "WhatsApp", "whatsapp"],
];

const ORDERS: [string, string, string][] = [
  ["/kuru/showcase/ws-watch-luxury.webp", "Chronoveil GMT", "#4821 · waiting on stock"],
  ["/kuru/showcase/ws-watch-sports.webp", "Vantage Field", "#4817 · waiting on stock"],
  ["/kuru/showcase/ws-watch-smart.webp", "Pulse S2", "#4809 · payment pending"],
];

const ANALYTICS_PRODUCTS: [string, string, string][] = [
  ["/kuru/showcase/ws-watch-luxury.webp", "Chronoveil GMT", "$12,480"],
  ["/kuru/showcase/ws-watch-sports.webp", "Vantage Field", "$9,120"],
  ["/kuru/showcase/ws-watch-smart.webp", "Pulse S2", "$6,940"],
];

export function HeroWorkspace() {
  const [activeTab, setActiveTab] = React.useState<TabId>("website");
  const [siteIndex, setSiteIndex] = React.useState(0);
  const [agentState, setAgentState] = React.useState<"typing" | "done">("done");
  const [flowStep, setFlowStep] = React.useState<number>(4);
  const [flowStateText, setFlowStateText] = React.useState("completed in 2.4 s");

  const tabButtonsRef = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = React.useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  // Update tab indicator underline pill position
  const updateIndicator = React.useCallback((tabId: TabId) => {
    const index = TABS.findIndex((t) => t.id === tabId);
    const btn = tabButtonsRef.current[index];
    if (btn) {
      setIndicatorStyle({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
      });
    }
  }, []);

  React.useEffect(() => {
    updateIndicator(activeTab);
    const onResize = () => updateIndicator(activeTab);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeTab, updateIndicator]);

  // Initial indicator position once fonts load
  React.useEffect(() => {
    const timer = setTimeout(() => {
      updateIndicator("website");
    }, 100);
    return () => clearTimeout(timer);
  }, [updateIndicator]);

  // Auto-cycle website projects when Website tab is active
  React.useEffect(() => {
    if (activeTab !== "website") return;
    const interval = setInterval(() => {
      setSiteIndex((prev) => (prev + 1) % SITES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [activeTab]);

  // Handle flow animation when Automation tab is active
  React.useEffect(() => {
    if (activeTab !== "automation") return;
    setFlowStep(0);
    setFlowStateText("running");

    const t1 = setTimeout(() => setFlowStep(1), 400);
    const t2 = setTimeout(() => setFlowStep(2), 1100);
    const t3 = setTimeout(() => setFlowStep(3), 1800);
    const t4 = setTimeout(() => {
      setFlowStep(4);
      setFlowStateText("completed in 2.4 s");
    }, 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [activeTab]);

  // Handle agent typing when AI Agent tab is active
  React.useEffect(() => {
    if (activeTab !== "agent") return;
    setAgentState("typing");
    const timer = setTimeout(() => {
      setAgentState("done");
    }, 1200);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Auto cycle tabs every 8 seconds if not interacted
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((curr) => {
        const nextIdx = (TABS.findIndex((t) => t.id === curr) + 1) % TABS.length;
        return TABS[nextIdx].id;
      });
    }, 8500);
    return () => clearInterval(timer);
  }, []);

  const currentSite = SITES[siteIndex];

  // Path coordinates for analytics dual curves
  const currentPath = "M0 64.3 L9.09 59.2 L18.18 60.9 L27.27 51.55 L36.36 48.15 L45.45 49.85 L54.55 40.5 L63.64 35.4 L72.73 37.1 L81.82 27.75 L90.91 21.8 L100 14.15";
  const previousPath = "M0 67.7 L9.09 66 L18.18 63.45 L27.27 65.15 L36.36 60.05 L45.45 61.75 L54.55 57.5 L63.64 55.8 L72.73 56.65 L81.82 53.25 L90.91 50.7 L100 49";

  return (
    <div className="kuru-ws" role="region" aria-label="YoYa Tech client workspace">
      {/* 1. TOP BAR: Crumb | Centered Tabs | Status */}
      <div className="kuru-ws-top">
        {/* Left Column: Crumb */}
        <p className="kuru-ws-crumb">
          <span className="kuru-ws-mark" aria-hidden="true" />
          <span>YoYa Tech</span>
          <i>/</i>
          <span>Client workspace</span>
        </p>

        {/* Center Column: EXACTLY CENTERED TABS */}
        <div className="kuru-ws-tabs" role="tablist" aria-label="Workspace views">
          {TABS.map((tab, idx) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabButtonsRef.current[idx] = el;
              }}
              type="button"
              role="tab"
              id={`kuru-ws-tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls="kuru-ws-panel"
              data-tab={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                updateIndicator(tab.id);
              }}
            >
              {tab.label}
            </button>
          ))}
          <span
            className="kuru-ws-tab-indicator"
            style={{
              transform: `translateX(${indicatorStyle.left}px)`,
              width: `${indicatorStyle.width}px`,
            }}
            aria-hidden="true"
          />
        </div>

        {/* Right Column: Live Status */}
        <p className="kuru-ws-status">
          <span className="kuru-ws-dot" />
          <span>All systems live</span>
        </p>
      </div>

      {/* 2. THREE-COLUMN BODY: Nav | Stage | Side Panel */}
      <div className="kuru-ws-body">
        {/* Left Column: Workspace Navigation */}
        <aside className="kuru-ws-nav">
          <p className="kuru-ws-label">Workspace</p>
          <ul>
            {TABS.map((tab) => (
              <li
                key={tab.id}
                data-tab={tab.id}
                data-current={activeTab === tab.id ? "" : undefined}
                onClick={() => {
                  setActiveTab(tab.id);
                  updateIndicator(tab.id);
                }}
                className="cursor-pointer"
              >
                {tab.icon === "monitor" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="14" x="2" y="3" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                )}
                {tab.icon === "workflow" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="8" height="8" x="3" y="3" rx="2" />
                    <path d="M7 11v4a2 2 0 0 0 2 2h4" />
                    <rect width="8" height="8" x="13" y="13" rx="2" />
                  </svg>
                )}
                {tab.icon === "bot" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 8V4H8" />
                    <rect width="16" height="12" x="4" y="8" rx="2" />
                    <path d="M2 14h2M20 14h2M15 13v2M9 13v2" />
                  </svg>
                )}
                {tab.icon === "chart" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                )}
                <span>{tab.module}</span>
                <small>{tab.status}</small>
              </li>
            ))}
          </ul>
        </aside>

        {/* Center Column: Interactive Stage */}
        <div className="kuru-ws-stage" id="kuru-ws-panel" role="tabpanel" aria-labelledby={`kuru-ws-tab-${activeTab}`}>
          {/* PANEL 1: WEBSITE */}
          <section data-panel="website" data-current={activeTab === "website" ? "" : undefined}>
            <div className="kuru-ws-site">
              {/* Browser window mockup */}
              <div className="kuru-ws-browser">
                <div className="kuru-ws-browser-bar">
                  <i />
                  <i />
                  <i />
                  <span>{currentSite.title}</span>
                </div>
                <div className="kuru-ws-screens">
                  {SITES.map((site, idx) => (
                    <Image
                      key={site.name}
                      src={site.desktop}
                      alt={site.name}
                      width={800}
                      height={450}
                      className="kuru-ws-shot"
                      data-current={idx === siteIndex ? "" : undefined}
                      priority={idx === 0}
                    />
                  ))}
                </div>
              </div>

              {/* Overlaid Phone mockup */}
              <div className="kuru-ws-phone">
                <span className="kuru-ws-island" />
                <div className="kuru-ws-screens">
                  {SITES.map((site, idx) => (
                    <Image
                      key={site.name}
                      src={site.phone}
                      alt={`${site.name} phone`}
                      width={393}
                      height={852}
                      className="kuru-ws-shot"
                      data-current={idx === siteIndex ? "" : undefined}
                      priority={idx === 0}
                    />
                  ))}
                </div>
              </div>

              {/* Site Caption with Pager */}
              <p className="kuru-ws-caption">
                <span className="kuru-ws-dot" />
                <span>
                  {currentSite.name} · {currentSite.kind} · web and mobile
                </span>
                <span className="kuru-ws-pager" aria-hidden="true">
                  {SITES.map((_, idx) => (
                    <i key={idx} data-current={idx === siteIndex ? "" : undefined} />
                  ))}
                </span>
              </p>
            </div>
          </section>

          {/* PANEL 2: AUTOMATION */}
          <section data-panel="automation" data-current={activeTab === "automation" ? "" : undefined}>
            <div className="kuru-ws-flow">
              <ol>
                {FLOW.map(([title, detail, slug], idx) => {
                  const isActive = flowStep === idx;
                  const isDone = flowStep > idx;
                  return (
                    <li
                      key={title}
                      className={`kuru-ws-node ${isActive ? "is-active" : ""} ${isDone ? "is-done" : ""}`}
                      style={{ "--n": idx } as React.CSSProperties}
                    >
                      <span className="kuru-ws-node-icon">
                        {slug ? (
                          <ToolIcon slug={slug} size={18} />
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="M2 9h20M6 4v5M10 4v5" />
                          </svg>
                        )}
                      </span>
                      <span>
                        <b>{title}</b>
                        <small>{detail}</small>
                      </span>
                      <span className="kuru-ws-node-check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    </li>
                  );
                })}
              </ol>
              <p className="kuru-ws-caption">
                <span className="kuru-ws-dot" />
                <span>Run #1,284 · {flowStateText}</span>
              </p>
            </div>
          </section>

          {/* PANEL 3: AI AGENT */}
          <section data-panel="agent" data-current={activeTab === "agent" ? "" : undefined}>
            <div className="kuru-ws-chat" data-state={agentState}>
              <p className="kuru-ws-msg is-user">Which orders are delayed this week?</p>
              <p className="kuru-ws-msg is-agent">
                <span className="kuru-ws-typing">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="kuru-ws-reply">
                  Three orders are delayed: two are waiting on stock and one on payment. I’ve drafted follow-ups for all three.
                </span>
              </p>
              <ul className="kuru-ws-orders">
                {ORDERS.map(([src, name, status]) => (
                  <li key={name}>
                    <Image src={src} alt={name} width={40} height={40} className="rounded-lg object-cover" />
                    <span>
                      <b>{name}</b>
                      <small>{status}</small>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="kuru-ws-actions">
                <span>Send follow-ups</span>
                <span>Open in CRM</span>
              </div>
            </div>
          </section>

          {/* PANEL 4: ANALYTICS */}
          <section data-panel="analytics" data-current={activeTab === "analytics" ? "" : undefined}>
            <div className="kuru-ws-analytics">
              {/* KPIs Header */}
              <div className="kuru-ws-kpis">
                <p>
                  <small>Leads</small>
                  <b>1,284</b>
                  <em>+18% vs last month</em>
                </p>
                <p>
                  <small>Automated runs</small>
                  <b>9,412</b>
                  <em>+31% vs last month</em>
                </p>
                <p>
                  <small>Hours saved</small>
                  <b>312</b>
                  <em>+46 vs last month</em>
                </p>
              </div>

              {/* Chart SVG */}
              <svg className="kuru-ws-chart" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path className="kuru-ws-grid" d="M0 25H100M0 50H100M0 75H100" />
                <path className="kuru-ws-line is-previous" d={previousPath} />
                <path className="kuru-ws-line" d={currentPath} pathLength="1" />
              </svg>

              {/* Top Products */}
              <ul className="kuru-ws-products">
                {ANALYTICS_PRODUCTS.map(([src, name, rev]) => (
                  <li key={name}>
                    <Image src={src} alt={name} width={36} height={36} className="rounded-lg object-cover" />
                    <span>
                      <b>{name}</b>
                      <small>{rev} this month</small>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Right Column: Context / Telemetry Panel */}
        <aside className="kuru-ws-side" aria-live="polite">
          {activeTab === "website" && (
            <>
              <p className="kuru-ws-label">Lighthouse</p>
              <ul className="kuru-ws-stats">
                <li>
                  <span>Performance</span>
                  <span className="kuru-ws-meter">
                    <span style={{ "--value": 0.98 } as React.CSSProperties} />
                  </span>
                  <b>98</b>
                </li>
                <li>
                  <span>Accessibility</span>
                  <span className="kuru-ws-meter">
                    <span style={{ "--value": 0.96 } as React.CSSProperties} />
                  </span>
                  <b>96</b>
                </li>
                <li>
                  <span>Best practices</span>
                  <span className="kuru-ws-meter">
                    <span style={{ "--value": 1.0 } as React.CSSProperties} />
                  </span>
                  <b>100</b>
                </li>
                <li>
                  <span>SEO</span>
                  <span className="kuru-ws-meter">
                    <span style={{ "--value": 1.0 } as React.CSSProperties} />
                  </span>
                  <b>100</b>
                </li>
              </ul>
            </>
          )}

          {activeTab === "automation" && (
            <>
              <p className="kuru-ws-label">This flow</p>
              <ul className="kuru-ws-stats">
                <li>
                  <span>Runs today</span>
                  <b>1,284</b>
                </li>
                <li>
                  <span>Success rate</span>
                  <b>99.7%</b>
                </li>
                <li>
                  <span>Average run</span>
                  <b>2.4 s</b>
                </li>
                <li>
                  <span>Hours saved this month</span>
                  <b>312</b>
                </li>
              </ul>
            </>
          )}

          {activeTab === "agent" && (
            <>
              <p className="kuru-ws-label">This agent</p>
              <ul className="kuru-ws-stats">
                <li>
                  <span>Answered today</span>
                  <b>418</b>
                </li>
                <li>
                  <span>Resolved without a person</span>
                  <b>87%</b>
                </li>
                <li>
                  <span>Average reply</span>
                  <b>1.8 s</b>
                </li>
                <li>
                  <span>Knowledge sources</span>
                  <b>1,940</b>
                </li>
              </ul>
            </>
          )}

          {activeTab === "analytics" && (
            <>
              <p className="kuru-ws-label">Connected sources</p>
              <ul className="kuru-ws-sources">
                <li>
                  <ToolIcon slug="shopify" size={16} />
                  <span>Shopify</span>
                  <span className="kuru-ws-dot" />
                </li>
                <li>
                  <ToolIcon slug="hubspot" size={16} />
                  <span>HubSpot</span>
                  <span className="kuru-ws-dot" />
                </li>
                <li>
                  <ToolIcon slug="stripe" size={16} />
                  <span>Stripe</span>
                  <span className="kuru-ws-dot" />
                </li>
                <li>
                  <ToolIcon slug="googleanalytics" size={16} />
                  <span>Google Analytics</span>
                  <span className="kuru-ws-dot" />
                </li>
              </ul>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
