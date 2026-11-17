import * as React from "react";
import Image from "next/image";
import { LetsBuildCollision } from "./lets-build-collision";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

const PILLARS = [
  {
    title: "Crafted Websites & Dynamic CMS",
    description:
      "Marketing sites, editorial collections, and custom stores designed from typography upwards on an intuitive CMS you actually enjoy using.",
    image: "/approach/gradient.jpg",
    tag: "WEB & COMMERCE",
    metric: "0.2s Avg LCP",
  },
  {
    title: "High-Conversion Architecture",
    description:
      "Engineered conversion funnels with micro-interactions, sub-50ms latency, and automated SEO schema that drive measurable business outcomes.",
    image: "/kuru/showcase/art-bluelines.webp",
    tag: "CONVERSION ENGINE",
    metric: "99.98% Uptime",
  },
  {
    title: "Cross-Platform Mobile Engineering",
    description:
      "Native-grade iOS and Android experiences built from unified Flutter or React Native codebases, integrated with local payment gateways and real-time push.",
    image: "/kuru/showcase/art-sphere.webp",
    tag: "MOBILE APPS",
    metric: "60 FPS Native",
  },
  {
    title: "Autonomous AI & Workflow Automation",
    description:
      "Turn manual business bottlenecks into autonomous workflows. Claude and OpenAI agents that read documents, triage orders, and dispatch notifications.",
    image: "/kuru/showcase/art-stars.webp",
    tag: "AUTOMATION & AI",
    metric: "300+ Hrs Saved/Mo",
  },
];

export function LetsBuild() {
  return (
    <div className="relative bg-black text-white">
      {/* 1. Interactive Scroll-Driven Kinetic Collision */}
      <LetsBuildCollision />

      {/* 2. Four Engineering Pillars with Real Vector Artworks */}
      <section className="relative z-10 mx-auto max-w-[1371px] px-6 py-24 sm:py-32">
        <div className="mb-16 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            // OUR CORE PILLARS
          </span>
          <h2 className="mt-3 font-display text-[clamp(32px,5vw,56px)] font-medium tracking-tight text-white">
            Architecture built for speed and longevity
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-primary leading-relaxed">
            Every layer from user interaction down to database schema is crafted without technical debt or unnecessary abstractions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PILLARS.map((pillar) => (
            <Card
              key={pillar.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition-all duration-500 hover:border-accent/50 hover:bg-[#181818]"
            >
              {/* Pillar Image Frame with Subtle Zoom on Hover */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/80">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                
                {/* Badge tags */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="rounded-full bg-black/70 px-3 py-1 font-mono text-[10px] tracking-wider uppercase text-white/90 backdrop-blur-md border border-white/10">
                    {pillar.tag}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span className="rounded-full bg-accent/20 px-3 py-1 font-mono text-[10px] text-accent backdrop-blur-md border border-accent/30 font-semibold">
                    {pillar.metric}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <CardHeader className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="font-display text-xl sm:text-2xl font-medium text-white group-hover:text-accent transition-colors">
                    {pillar.title}
                  </CardTitle>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-white/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
                </div>
                <CardDescription className="mt-3 text-sm sm:text-base leading-relaxed text-text-primary">
                  {pillar.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
