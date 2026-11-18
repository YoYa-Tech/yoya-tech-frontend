"use client";

import * as React from "react";
import Link from "next/link";
import { RollingText } from "@/components/ui/rolling-text";

interface Tier {
  name: string;
  price: string;
  text: string;
  href: string;
  per?: string;
}

interface Division {
  id: string;
  name: string;
  summary: string;
  note: string;
  tiers: Tier[];
}

const DIVISIONS: Division[] = [
  {
    id: "web",
    name: "Web & digital presence",
    summary:
      "Websites and online stores that carry your brand, load fast and turn visitors into customers.",
    note: "Starting points in US dollars",
    tiers: [
      {
        name: "Business website",
        price: "$800",
        text: "Three core pages designed from the ground up, on a CMS you run yourself.",
        href: "#pricing-web",
      },
      {
        name: "eCommerce store",
        price: "$1,500",
        text: "Catalogue, cart and checkout, with a dashboard you can actually run.",
        href: "#pricing-web",
      },
      {
        name: "Custom build",
        price: "$3,000",
        text: "Multi-collection CMS, advanced motion and larger sites, scoped together first.",
        href: "#pricing-web",
      },
    ],
  },
  {
    id: "product-engineering",
    name: "Product engineering",
    summary:
      "Customer-facing platforms, web and mobile apps, and the infrastructure underneath them, built to scale.",
    note: "Starting points in US dollars, confirmed after a discovery call",
    tiers: [
      {
        name: "MVP launch",
        price: "$2,500",
        text: "A focused first version: core flows, accounts and an admin, ready for real users.",
        href: "#pricing-product-engineering",
      },
      {
        name: "Mobile app",
        price: "$4,000",
        text: "iOS and Android from one codebase, connected to your backend and payments.",
        href: "#pricing-product-engineering",
      },
      {
        name: "Web platform",
        price: "$6,000",
        text: "Portals, dashboards and SaaS products with roles, billing and integrations.",
        href: "#pricing-product-engineering",
      },
    ],
  },
  {
    id: "automation-ai",
    name: "Automation & AI",
    summary:
      "Repetitive work handed to automations and AI, so your team spends its time on what matters.",
    note: "Starting points in US dollars, per workflow or assistant",
    tiers: [
      {
        name: "Workflow automation",
        price: "$400",
        text: "Connect your tools with n8n, Make or Zapier and take one process off your team’s plate.",
        href: "#pricing-automation-ai",
      },
      {
        name: "AI assistant",
        price: "$1,200",
        text: "A chat assistant that answers from your own documents, on your site or WhatsApp.",
        href: "#pricing-automation-ai",
      },
      {
        name: "AI agents & custom ML",
        price: "$3,000",
        text: "Agents that act across your systems, and models trained on your own data.",
        href: "#pricing-automation-ai",
      },
    ],
  },
  {
    id: "partnership",
    name: "Partnership & support",
    summary:
      "A long-term technical partner for upkeep, steady improvement and new ideas after launch.",
    note: "Monthly plans in US dollars",
    tiers: [
      {
        name: "Care plan",
        price: "$150",
        text: "Updates, backups, monitoring and small fixes for one site or app.",
        href: "#pricing-partnership",
        per: "/mo",
      },
      {
        name: "Growth plan",
        price: "$500",
        text: "Monthly hours for improvements, content, analytics and new automations.",
        href: "#pricing-partnership",
        per: "/mo",
      },
      {
        name: "Dedicated capacity",
        price: "$1,500",
        text: "A part-time designer and engineer working inside your roadmap.",
        href: "#pricing-partnership",
        per: "/mo",
      },
    ],
  },
];

const pad = (n: number) => String(n).padStart(2, "0");
const clamp = (val: number) => Math.max(0, Math.min(1, val));

export function PricingSection() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let stackInView = false;
    let frame = 0;
    const stackTop = 112;

    function renderStack() {
      frame = 0;
      if (!stackInView || window.innerWidth < 768) return;

      const arrived = cardRefs.current.map((card, index) => {
        if (!card || !index) return 0;
        const distance = card.getBoundingClientRect().top - (stackTop + index * 20);
        return clamp(1 - distance / (window.innerHeight * 0.7));
      });

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const depth = arrived.slice(index + 1).reduce((sum, value) => sum + value, 0);
        card.style.setProperty("--depth", depth.toFixed(3));
      });
    }

    function schedule() {
      if (!frame && stackInView) {
        frame = requestAnimationFrame(renderStack);
      }
    }

    const stackObserver = new IntersectionObserver((entries) => {
      stackInView = entries[entries.length - 1].isIntersecting;
      schedule();
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            revealObserver.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );

    stackObserver.observe(section);

    cardRefs.current.forEach((card) => {
      if (card) revealObserver.observe(card);
    });

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();

    return () => {
      stackObserver.disconnect();
      revealObserver.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="kuru-pricing bg-bg-canvas text-text-secondary"
      aria-labelledby="kuru-pricing-heading"
    >
      <div className="kuru-wrap">
        {/* Header */}
        <div className="kuru-pricing-intro">
          <h2 id="kuru-pricing-heading" className="kuru-h2">
            Pricing
          </h2>
          <p className="kuru-lead">
            Four divisions, one team. Every price is a starting point in US dollars, and each project is quoted on its actual scope before work begins.
          </p>
        </div>

        {/* Stacked Cards Deck on Scroll */}
        <div className="kuru-stack relative">
          {DIVISIONS.map((division, index) => (
            <article
              key={division.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="kuru-division"
              id={`pricing-${division.id}`}
              style={{ "--i": index } as React.CSSProperties}
              aria-labelledby={`kuru-division-${index}`}
            >
              <div className="kuru-division-card">
                {/* Division Info & CTA */}
                <div className="kuru-division-head">
                  <p className="kuru-division-index">
                    {pad(index + 1)} <span>/ {pad(DIVISIONS.length)}</span>
                  </p>
                  <h3 id={`kuru-division-${index}`} className="kuru-division-name">
                    {division.name}
                  </h3>
                  <p className="kuru-division-summary">{division.summary}</p>
                  <p className="kuru-division-note">{division.note}</p>
                  <Link className="kuru-button mt-6" href="/#pricing">
                    <RollingText text="Start a project" />
                  </Link>
                </div>

                {/* Tiers List */}
                <div className="kuru-division-body">
                  <ul className="kuru-tiers">
                    {division.tiers.map((tier) => (
                      <li key={tier.name}>
                        <Link className="kuru-tier" href={tier.href}>
                          <span className="kuru-tier-name">{tier.name}</span>
                          <span className="kuru-tier-text">{tier.text}</span>
                          <span className="kuru-tier-price">
                            <small>from</small>
                            <span>{tier.price}</span>
                            {tier.per && <small>{tier.per}</small>}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Large Background Watermark Numeral */}
                <span className="kuru-division-numeral" aria-hidden="true">
                  {pad(index + 1)}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
