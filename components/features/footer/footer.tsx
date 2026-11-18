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
} from "lucide-react";
import { RollingText } from "@/components/ui/rolling-text";

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative z-10 bg-[#000000] text-white border-t border-white/10 pt-24 pb-12 selection:bg-blue-500 selection:text-white">
      <div className="mx-auto max-w-[1355px] px-6 md:px-8">
        {/* =========================================================================
            TIER 1: MEREB-STYLE INTERACTIVE PRE-FOOTER / ENGINEER CONSULTATION CTA
            ========================================================================= */}
        <div className="pb-20 border-b border-white/10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Column 1: Big Headline & Value Proposition */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-medium leading-[1.08] tracking-[-0.04em] text-white">
                Want to talk to
                <br />
                <span className="text-[#3b82f6]">a YoYa Tech</span>
                <br />
                <span className="text-[#3b82f6]">engineer?</span>
              </h2>

              <p className="text-base text-[#8a8f98] leading-relaxed max-w-md">
                Before any commercial conversation, we&apos;ll put you on a 30-min call
                with a senior engineer in your stack. No salespeople. Just a
                technical sanity check.
              </p>
            </div>

            {/* Column 2: Key Metrics & Stack Experience */}
            <div className="lg:col-span-3 space-y-7">
              {/* Metric 1 */}
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-[#3b82f6]">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-white leading-none">
                    50+
                  </div>
                  <div className="mt-1 text-[11px] font-mono uppercase tracking-wider text-[#737882] leading-tight">
                    Products shipped for product companies
                  </div>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-[#3b82f6]">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-white leading-none">
                    6+
                  </div>
                  <div className="mt-1 text-[11px] font-mono uppercase tracking-wider text-[#737882] leading-tight">
                    Years average engineering experience
                  </div>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-[#3b82f6]">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-white leading-none">
                    2
                  </div>
                  <div className="mt-1 text-[11px] font-mono uppercase tracking-wider text-[#737882] leading-tight">
                    Entities (Addis Ababa, Rome)
                  </div>
                </div>
              </div>

              {/* Metric 4 */}
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-[#3b82f6]">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-white leading-none">
                    14 days
                  </div>
                  <div className="mt-1 text-[11px] font-mono uppercase tracking-wider text-[#737882] leading-tight">
                    Average team onboarding time
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Elevated "Tell us what you're working on" Card */}
            <div className="lg:col-span-4">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e1015] p-7 sm:p-8 shadow-2xl">
                <h3 className="font-display text-xl sm:text-2xl font-medium text-white mb-2 leading-snug">
                  Tell us what you&apos;re working on.
                </h3>
                <p className="text-sm text-[#8a8f98] leading-relaxed mb-6">
                  We&apos;ll respond within one business day with the right next step.
                </p>

                <Link
                  href="#pricing"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] px-6 py-3.5 text-sm font-medium text-white transition-all duration-200 active:scale-[0.98] shadow-lg shadow-blue-600/25 group"
                >
                  <RollingText text="Book a call" />
                </Link>

                <div className="mt-5 space-y-2 text-xs font-mono tracking-wider text-[#737882]">
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-[#3b82f6]" strokeWidth={2.5} />
                    <span className="uppercase">Engineering focus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-[#3b82f6]" strokeWidth={2.5} />
                    <span className="uppercase">No sales</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            TIER 2: MEREB-STYLE 5-COLUMN FOOTER NAVIGATION & BRANCH LOCATIONS
            ========================================================================= */}
        <div className="pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Column 1: Brand & Contact (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-4">
              <Link href="/" className="inline-flex items-center gap-2.5 group">
                <div className="relative h-7 w-7 shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="/yoya_tech_logos/SVG/onlylogo.svg"
                    alt="YoYa Tech"
                    fill
                    sizes="28px"
                    className="object-contain"
                  />
                </div>
                <span className="font-display text-xl font-medium tracking-tight text-white transition-colors">
                  YoYa Tech
                </span>
              </Link>

              <p className="text-sm leading-relaxed text-[#8a8f98] max-w-xs">
                Engineering capacity for modern businesses. Dual-contracted and
                delivered from Addis Ababa and Rome.
              </p>

              <div className="pt-2">
                <a
                  href="mailto:info@yoyatech.com"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#0e1015] px-3.5 py-2 text-xs font-mono text-[#8a8f98] transition-colors hover:border-white/30 hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5 text-[#3b82f6]" />
                  <span>info@yoyatech.com</span>
                </a>
              </div>
            </div>

            {/* Column 2: Company (lg:col-span-2) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-display text-sm font-medium text-white">Company</h4>
              <ul className="space-y-2.5 text-sm text-[#8a8f98]">
                <li>
                  <Link href="#approach" className="hover:text-white transition-colors">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#approach" className="hover:text-white transition-colors">
                    Process
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-white transition-colors">
                    Engagement Model
                  </Link>
                </li>
                <li>
                  <Link href="#faqs" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Why YoYa Tech (lg:col-span-2) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-display text-sm font-medium text-white">Why YoYa Tech</h4>
              <ul className="space-y-2.5 text-sm text-[#8a8f98]">
                <li>
                  <Link href="#works" className="hover:text-white transition-colors">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="hover:text-white transition-colors">
                    Client Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-white transition-colors">
                    Life @ YoYa Tech
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#works" className="hover:text-white transition-colors">
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
                  <Link href="#services" className="hover:text-white transition-colors">
                    Engineering Teams
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-white transition-colors">
                    AI & Data Products
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-white transition-colors">
                    Software Engineering
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-white transition-colors">
                    Cloud & DevOps
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-white transition-colors">
                    Product Modernization
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5: Our Locations (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-display text-sm font-medium text-white">Our Locations</h4>
              <div className="space-y-4 pt-1">
                {/* Location 1: Addis Ababa */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-[#3b82f6]">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-xs leading-relaxed">
                    <div className="text-[#c0c5cf] font-medium">Addis Ababa, Ethiopia —</div>
                    <div className="text-[#737882]">Engineering Hub</div>
                  </div>
                </div>

                {/* Location 2: Rome */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-[#3b82f6]">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-xs leading-relaxed">
                    <div className="text-[#c0c5cf] font-medium">Rome, Italy —</div>
                    <div className="text-[#737882]">European Studio</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#737882]">
          <div>
            © 2026 YoYa Tech. All rights reserved.
          </div>
          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 text-[#8a8f98] hover:text-white transition-colors cursor-pointer group"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
