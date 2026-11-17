import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HeroCanvas } from "./hero-canvas";
import { HeroWorkspace } from "./hero-workspace";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-[#10240c] pt-[clamp(120px,14vh,168px)] pb-16 text-center"
    >
      {/* WebGL Ambient Living Shader Background */}
      <HeroCanvas />

      {/* Decorative gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-black/40 to-black"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1355px] px-4 sm:px-6 lg:px-8">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs text-accent backdrop-blur-md mb-8">
          <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
          <span className="font-medium tracking-wide">
            AVAILABLE FOR Q2/Q3 PROJECTS · ADDIS ABABA & REMOTE
          </span>
        </div>

        {/* Main Title */}
        <h1 className="mx-auto max-w-5xl font-display text-[clamp(44px,7vw,92px)] font-medium leading-[1.05] tracking-[-0.04em] text-white">
          Building the systems behind modern businesses
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-[clamp(16px,2vw,20px)] leading-relaxed text-[#9a9a9a]">
          Software, web, automation and AI engineered to run reliably from first launch.
          From Addis Ababa to the world.
        </p>

        {/* Dual Call to Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-full px-8 font-medium">
            <Link href="#pricing">Start a project</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 text-white border-white/20 hover:border-white/40"
          >
            <Link href="#works" className="group">
              See our work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Interactive Workspace HUD Preview */}
        <HeroWorkspace />
      </div>
    </section>
  );
}
