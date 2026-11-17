"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "I've worked with Kuru Labs on several different occasions and it's always a pleasure. They go through every detail and deliver according to your desires.",
    author: "Lasada Pippen",
    role: "Keynote Speaker, Author & Entrepreneur",
    location: "United States",
    avatar: "/team/avatar-1.0c4e3fc0.jpg",
    verified: "Verified Client · Contra",
  },
  {
    quote:
      "Great work overall. The design feels premium, the layout is well structured, and everything is responsive. They made the changes I requested quickly and didn't miss a beat.",
    author: "Lucas M.",
    role: "Founder & Product Lead",
    location: "United States",
    avatar: null,
    verified: "Verified Client · Direct Contract",
  },
  {
    quote:
      "Talented, creative, and most importantly trustworthy. They completed the revisions even after the project was marked complete on Contra weeks earlier.",
    author: "Saleh Al Zamil",
    role: "Managing Director, Tamkene",
    location: "Saudi Arabia",
    avatar: "/team/avatar-2.58306c73.jpg",
    verified: "Verified Client · Tamkene Group",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section
      id="testimonials"
      className="relative z-10 bg-black py-28 sm:py-36 border-b border-white/5 overflow-hidden"
    >
      <div className="mx-auto max-w-[1316px] px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              // CLIENT TESTIMONIALS
            </span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium tracking-tight text-white">
              Trusted by founders worldwide
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#161616] text-white/80 transition-all hover:border-accent hover:text-accent hover:bg-black"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#161616] text-white/80 transition-all hover:border-accent hover:text-accent hover:bg-black"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="relative rounded-3xl border border-white/10 bg-[#121212] p-8 sm:p-12 lg:p-16">
          <Quote className="h-12 w-12 text-accent/30 mb-8" />

          <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal leading-relaxed text-white">
            “{current.quote}”
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-white/10">
            <div className="flex items-center gap-4">
              {current.avatar ? (
                <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-accent/40 bg-black">
                  <Image
                    src={current.avatar}
                    alt={current.author}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/20 bg-accent/10 font-mono text-lg font-bold text-accent">
                  {current.author[0]}
                </div>
              )}

              <div>
                <h4 className="font-display text-lg font-medium text-white">
                  {current.author}
                </h4>
                <p className="text-xs sm:text-sm text-text-muted">
                  {current.role} · <span className="text-white/80">{current.location}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-1.5 font-mono text-xs text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
              <span>{current.verified}</span>
            </div>
          </div>
        </div>

        {/* Client Logos / Social Proof */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-white/40 text-xs font-mono">
          <span>ETHIOPIAN AIRLINES CARGO</span>
          <span>·</span>
          <span>TAMKENE SAUDI</span>
          <span>·</span>
          <span>ZEMEN BANK CORE</span>
          <span>·</span>
          <span>GUARDIANVETS</span>
        </div>
      </div>
    </section>
  );
}
