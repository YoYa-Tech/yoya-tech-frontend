"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { ToolIcon } from "@/components/ui/tool-icon";

type Category = "all" | "web" | "mobile" | "ai";

const PROJECTS = [
  {
    id: "meridian",
    title: "Meridian Luxury Timepieces",
    category: "web",
    summary:
      "A bespoke headless eCommerce flagship with interactive 3D watch customization, multi-currency checkout, and sub-second page transitions.",
    cover: "/kuru/showcase/cover-meridian.webp",
    screen: "/kuru/showcase/screen-meridian.webp",
    phone: "/kuru/showcase/phone-meridian.webp",
    tags: ["Next.js", "Tailwind CSS", "Shopify", "Stripe"],
    metrics: "4.8% Conversion · 99 Performance",
  },
  {
    id: "tarn",
    title: "Tarn Cash Runway & Forecasting",
    category: "web",
    summary:
      "A financial intelligence platform calculating real-time burn rates, bank integrations, scenario modeling, and runway predictions.",
    cover: "/kuru/showcase/cover-tarn.webp",
    screen: "/kuru/showcase/screen-tarn.webp",
    phone: "/kuru/showcase/discovery-tarn.webp",
    tags: ["React", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    metrics: "$12M+ Managed Volume",
  },
  {
    id: "healthcore",
    title: "HealthCore Clinical Telemedicine",
    category: "mobile",
    summary:
      "End-to-end patient booking, encrypted video consultations, and digital prescription routing built for clinics across East Africa.",
    cover: "/kuru/showcase/cover-health.webp",
    screen: "/kuru/showcase/screen-health.webp",
    phone: "/kuru/showcase/discovery-health.webp",
    tags: ["Flutter", "FastAPI", "PostgreSQL", "Docker"],
    metrics: "45,000+ Consultations",
  },
  {
    id: "norholm",
    title: "Norholm Design & Architecture",
    category: "web",
    summary:
      "An editorial studio showcase celebrating Nordic architectural works with smooth kinetic scrolling, responsive high-res media, and a custom CMS.",
    cover: "/kuru/showcase/cover-norholm.webp",
    screen: "/kuru/showcase/screen-norholm.webp",
    phone: "/kuru/showcase/dashboard.webp",
    tags: ["Next.js", "WebGL", "Figma", "Vercel"],
    metrics: "Award of Excellence 2026",
  },
  {
    id: "agentflow",
    title: "Autonomous Triage & Agent Hub",
    category: "ai",
    summary:
      "Autonomous AI dispatch cluster processing email inquiries, inventory reconciliation, and instant WhatsApp support routing with Claude 3.5.",
    cover: "/kuru/showcase/cover-flow.webp",
    screen: "/kuru/showcase/cover-agent.webp",
    phone: "/kuru/showcase/cover-analytics.webp",
    tags: ["n8n", "Claude", "WhatsApp", "Python"],
    metrics: "87% Zero-Human Triage",
  },
];

export function OurWorks() {
  const [activeCategory, setActiveCategory] = React.useState<Category>("all");

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="works" className="relative z-10 bg-black py-28 sm:py-36 border-b border-white/5">
      <div className="mx-auto max-w-[1355px] px-6">
        {/* Header with Title and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-14 border-b border-white/10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              // RECENT PRODUCTIONS
            </span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white">
              Selected Works
            </h2>
            <p className="mt-3 text-base text-text-primary max-w-lg">
              A sample of platforms, apps, and autonomous workflows shipped for clients worldwide.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Projects" },
              { id: "web", label: "Web & Commerce" },
              { id: "mobile", label: "Mobile Apps" },
              { id: "ai", label: "Automation & AI" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as Category)}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === tab.id
                    ? "bg-accent text-black font-semibold shadow-md"
                    : "text-text-primary hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Stack */}
        <div className="mt-12 space-y-16">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#121212] transition-all duration-500 hover:border-accent/40 hover:bg-[#151515]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
                {/* Project Info Column */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-accent">0{idx + 1} //</span>
                    <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] text-white/80 uppercase">
                      {project.metrics}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-white group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-base leading-relaxed text-text-primary">
                    {project.summary}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-black/60 border border-white/10 px-3 py-1 text-xs font-mono text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <div className="inline-flex items-center gap-2 font-medium text-accent text-sm group-hover:underline underline-offset-4 cursor-pointer">
                      <span>View Case Study</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </div>

                {/* Visual Showcase: Main Cover + Overlapping Screen */}
                <div className="lg:col-span-7 relative">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/80 shadow-2xl">
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Overlaid UI Screen detail frame */}
                    <div className="absolute right-4 bottom-4 w-2/5 aspect-[16/10] overflow-hidden rounded-xl border border-white/20 bg-black shadow-2xl hidden sm:block">
                      <Image
                        src={project.screen}
                        alt={`${project.title} details`}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
