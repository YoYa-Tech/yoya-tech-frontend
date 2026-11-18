"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { RollingText } from "@/components/ui/rolling-text";

const ROW1_COVERS = [
  "/kuru/showcase/cover-flow.webp",
  "/kuru/showcase/cover-meridian.webp",
  "/kuru/showcase/cover-analytics.webp",
  "/kuru/showcase/cover-health.webp",
  "/intro/84a40757.webp",
  "/intro/f3ec6156.webp",
];

const ROW2_COVERS = [
  "/intro/f5b3fbda.webp",
  "/kuru/showcase/cover-agent.webp",
  "/kuru/showcase/cover-code.webp",
  "/kuru/showcase/cover-tarn.webp",
  "/intro/a295b880.webp",
  "/intro/5fa548c7.webp",
  "/kuru/showcase/cover-norholm.webp",
];

export function ImpactStats() {
  return (
    <section
      aria-labelledby="intro-heading"
      className="relative isolate z-10 bg-bg overflow-hidden border-t border-b border-line"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-8">
        <div className="relative h-[680px] sm:h-[760px] lg:h-[820px]">
          {/* Background Image Carousel Tracks */}
          <div className="pointer-events-none absolute inset-0 flex flex-col gap-3 overflow-hidden opacity-35 sm:opacity-45 select-none">
            {/* Track 1: Moving Right */}
            <div className="flex min-h-0 flex-1 overflow-hidden" style={{ paddingLeft: "260px" }}>
              <div className="flex h-full w-max shrink-0 animate-marquee gap-3">
                {ROW1_COVERS.concat(ROW1_COVERS).map((src, idx) => (
                  <div
                    key={`row1-${idx}`}
                    className="relative h-full w-auto aspect-[4/3] shrink-0 overflow-hidden rounded-xl bg-surface-strong border border-line"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 300px, 500px"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Track 2: Moving Left */}
            <div className="flex min-h-0 flex-1 overflow-hidden" style={{ paddingLeft: "100px" }}>
              <div
                className="flex h-full w-max shrink-0 gap-3"
                style={{
                  animation: "marquee 35s linear infinite reverse",
                }}
              >
                {ROW2_COVERS.concat(ROW2_COVERS).map((src, idx) => (
                  <div
                    key={`row2-${idx}`}
                    className="relative h-full w-auto aspect-[4/3] shrink-0 overflow-hidden rounded-xl bg-surface-strong border border-line"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 300px, 500px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gradient Masks ensuring text legibility across light and dark modes */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(90deg, var(--color-bg-canvas) 0%, color-mix(in srgb, var(--color-bg-canvas) 94%, transparent) 36%, color-mix(in srgb, var(--color-bg-canvas) 60%, transparent) 65%, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(180deg, var(--color-bg-canvas) 0%, transparent 22%, transparent 78%, var(--color-bg-canvas) 100%)",
            }}
          />

          {/* Foreground Left-Aligned Intro Copy */}
          <div className="relative z-20 flex h-full items-center sm:items-start sm:pt-[130px] px-2 sm:px-4">
            <div className="max-w-xl">
              <h2
                id="intro-heading"
                className="font-display text-[clamp(40px,5.6vw,72px)] leading-[1.04] font-medium tracking-[-0.06em] text-fg"
              >
                Launch faster
                <br />
                <span className="text-fg/80">Operate smarter</span>
              </h2>

              <p className="mt-4 max-w-[460px] text-base sm:text-lg leading-relaxed text-fg-muted">
                YoYa Tech partners with startups, founders and growing companies to turn ideas into scalable digital products and efficient business systems. Strategy, engineering, automation and digital execution, from one team.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-full bg-fg px-5 sm:px-6 py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-medium text-bg transition-colors hover:bg-fg-strong active:scale-[0.98] shadow-sm min-w-[120px]"
                >
                  <RollingText text="About Us" />
                </Link>
                <Link
                  href="#works"
                  className="inline-flex items-center justify-center rounded-full border border-line-strong bg-transparent px-5 sm:px-6 py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-medium text-fg transition-colors hover:bg-surface-hover active:scale-[0.98] min-w-[130px]"
                >
                  <RollingText text="See our work" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
