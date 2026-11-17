import * as React from "react";
import { cn } from "@/lib/utils";

export interface ServicesBannerProps {
  className?: string;
}

const CAPABILITIES = [
  "Product strategy",
  "Web & mobile apps",
  "Websites & eCommerce",
  "Workflow automation",
  "AI agents & assistants",
  "Data & machine learning",
  "Cloud & DevOps",
  "Integrations & APIs",
  "UI/UX design",
  "Brand identity",
  "Maintenance & support",
];

export function ServicesBanner({ className }: ServicesBannerProps) {
  return (
    <div className={cn("py-5 bg-[#141414] border-y border-white/10 overflow-hidden", className)}>
      <div className="flex animate-marquee-slow items-center gap-8 whitespace-nowrap text-white font-medium text-base sm:text-lg tracking-tight">
        {[...CAPABILITIES, ...CAPABILITIES].map((svc, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="text-white/90 hover:text-accent transition-colors font-display">
              {svc}
            </span>
            <span className="text-accent text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
