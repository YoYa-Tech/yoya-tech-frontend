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
      className="relative isolate overflow-hidden bg-[#10240c] pt-[clamp(120px,14vh,168px)] pb-0 text-center"
    >
      {/* WebGL Ambient Living Shader Background */}
      <HeroCanvas />

      {/* Decorative gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-black/40 to-black"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1355px] px-4 sm:px-6 lg:px-8">
        {/* Main Title matching Kuru Labs typography & tracking */}
        <h1
          className="mx-auto max-w-5xl mb-6 font-display text-[clamp(44px,6.8vw,92px)] font-medium leading-[1.04] tracking-[-0.06em] text-white"
          style={{ fontFeatureSettings: "'ss02' 1" }}
        >
          <span className="block">
            Building the <span className="text-accent">systems</span>
          </span>
          <span className="block">
            <span className="font-serif italic font-light text-accent">behind</span> modern businesses
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-2xl mb-9 text-[clamp(16px,1.4vw,20px)] leading-[1.5] text-[#9a9a9a]">
          Strategy, engineering, automation and AI for startups and growing companies. From Addis Ababa to the world.
        </p>

        {/* Dual Call to Action Buttons with Kuru rolling text & responsive padding */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-7 sm:px-8 py-3 font-medium min-w-[160px]">
            <Link href="#pricing">
              <RollingText text="Start a project" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-7 sm:px-8 py-3 text-white border-white/20 hover:border-white/40 font-medium group min-w-[160px]"
          >
            <Link href="#works" className="inline-flex items-center justify-center">
              <RollingText text="See our work" />
              <ArrowRight className="ml-2 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Retained Frame + Pixel-Perfect Kuru Client Workspace with Subtle Bottom Fade */}
        <div className="hh-stage relative mx-auto mt-14 -mb-6 sm:-mb-8 lg:-mb-10 w-full max-w-[1180px]">
          <div className="hh-editor has-kuru-ws relative w-full h-[580px] sm:h-[620px] lg:h-[660px] rounded-2xl border border-white/12 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden">
            <HeroWorkspace />
          </div>
        </div>
      </div>

      {/* Signature Kuru Bottom Fade Overlay: Reveals the window content while smoothly softening the bottom edge into black */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[120px] sm:h-[160px] bg-gradient-to-t from-black via-black/60 to-transparent"
      />
    </section>
  );
}
