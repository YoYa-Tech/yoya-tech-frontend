"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Outcome {
  icon: "rocket" | "workflow" | "bot" | "server" | "window" | "blocks";
  title: string;
  desc: string;
}

const OUTCOMES: Outcome[] = [
  {
    icon: "rocket",
    title: "Launch new products and platforms",
    desc: "From first idea to launch day, with strategy, design and engineering in one team.",
  },
  {
    icon: "workflow",
    title: "Streamline operations and workflows",
    desc: "Map how work moves through the business and take out the steps that slow it down.",
  },
  {
    icon: "bot",
    title: "Automate repetitive business processes",
    desc: "Hand routine tasks to automations and AI, so people spend their time on the work that matters.",
  },
  {
    icon: "server",
    title: "Build scalable digital infrastructure",
    desc: "Platforms, data and integrations that keep up with growth without a rebuild.",
  },
  {
    icon: "window",
    title: "Improve digital presence and customer experience",
    desc: "Websites and customer touchpoints that are fast, clear and easy to use.",
  },
  {
    icon: "blocks",
    title: "Transform ideas into reliable systems",
    desc: "Turn plans on paper into dependable software that runs every day.",
  },
];

const ICON_SVGS: Record<string, React.ReactNode> = {
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  workflow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="8" height="8" x="3" y="3" rx="2" />
      <path d="M7 11v4a2 2 0 0 0 2 2h4" />
      <rect width="8" height="8" x="13" y="13" rx="2" />
    </svg>
  ),
  bot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2M20 14h2M15 13v2M9 13v2" />
    </svg>
  ),
  server: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="8" x="2" y="2" rx="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <path d="M6 6h.01M6 18h.01" />
    </svg>
  ),
  window: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 9h20M6 4v5M10 4v5" />
    </svg>
  ),
  blocks: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
    </svg>
  ),
};

const pad = (n: number) => String(n).padStart(2, "0");

export function BusinessOutcomes() {
  const rowRefs = React.useRef<(HTMLLIElement | null)[]>([]);
  const [scrollActiveIndex, setScrollActiveIndex] = React.useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    // Focus observer tracks the outcome nearest the middle of the viewport
    const focusObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = rowRefs.current.indexOf(entry.target as HTMLLIElement);
            if (idx !== -1) {
              setScrollActiveIndex(idx);
            }
          }
        }
      },
      { rootMargin: "-47% 0px -47% 0px" }
    );

    rowRefs.current.forEach((row) => {
      if (row) {
        focusObserver.observe(row);
      }
    });

    return () => {
      focusObserver.disconnect();
    };
  }, []);

  const currentActive = hoveredIndex !== null ? hoveredIndex : scrollActiveIndex;

  return (
    <section className="kuru-outcomes bg-black text-white" aria-labelledby="kuru-outcomes-heading">
      <div className="kuru-wrap kuru-outcomes-grid">
        {/* Sticky Intro on the Left */}
        <div className="kuru-outcomes-intro">
          <h2 id="kuru-outcomes-heading" className="kuru-h2">
            What we help businesses <span className="kuru-accent kuru-ink">achieve</span>
          </h2>
          <p className="kuru-lead">
            From customer-facing platforms to internal workflows, we design and build solutions that remove friction and unlock opportunities.
          </p>
          <Link
            className="kuru-text-link group mt-8 inline-flex items-center gap-2 text-sm text-text-muted hover:text-white transition-colors"
            href="#pricing"
          >
            <span>More about YoYa Tech</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        {/* 6 Outcomes List with Active Scroll Highlight & Hover Expansion on the Right */}
        <ol
          className="kuru-outcomes-list"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {OUTCOMES.map((item, index) => {
            const isActive = index === currentActive;
            return (
              <li
                key={item.title}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                className={`kuru-outcome group ${isActive ? "data-active" : ""}`}
                data-active={isActive ? "true" : undefined}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                <span className="kuru-outcome-index">{pad(index + 1)}</span>
                <span className="kuru-outcome-icon">{ICON_SVGS[item.icon]}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <span className="kuru-outcome-line" aria-hidden="true" />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
