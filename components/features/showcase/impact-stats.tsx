import * as React from "react";
import { Gauge, Sparkles, TrendingUp, ShieldCheck, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ImpactStatsProps {
  className?: string;
}

export function ImpactStats({ className }: ImpactStatsProps) {
  const metrics = [
    {
      value: "4.2x",
      label: "Deployment Velocity",
      sublabel: "From initial sprint to live production delivery",
      accent: true,
    },
    {
      value: "< 80ms",
      label: "Global Edge Latency",
      sublabel: "Real-time responses delivered from closest points of presence",
      accent: false,
    },
    {
      value: "99.98%",
      label: "System Availability",
      sublabel: "Fault-tolerant architectures with automatic failover",
      accent: false,
    },
    {
      value: "$0",
      label: "Vendor Royalty Fee",
      sublabel: "Zero licensing overhead — you own 100% of the software",
      accent: true,
    },
  ];

  return (
    <section className={cn("relative py-24 md:py-32 bg-black border-t border-white/[0.08]", className)}>
      <Container size="wide" className="space-y-16">
        {/* Banner Header */}
        <div className="text-center max-w-[800px] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-mono tracking-widest uppercase">
            <Zap className="h-3 w-3" />
            Performance Benchmark
          </div>
          <h2 className="font-display text-[40px] sm:text-[56px] md:text-[72px] font-semibold text-white tracking-[-0.04em] leading-tight">
            Launch faster. <br className="hidden sm:inline" />
            <span className="text-accent">Operate smarter.</span>
          </h2>
          <p className="text-text-muted text-[16px] md:text-[18px] leading-relaxed">
            Legacy agencies bill hundreds of manual hours for slow results. We fuse modern engineering frameworks with autonomous tooling to deliver institutional software at startup speed.
          </p>
        </div>

        {/* 4 Big Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((item, idx) => (
            <Card
              key={idx}
              variant="default"
              className="p-8 rounded-xl border border-white/10 bg-[#141414] hover:border-accent/40 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-2">
                <span className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                  {item.value}
                </span>
                <div className="text-lg font-medium text-white tracking-tight pt-2">
                  {item.label}
                </div>
              </div>
              <p className="text-text-muted text-xs leading-relaxed border-t border-white/10 pt-4">
                {item.sublabel}
              </p>
            </Card>
          ))}
        </div>

        {/* Interactive Comparison HUD */}
        <div className="rounded-2xl border border-white/10 bg-[#0c0d0c] p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <h3 className="text-xl font-medium text-white">Traditional Dev vs. Kuru Labs</h3>
              <p className="text-text-muted text-sm mt-1">Direct comparison of operational throughput and build cycle</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-text-muted">
                <span className="h-2 w-2 rounded-full bg-white/40" /> Traditional Agency
              </span>
              <span className="flex items-center gap-1.5 text-accent">
                <span className="h-2 w-2 rounded-full bg-accent" /> Kuru Labs
              </span>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-text-primary">Sprint Delivery Speed</span>
                <span className="text-accent font-semibold">12-18 days (Kuru) vs 3-6 months (Traditional)</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
                <div className="h-full bg-accent rounded-full w-[85%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-text-primary">Automated CI/CD & Test Automation</span>
                <span className="text-accent font-semibold">100% Automated Testing Pipeline</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
                <div className="h-full bg-accent rounded-full w-[95%]" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

