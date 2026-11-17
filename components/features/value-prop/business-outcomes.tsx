import * as React from "react";
import { ToolIcon } from "@/components/ui/tool-icon";
import {
  Rocket,
  GitBranch,
  Bot,
  Server,
  AppWindow,
  Blocks,
  ArrowRight,
} from "lucide-react";

const OUTCOMES = [
  {
    icon: Rocket,
    title: "Launch new products and platforms",
    desc: "From first idea to launch day, with strategy, design and engineering in one team.",
    num: "01",
  },
  {
    icon: GitBranch,
    title: "Streamline operations and workflows",
    desc: "Map how work moves through the business and take out the steps that slow it down.",
    num: "02",
  },
  {
    icon: Bot,
    title: "Automate repetitive business processes",
    desc: "Hand routine tasks to automations and AI, so people spend their time on the work that matters.",
    num: "03",
  },
  {
    icon: Server,
    title: "Build scalable digital infrastructure",
    desc: "Platforms, data and integrations that keep up with growth without a rebuild.",
    num: "04",
  },
  {
    icon: AppWindow,
    title: "Improve digital presence & customer experience",
    desc: "Websites and customer touchpoints that are fast, clear and intuitive to use.",
    num: "05",
  },
  {
    icon: Blocks,
    title: "Transform ideas into reliable systems",
    desc: "Turn plans on paper into dependable software that runs securely every single day.",
    num: "06",
  },
];

const PLATFORMS = [
  { name: "Webflow", slug: "webflow" },
  { name: "WordPress", slug: "wordpress" },
  { name: "Wix Studio", slug: "wix" },
  { name: "Shopify", slug: "shopify" },
  { name: "Framer", slug: "framer" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "React", slug: "react" },
  { name: "Flutter", slug: "flutter" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Python", slug: "python" },
  { name: "Laravel", slug: "laravel" },
  { name: "Supabase", slug: "supabase" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Docker", slug: "docker" },
  { name: "Google Cloud", slug: "googlecloud" },
  { name: "n8n", slug: "n8n" },
  { name: "Hugging Face", slug: "huggingface" },
  { name: "Claude", slug: "claude" },
];

export function BusinessOutcomes() {
  return (
    <section className="relative z-10 border-b border-white/5 bg-black py-28 sm:py-36">
      <div className="mx-auto max-w-[1316px] px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-start">
          {/* Left Column: Outcomes List */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                // MEASURABLE IMPACT
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.15]">
                What we help businesses achieve
              </h2>
              <p className="mt-4 text-base sm:text-lg text-text-primary leading-relaxed max-w-xl">
                We engineer systems that reduce operational overhead, automate manual tasks, and accelerate product velocity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {OUTCOMES.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.num}
                    className="group rounded-xl border border-white/10 bg-[#121212] p-5 transition-all duration-300 hover:border-accent/40 hover:bg-[#161616]"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/60 border border-white/10 text-accent">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs text-text-muted group-hover:text-accent transition-colors">
                        {item.num}
                      </span>
                    </div>
                    <h3 className="font-display text-base font-medium text-white group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-text-primary">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Platform Grid Matrix */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#121212] p-6 sm:p-8">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                // COMPATIBILITY
              </span>
              <h3 className="mt-2 font-display text-2xl font-medium text-white">
                Any stack, one standard
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-text-primary leading-relaxed">
                We build across your existing tech ecosystem or select the most maintainable tools for your specific workload.
              </p>

              {/* 18 Platforms Grid using .kuru-platforms styling */}
              <ul className="kuru-platforms mt-6" aria-label="Platforms we build on">
                {PLATFORMS.map((platform) => (
                  <li key={platform.name} title={platform.name} className="group cursor-default">
                    <ToolIcon
                      slug={platform.slug}
                      size={26}
                      className="text-white/60 transition-colors group-hover:text-accent"
                    />
                    <span className="font-medium group-hover:text-white transition-colors">
                      {platform.name}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-black/50 p-4 text-xs font-mono">
                <span className="text-text-muted">Need custom integration?</span>
                <span className="text-accent flex items-center gap-1 font-semibold">
                  REST · GraphQL · Webhooks
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
