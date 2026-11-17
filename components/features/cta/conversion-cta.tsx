import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Mail } from "lucide-react";
import { WaterRipple } from "./water-ripple";

export function ConversionCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-black py-32 sm:py-48 text-center border-b border-white/5">
      {/* Interactive Water Ripple Shader Background */}
      <WaterRipple />

      {/* Decorative center radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1316px] px-6">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          // INITIATE A PROJECT
        </span>

        <h2 className="mx-auto mt-4 max-w-4xl font-display text-[clamp(36px,6vw,72px)] font-medium leading-[1.08] tracking-tight text-white">
          Have an idea in mind?{" "}
          <span className="text-accent italic font-serif">Let’s build it.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-text-primary">
          Whether you need a high-conversion eCommerce store, a scalable mobile platform, or autonomous AI automations, we deliver software you can rely on.
        </p>

        {/* Dual Primary Call-to-Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-full px-8 py-6 text-base font-semibold shadow-xl shadow-accent/20">
            <Link href="#pricing">Start a project</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-6 text-base text-white border-white/20 hover:border-white/40"
          >
            <Link href="#works" className="group">
              See our work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Direct Channel Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted">
          <a
            href="https://wa.me/251911000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/80 transition-colors hover:border-accent hover:text-white"
          >
            <MessageSquare className="h-3.5 w-3.5 text-accent" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href="mailto:contact@kurulabs.com"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/80 transition-colors hover:border-accent hover:text-white"
          >
            <Mail className="h-3.5 w-3.5 text-accent" />
            <span>contact@kurulabs.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}
