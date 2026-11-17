import * as React from "react";
import { CheckCircle2, Compass, Layers, GitBranch, Rocket, RefreshCw } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ProcessPipelineProps {
  className?: string;
}

export function ProcessPipeline({ className }: ProcessPipelineProps) {
  const steps = [
    {
      step: "01",
      title: "Discovery & Architecture Blueprint",
      icon: Compass,
      description:
        "We dissect your business model, customer workflows, and scalability bottlenecks. Before writing a single line of code, we deliver an end-to-end technical specification, database schema, and interface wireframes.",
      deliverable: "Architecture Spec & Interactive Wireframes",
    },
    {
      step: "02",
      title: "High-Fidelity Interface & Design System",
      icon: Layers,
      description:
        "Crafting tokenized design systems that ensure visual consistency. Seamless responsive behavior across mobile, tablet, and ultra-wide displays with strict accessibility benchmarks.",
      deliverable: "Tokenized UI Library & Component Specs",
    },
    {
      step: "03",
      title: "Full-Stack Production Engineering",
      icon: GitBranch,
      description:
        "TDD-driven implementation using modern stacks (Next.js, TypeScript, PostgreSQL, Python/Go). Server components, modular microservices, clean APIs, and zero implicit any types.",
      deliverable: "Modular Codebase with 100% IP Handover",
    },
    {
      step: "04",
      title: "Automated Testing & Global Cloud Deployment",
      icon: Rocket,
      description:
        "Automated unit, integration, and end-to-end test suites. Zero-downtime CI/CD deployment pipelines to serverless or containerized edge infrastructure with automated SSL and monitoring.",
      deliverable: "Automated CI/CD Pipeline & Live Production",
    },
    {
      step: "05",
      title: "Autonomous AI Agents & Continuous Polish",
      icon: RefreshCw,
      description:
        "Integrating autonomous agent loops that handle customer support, inventory alerts, and routine operations 24/7. Ongoing telemetry monitoring, SEO maintenance, and performance tuning.",
      deliverable: "24/7 AI Workers & Observability Dashboard",
    },
  ];

  return (
    <section id="services" className={cn("relative py-24 md:py-36 bg-black border-t border-white/[0.08]", className)}>
      <Container size="wide" className="space-y-20">
        {/* Section Header */}
        <div className="max-w-[800px] space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-accent">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Execution Methodology
          </div>
          <h2 className="font-display text-[40px] sm:text-[56px] md:text-[68px] font-semibold tracking-[-0.04em] text-white leading-tight">
            From first idea to systems that run.
          </h2>
          <p className="text-text-muted text-[17px] md:text-[19px] leading-relaxed">
            A disciplined, transparent delivery framework designed to eliminate guesswork and ship institutional-grade systems on time and on budget.
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group p-8 md:p-10 rounded-2xl border border-white/10 bg-[#0d0e0d] hover:border-accent/40 hover:bg-[#121412] transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-3 flex items-center gap-4">
                    <span className="font-mono text-3xl md:text-4xl font-bold text-accent">
                      {item.step}
                    </span>
                    <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-2">
                    <h3 className="text-xl md:text-2xl font-medium text-white group-hover:text-accent transition-colors tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-text-muted text-[15px] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex lg:justify-end items-center">
                    <div className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-xs font-mono text-text-primary group-hover:border-accent/30 transition-colors">
                      <span className="text-text-muted block text-[10px] uppercase">Outcome</span>
                      <span className="text-white font-medium">{item.deliverable}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

