import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Mail } from "lucide-react";
import { RollingText } from "@/components/ui/rolling-text";
import { WaterRipple } from "./water-ripple";

export function ConversionCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-bg-canvas py-32 sm:py-48 text-center border-b border-border">
      {/* Interactive Water Ripple Shader Background */}
      <WaterRipple />

      {/* Decorative center radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1316px] px-6">
        <h2 className="mx-auto max-w-4xl font-display text-[clamp(36px,5.5vw,68px)] font-medium leading-[1.08] tracking-[-0.04em] text-text-secondary">
          We don’t just deliver projects.{" "}
          <span className="text-accent font-display">We build beyond limits.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-text-muted">
          From customer-facing platforms to automated operations, we engineer reliable digital systems that help your business move faster and grow.
        </p>

        {/* Dual Primary Call-to-Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-7 sm:px-8 py-3 text-sm sm:text-base font-medium min-w-[160px]">
            <Link href="#pricing">
              <RollingText text="Start a project" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-7 sm:px-8 py-3 text-sm sm:text-base font-medium group min-w-[160px]"
          >
            <Link href="#works" className="inline-flex items-center justify-center">
              <RollingText text="See our work" />
              <ArrowRight className="ml-2 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </Button>
        </div>

        {/* Direct Channel Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted">
          <a
            href="https://wa.me/251911000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-border bg-bg-surface px-4 py-2 text-text-muted transition-colors hover:border-accent hover:text-text-secondary"
          >
            <MessageSquare className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href="mailto:contact@kurulabs.com"
            className="flex items-center gap-2 rounded-full border border-border bg-bg-surface px-4 py-2 text-text-muted transition-colors hover:border-accent hover:text-text-secondary"
          >
            <Mail className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
            <span>contact@kurulabs.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}
