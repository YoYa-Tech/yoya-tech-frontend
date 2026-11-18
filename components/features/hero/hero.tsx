import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { RollingText } from "@/components/ui/rolling-text";
import { HeroCanvas } from "./hero-canvas";
import { HeroWorkspace } from "./hero-workspace";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-[#020612] pt-[clamp(120px,14vh,168px)] pb-0 text-center"
    >
      {/* WebGL Ambient Living Shader Background */}
      <HeroCanvas />

      {/* Ambient YoYa Tech gradient glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[640px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_top,rgba(2,93,237,0.22),rgba(5,196,245,0.08)_45%,transparent_75%)] blur-[90px]"
        aria-hidden="true"
      />

      {/* Decorative gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-black/20 to-[var(--color-bg-canvas,#000000)]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1355px] px-4 sm:px-6 lg:px-8">
        {/* Main Title typography & tracking */}
        <h1
          className="mx-auto max-w-5xl mb-6 font-display text-[clamp(44px,6.8vw,92px)] font-medium leading-[1] tracking-[-0.06em] text-white"
          style={{ fontFeatureSettings: "'ss02' 1" }}
        >
          <span className="block">
            Building the <span className="font-serif italic font-light text-white">systems</span>
          </span>
          <span className="block">
            <span className="font-serif font-light text-white">behind</span> modern businesses
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-2xl mb-9 text-[clamp(16px,1.4vw,20px)] leading-[1.5] text-[#9a9a9a]">
          Strategy, engineering, automation and AI for startups and growing companies. From Addis Ababa and Rome to the world.
        </p>

        {/* Dual Call to Action Buttons with rolling text & responsive padding */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-7 sm:px-8 min-w-[160px]">
            <Link href="#pricing">
              <RollingText text="Start a project" />
            </Link>
          </Button>

          <Button
            asChild
            variant="glass"
            size="lg"
            className="rounded-full px-7 sm:px-8 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-white/40 backdrop-blur-md min-w-[160px] group"
          >
            <Link href="#works" style={{ color: "#ffffff" }}>
              <RollingText text="See our work" />
              <ArrowRight strokeWidth={1.5} className="ml-2 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 text-white" />
            </Link>
          </Button>
        </div>

        {/* YoYa Tech Client Workspace with Subtle Bottom Fade */}
        <div className="hh-stage relative mx-auto mt-14 -mb-6 sm:-mb-8 lg:-mb-10 w-full max-w-[1355px]">
          <div className="hh-editor has-kuru-ws relative w-full h-[600px] sm:h-[660px] lg:h-[720px] rounded-t-[20px] sm:rounded-t-[24px] rounded-b-none border border-white/12 border-b-0 bg-[#0b0b0c] shadow-[0_24px_60px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden [transform:translateZ(0)]">
            <HeroWorkspace />
          </div>
        </div>
      </div>

      {/* YoYa Tech Bottom Fade Overlay: Smoothly softens the bottom edge into the canvas background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[120px] sm:h-[160px] bg-gradient-to-t from-[var(--color-bg-canvas,#000000)] via-[var(--color-bg-canvas,#000000)]/60 to-transparent"
      />
    </section>
  );
}
