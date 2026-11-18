"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  Users,
  Globe,
  Clock,
  Check,
  Mail,
  MapPin,
  ArrowUp,
  ExternalLink,
} from "lucide-react";
import { RollingText } from "@/components/ui/rolling-text";

const METRICS = [
  {
    value: "50+",
    label: "Products shipped for product companies",
    icon: Briefcase,
  },
  {
    value: "6+",
    label: "Years average engineering experience",
    icon: Users,
  },
  {
    value: "2 + 1",
    label: "Entities (Addis Ababa, Rome · US branch coming soon)",
    icon: Globe,
  },
  {
    value: "14 days",
    label: "Average team onboarding time",
    icon: Clock,
  },
];

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // State to hold live local time for Addis Ababa (UTC+3), Rome (UTC+1), and New Haven (UTC-5)
  const [times, setTimes] = React.useState({ addis: "", rome: "", newHaven: "" });
  const [currentYear, setCurrentYear] = React.useState<number>(2026);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    const updateClocks = () => {
      const now = new Date();
      setTimes({
        addis: now.toLocaleTimeString("en-US", {
          timeZone: "Africa/Addis_Ababa",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        rome: now.toLocaleTimeString("en-US", {
          timeZone: "Europe/Rome",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        newHaven: now.toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      });
    };
    updateClocks();
    const interval = setInterval(updateClocks, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative z-10 bg-[#000000] text-white border-t border-white/10 pt-24 pb-12 selection:bg-blue-500 selection:text-white">
      <div className="mx-auto max-w-[1355px] px-6 md:px-8">
        {/* =========================================================================
            TIER 1: INTERACTIVE PRE-FOOTER / ENGINEER CONSULTATION CTA & STATS
            ========================================================================= */}
        <div className="pb-16 sm:pb-20 border-b border-white/10">
          {/* Top Row: Headline Consultation Pitch & Action CTA Card */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            {/* Column 1: Big Headline & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-medium leading-[1.1] tracking-[-0.04em] text-white">
                <span>Want to talk to</span>
                <br />
                <span className="inline-flex items-center gap-2.5 flex-wrap">
                  <span className="text-white/80 font-normal">a</span>
                  {/* Exact vector wordmark from the official YoYa Tech logo — 100% faithful to the logo's geometric 'Y' */}
                  <span className="relative inline-flex items-center" title="YoYa">
                    <span className="sr-only">YoYa</span>
                    <svg
                      viewBox="535.4 452.5 373.2 123"
                      className="inline-block h-[0.80em] w-auto align-baseline -mb-[0.04em] overflow-visible"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient id="yoya-footer-headline-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#05c4f5" />
                          <stop offset="50%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#025ded" />
                        </linearGradient>
                      </defs>
                      {/* First 'Y' - Authentic logo vector */}
                      <path
                        fill="url(#yoya-footer-headline-grad)"
                        d="M659.23,453.29l-49.55,71.31-.26,42.62-26.02.07.03-42.13-48.03-72.2,29.77-.12,31.71,49.09,32.91-49.04c9.58-.13,17.7-.22,29.43.4Z"
                      />
                      {/* 'o' - Authentic logo vector */}
                      <path
                        fill="url(#yoya-footer-headline-grad)"
                        d="M717.38,555.67c-18.02,17.05-46.33,18.05-65.35,3.21-20.7-16.14-22.86-44.4-5.41-63.86,18.72-20.89,52.45-21.57,72.11-1.23,16.94,17.52,16.8,44.72-1.35,61.88ZM687.78,547.81c12.78-2.53,20.93-13.96,19.66-26.05-1.25-11.91-11.14-21.23-23.99-21.53-14.62-.34-26.14,12.44-24.79,26.39s14.31,24.12,29.12,21.18Z"
                      />
                      {/* Second 'Y' - Authentic logo vector */}
                      <path
                        fill="url(#yoya-footer-headline-grad)"
                        d="M832.73,453.06l-50.2,71.92-.06,42.25-25.84-.02.04-42.38-47.79-71.6c9.86-.65,19.37-.45,29.39-.38l31.81,49.27,32.82-49.19,29.82.13Z"
                      />
                      {/* 'a' - Authentic logo vector */}
                      <path
                        fill="url(#yoya-footer-headline-grad)"
                        d="M908.59,567.18l-23.87.08-.46-10.51c-5.23,4.56-9.31,8.4-15.83,10.4-27.23,8.35-56-10.19-58.24-39.01-1.89-24.28,16.39-44.96,40.02-48.43,13.15-1.93,24.61,2.26,34.14,11.63l.39-9.71,23.8-.18.05,85.72ZM870.98,545.89c9.3-4.47,14.37-13.59,13.74-23.2-.6-9.23-6.74-17.47-16.04-20.82-13.87-4.99-29.56,1.93-33.77,16.38-1.59,5.45-1.09,11.93,1.44,16.79,6.53,12.56,21.65,17.09,34.63,10.85Z"
                      />
                    </svg>
                  </span>
                  <span className="font-display font-semibold tracking-[-0.03em] text-white">
                    Tech
                  </span>
                </span>
                <br />
                <span className="font-serif italic font-light text-[#05c4f5]">
                  engineer?
                </span>
              </h2>

              <p className="text-base text-[#8a8f98] leading-relaxed max-w-xl">
                Before any commercial conversation, we&apos;ll put you on a 30-min call
                with a senior engineer in your stack. No salespeople. Just a
                technical sanity check.
              </p>

              <div className="pt-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-mono text-[#8a8f98]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span>Direct tech consultation · Addis Ababa, Rome &amp; USA</span>
                </div>
              </div>
            </div>

            {/* Column 2: Elevated "Tell us what you're working on" Card */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-b from-[#0f131a] to-[#07090d] p-6 sm:p-8 shadow-2xl">
                {/* Ambient glow in top-right */}
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/15 blur-3xl"
                  aria-hidden="true"
                />

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#05c4f5]">
                    Direct Engineer Access
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-medium text-white mb-2 leading-snug">
                  Tell us what you&apos;re working on.
                </h3>
                <p className="text-sm text-[#8a8f98] leading-relaxed mb-6">
                  We&apos;ll respond within one business day with the right next step.
                </p>

                <Link
                  href="#pricing"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#025ded] to-[#05c4f5] hover:opacity-95 px-6 text-sm font-medium text-white transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#025ded]/30 group"
                >
                  <RollingText text="Book a call" />
                </Link>

                <div className="mt-5 space-y-2 text-xs font-mono tracking-wider text-[#737882]">
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-[#05c4f5]" strokeWidth={2.5} />
                    <span className="uppercase">Engineering focus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-[#05c4f5]" strokeWidth={2.5} />
                    <span className="uppercase">No sales reps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Key Metrics & Stack Experience (Unified 4-Column Responsive Grid) */}
          <div className="mt-10 sm:mt-12 pt-10 sm:pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4.5">
            {METRICS.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div
                  key={idx}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_8px_24px_rgba(2,93,237,0.12)] min-h-[105px] sm:min-h-[120px]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-white group-hover:text-[#05c4f5] transition-colors duration-300">
                      {metric.value}
                    </div>
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-[#05c4f5] border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                  </div>
                  <div className="mt-2.5 text-xs sm:text-[13px] text-[#8a8f98] font-normal leading-relaxed">
                    {metric.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            TIER 2: 5-COLUMN FOOTER NAVIGATION & BRANCH LOCATIONS
            ========================================================================= */}
        <div className="pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Column 1: Brand & Contact (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-4">
              <Link href="/" aria-label="YoYa Tech — Home" className="inline-flex items-center group">
                <div className="relative h-9 w-[115px] shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/yoya_tech_logos/SVG/darkmodelogo.svg"
                    alt="YoYa Tech"
                    fill
                    sizes="115px"
                    className="object-contain object-left"
                  />
                </div>
              </Link>

              <p className="text-sm leading-relaxed text-[#8a8f98] max-w-xs">
                Engineering capacity for modern businesses. Delivered from Addis Ababa,
                Rome, and expanding soon to New Haven, Connecticut.
              </p>

              <div className="pt-2">
                <a
                  href="mailto:info@yoyatech.com"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#0e1015] px-3.5 py-2 text-xs font-mono text-[#8a8f98] transition-colors hover:border-white/30 hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5 text-[#05c4f5]" />
                  <span>info@yoyatech.com</span>
                </a>
              </div>
            </div>

            {/* Column 2: Company (lg:col-span-2) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-display text-sm font-medium text-white">Company</h4>
              <ul className="space-y-2.5 text-sm text-[#8a8f98]">
                <li>
                  <Link href="#approach" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#approach" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    Process
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    Engagement Model
                  </Link>
                </li>
                <li>
                  <Link href="#faqs" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    Blog &amp; Insights
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Why YoYa Tech (lg:col-span-2) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-display text-sm font-medium text-white">Why YoYa Tech</h4>
              <ul className="space-y-2.5 text-sm text-[#8a8f98]">
                <li>
                  <Link href="#works" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    Client Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    Life @ YoYa Tech
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#works" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    Our Clients
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Services (lg:col-span-2) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-display text-sm font-medium text-white">Services</h4>
              <ul className="space-y-2.5 text-sm text-[#8a8f98]">
                <li>
                  <Link href="#services" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    Engineering Teams
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    AI &amp; Data Products
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    Software Engineering
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    Cloud &amp; DevOps
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                    Product Modernization
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5: Our Locations (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-display text-sm font-medium text-white">Our Locations</h4>
              <div className="space-y-3 pt-1">
                {/* Location 1: Addis Ababa */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 transition-colors hover:border-white/20">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-[#05c4f5] border border-blue-500/20">
                      <MapPin className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 text-xs leading-relaxed">
                      <div className="flex items-center justify-between">
                        <span className="text-[#c0c5cf] font-medium">Addis Ababa, Ethiopia</span>
                        {times.addis && (
                          <span className="font-mono text-[10px] text-[#05c4f5] bg-blue-500/10 px-1.5 py-0.5 rounded">
                            {times.addis} EAT
                          </span>
                        )}
                      </div>
                      <div className="text-[#737882] mt-0.5">Engineering Hub · UTC+3</div>
                    </div>
                  </div>
                </div>

                {/* Location 2: Rome */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 transition-colors hover:border-white/20">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-[#05c4f5] border border-blue-500/20">
                      <MapPin className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 text-xs leading-relaxed">
                      <div className="flex items-center justify-between">
                        <span className="text-[#c0c5cf] font-medium">Rome, Italy</span>
                        {times.rome && (
                          <span className="font-mono text-[10px] text-[#05c4f5] bg-blue-500/10 px-1.5 py-0.5 rounded">
                            {times.rome} CET
                          </span>
                        )}
                      </div>
                      <div className="text-[#737882] mt-0.5">European Studio · UTC+1</div>
                    </div>
                  </div>
                </div>

                {/* Location 3: New Haven, Connecticut, USA (Coming Soon) */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 transition-colors hover:border-white/20">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-[#05c4f5] border border-blue-500/20">
                      <MapPin className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 text-xs leading-relaxed">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[#c0c5cf] font-medium">New Haven, CT, USA</span>
                        <span className="font-mono text-[10px] text-[#05c4f5] bg-[#05c4f5]/10 border border-[#05c4f5]/25 px-1.5 py-0.5 rounded whitespace-nowrap">
                          Coming Soon
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[#737882] mt-0.5">
                        <span>North America · UTC-5</span>
                        {times.newHaven && (
                          <span className="font-mono text-[10px] text-[#8a8f98]">
                            {times.newHaven} EST
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal Links & Back-to-Top (Centered on mobile, responsive split on desktop) */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center justify-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left text-xs font-mono text-[#737882]">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
            <span className="whitespace-nowrap">
              © {currentYear} YoYa Tech. All rights reserved.
            </span>
            <span className="hidden sm:inline text-white/10" aria-hidden="true">
              |
            </span>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Link href="#pricing" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#pricing" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#pricing" className="hover:text-white transition-colors">
                Security
              </Link>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            type="button"
            className="flex h-9 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 text-xs font-mono text-[#8a8f98] hover:text-white hover:border-white/30 transition-all cursor-pointer group shrink-0"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 text-[#05c4f5]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
