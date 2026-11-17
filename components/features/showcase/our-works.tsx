"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ToolIcon } from "@/components/ui/tool-icon";

type Category = "all" | "web" | "mobile" | "ai";

interface Project {
  id: string;
  title: string;
  category: "web" | "mobile" | "ai";
  categoryLabel: string;
  url: string;
  summary: string;
  desktop: string;
  phone: string;
  tools: { name: string; slug: string }[];
  metrics: string;
}

const PROJECTS: Project[] = [
  {
    id: "meridian",
    title: "Meridian Luxury Timepieces",
    category: "web",
    categoryLabel: "Web & eCommerce",
    url: "meridian.collection",
    summary:
      "A bespoke headless eCommerce flagship with interactive watch customization, multi-currency checkout, and sub-second page transitions.",
    desktop: "/kuru/showcase/ws-meridian.webp",
    phone: "/kuru/showcase/screen-meridian.webp",
    tools: [
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Shopify", slug: "shopify" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "Stripe", slug: "stripe" },
    ],
    metrics: "+340% Mobile Revenue · 99 Lighthouse",
  },
  {
    id: "tarn",
    title: "Tarn Cash Runway & Forecasting",
    category: "web",
    categoryLabel: "Financial Platform",
    url: "tarn.finance",
    summary:
      "Financial intelligence platform calculating real-time burn rates, bank sync integrations, scenario modeling, and runway predictions.",
    desktop: "/kuru/showcase/ws-tarn.webp",
    phone: "/kuru/showcase/screen-tarn.webp",
    tools: [
      { name: "React", slug: "react" },
      { name: "TypeScript", slug: "typescript" },
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Node.js", slug: "nodedotjs" },
    ],
    metrics: "$12M+ Volume Managed · 4.9★ CSAT",
  },
  {
    id: "healthcore",
    title: "HealthCore Clinical Telemedicine",
    category: "mobile",
    categoryLabel: "Mobile & Healthcare",
    url: "healthcore.app",
    summary:
      "End-to-end patient booking, encrypted video consultations, and digital prescription routing built for multi-clinic practices.",
    desktop: "/kuru/showcase/ws-health.webp",
    phone: "/kuru/showcase/screen-health.webp",
    tools: [
      { name: "Flutter", slug: "flutter" },
      { name: "FastAPI", slug: "fastapi" },
      { name: "Docker", slug: "docker" },
      { name: "PostgreSQL", slug: "postgresql" },
    ],
    metrics: "45,000+ Consultations · 99.98% Uptime",
  },
  {
    id: "norholm",
    title: "Norholm Architecture & Editorial CMS",
    category: "web",
    categoryLabel: "Editorial & Architecture",
    url: "norholm.studio",
    summary:
      "An editorial studio showcase celebrating Nordic architectural works with kinetic scrolling, high-res galleries, and custom CMS collections.",
    desktop: "/kuru/showcase/cover-norholm.webp",
    phone: "/kuru/showcase/screen-norholm.webp",
    tools: [
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Webflow", slug: "webflow" },
      { name: "Vercel", slug: "vercel" },
      { name: "Figma", slug: "figma" },
    ],
    metrics: "Design Excellence 2026 · 0.2s LCP",
  },
  {
    id: "agentflow",
    title: "Autonomous Triage & Operations Cluster",
    category: "ai",
    categoryLabel: "Automation & AI",
    url: "agentflow.dispatch",
    summary:
      "Autonomous AI dispatch cluster processing inbound client requests, inventory triage, and instant multi-channel WhatsApp notifications with Claude.",
    desktop: "/kuru/showcase/cover-flow.webp",
    phone: "/kuru/showcase/cover-agent.webp",
    tools: [
      { name: "n8n", slug: "n8n" },
      { name: "Claude", slug: "claude" },
      { name: "WhatsApp", slug: "whatsapp" },
      { name: "Python", slug: "python" },
    ],
    metrics: "87% Zero-Human Triage · 312h Saved/Mo",
  },
  {
    id: "apexanalytics",
    title: "Apex Real-Time BI & Telemetry Engine",
    category: "ai",
    categoryLabel: "Analytics & Telemetry",
    url: "apex.telemetry.io",
    summary:
      "High-throughput enterprise telemetry pipeline ingesting edge signals with instant anomalies detection and predictive load forecast dashboards.",
    desktop: "/kuru/showcase/cover-analytics.webp",
    phone: "/kuru/showcase/cover-apps.webp",
    tools: [
      { name: "TypeScript", slug: "typescript" },
      { name: "Python", slug: "python" },
      { name: "Docker", slug: "docker" },
      { name: "PostgreSQL", slug: "postgresql" },
    ],
    metrics: "1.2M Events/Sec · Sub-10ms Queries",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");
const clamp = (val: number) => Math.max(0, Math.min(1, val));

export function OurWorks() {
  const [activeCategory, setActiveCategory] = React.useState<Category>("all");
  const [isSwitching, setIsSwitching] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);

  const filteredProjects = React.useMemo(() => {
    return activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (cat: Category) => {
    if (cat === activeCategory) return;

    // Smoothly re-anchor if user has scrolled down into the stack
    const section = sectionRef.current;
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top < -20) {
        window.scrollTo({
          top: window.scrollY + rect.top - 80,
          behavior: "smooth",
        });
      }
    }

    setIsSwitching(true);

    setTimeout(() => {
      setActiveCategory(cat);
      requestAnimationFrame(() => {
        setTimeout(() => {
          setIsSwitching(false);
        }, 40);
      });
    }, 180);
  };

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    const stackTop = 96;
    const offset = 18;

    function renderStack() {
      frame = 0;
      if (window.innerWidth < 768 || !section) return;

      const rect = section.getBoundingClientRect();
      // If completely outside viewport, skip heavy calculations
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;

      const validCards = cardRefs.current.slice(0, filteredProjects.length);
      const arrived = validCards.map((card, index) => {
        if (!card || !index) return 0;
        const distance = card.getBoundingClientRect().top - (stackTop + index * offset);
        return clamp(1 - distance / (window.innerHeight * 0.7));
      });

      validCards.forEach((card, index) => {
        if (!card) return;
        const depth = arrived.slice(index + 1).reduce((sum, value) => sum + value, 0);
        card.style.setProperty("--depth", depth.toFixed(3));
      });
    }

    function schedule() {
      if (!frame) {
        frame = requestAnimationFrame(renderStack);
      }
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [filteredProjects]);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative z-10 bg-black py-28 sm:py-36 border-b border-white/10"
      aria-labelledby="works-heading"
    >
      <div className="kuru-wrap">
        {/* Header with Title and Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/10">
          <div>
            <h2 id="works-heading" className="kuru-h2">
              Our <span className="kuru-accent kuru-ink">Works</span>
            </h2>
            <p className="kuru-lead">
              A sample of platforms, apps, and autonomous workflows shipped for clients worldwide.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="relative flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-md">
            {[
              { id: "all", label: "All Projects" },
              { id: "web", label: "Web & Commerce" },
              { id: "mobile", label: "Mobile Apps" },
              { id: "ai", label: "Automation & AI" },
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleCategoryChange(tab.id as Category)}
                  className={`relative z-10 rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 select-none ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-text-muted hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-lg bg-white/15 border border-white/12 shadow-[0_2px_10px_rgba(0,0,0,0.5)] -z-10 transition-all duration-300"
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Sticky Stacking Deck with smooth fluid transition */}
        <div
          className={`kuru-works-stack mt-14 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isSwitching
              ? "opacity-0 translate-y-3 scale-[0.99] pointer-events-none"
              : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              style={{ "--i": idx } as React.CSSProperties}
              className="kuru-work-card group"
            >
              <div className="kuru-work-card-inner">
                {/* Large Background Watermark Numeral */}
                <span className="kuru-work-numeral" aria-hidden="true">
                  {pad(idx + 1)}
                </span>

                {/* Card Main Content */}
                <div className="kuru-work-content grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-12">
                  {/* Left Column: Project Overview */}
                  <div className="lg:col-span-5 space-y-6">
                    {/* Index + Category + Metric Badge */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs font-semibold text-accent">
                        {pad(idx + 1)} / {pad(filteredProjects.length)}
                      </span>
                      <span className="text-white/20">·</span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                        {project.categoryLabel}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-white group-hover:text-accent transition-colors leading-[1.12]">
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-base leading-relaxed text-text-muted max-w-lg">
                      {project.summary}
                    </p>

                    {/* Performance / Metric pill */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1 text-xs font-mono text-accent font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                      <span>{project.metrics}</span>
                    </div>

                    {/* Tool Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      {project.tools.map((tool) => (
                        <span
                          key={tool.name}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80"
                        >
                          <ToolIcon slug={tool.slug} size={14} className="text-text-muted" />
                          <span>{tool.name}</span>
                        </span>
                      ))}
                    </div>

                    {/* CTA link */}
                    <div className="pt-2">
                      <Link
                        href="#pricing"
                        className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-accent transition-colors"
                      >
                        <span>Explore Project Scope</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: High-Fidelity Browser & Mobile Mockup */}
                  <div className="lg:col-span-7 relative">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#161618] shadow-2xl">
                      {/* Browser Bar */}
                      <div className="flex items-center gap-2 border-b border-white/10 bg-[#1b1b1e] px-3 sm:px-4 py-2 sm:py-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full bg-[#ff5f57]" />
                          <span className="h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full bg-[#febc2e]" />
                          <span className="h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full bg-[#28c840]" />
                        </div>
                        <span className="ml-2 rounded-md bg-black/40 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-mono text-white/60 truncate max-w-[200px]">
                          {project.url}
                        </span>
                      </div>

                      {/* Desktop Screenshot */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                        <Image
                          src={project.desktop}
                          alt={project.title}
                          fill
                          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          sizes="(max-width: 1024px) 100vw, 700px"
                        />
                      </div>

                      {/* Overlaid Floating Mobile Mockup Frame */}
                      <div className="absolute right-3 sm:right-5 bottom-3 sm:bottom-4 w-[24%] sm:w-[26%] aspect-[9/19] rounded-xl sm:rounded-2xl border-2 border-white/20 bg-black shadow-2xl overflow-hidden hidden sm:block">
                        {/* Dynamic Island */}
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 h-1 w-6 rounded-full bg-white/40 z-10" />
                        <Image
                          src={project.phone}
                          alt={`${project.title} mobile view`}
                          fill
                          className="object-cover object-top"
                          sizes="200px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
