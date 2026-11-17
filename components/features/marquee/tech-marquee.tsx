import * as React from "react";
import { ToolIcon } from "@/components/ui/tool-icon";

const ROW_1 = [
  { name: "Next.js", slug: "nextdotjs" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Flutter", slug: "flutter" },
  { name: "Laravel", slug: "laravel" },
  { name: "Django", slug: "django" },
  { name: "FastAPI", slug: "fastapi" },
  { name: "Supabase", slug: "supabase" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Docker", slug: "docker" },
  { name: "Kubernetes", slug: "kubernetes" },
  { name: "Vercel", slug: "vercel" },
  { name: "Cloudflare", slug: "cloudflare" },
  { name: "Google Cloud", slug: "googlecloud" },
  { name: "Figma", slug: "figma" },
  { name: "GitHub", slug: "github" },
];

const ROW_2 = [
  { name: "n8n", slug: "n8n" },
  { name: "Make", slug: "make" },
  { name: "Zapier", slug: "zapier" },
  { name: "Claude", slug: "claude" },
  { name: "Anthropic", slug: "anthropic" },
  { name: "Gemini", slug: "googlegemini" },
  { name: "Mistral AI", slug: "mistralai" },
  { name: "Hugging Face", slug: "huggingface" },
  { name: "LangChain", slug: "langchain" },
  { name: "Ollama", slug: "ollama" },
  { name: "PyTorch", slug: "pytorch" },
  { name: "TensorFlow", slug: "tensorflow" },
  { name: "scikit-learn", slug: "scikitlearn" },
  { name: "Python", slug: "python" },
  { name: "Airtable", slug: "airtable" },
  { name: "HubSpot", slug: "hubspot" },
  { name: "Notion", slug: "notion" },
  { name: "WhatsApp", slug: "whatsapp" },
  { name: "Telegram", slug: "telegram" },
  { name: "Shopify", slug: "shopify" },
  { name: "WordPress", slug: "wordpress" },
  { name: "Webflow", slug: "webflow" },
];

export function TechMarquee() {
  return (
    <section
      className="kuru-tools border-y border-white/5 bg-black"
      aria-label="Tools and platforms we build with"
    >
      {/* Row 1 (Leftward scroll) */}
      <div className="kuru-tools-row">
        <ul className="kuru-tools-track">
          {ROW_1.map((tool) => (
            <li key={tool.name} className="kuru-tool group cursor-default">
              <ToolIcon slug={tool.slug} size={20} className="text-white/70 group-hover:text-accent transition-colors" />
              <span className="font-medium text-white/80 group-hover:text-white transition-colors">
                {tool.name}
              </span>
            </li>
          ))}
        </ul>
        <ul className="kuru-tools-track" aria-hidden="true">
          {ROW_1.map((tool) => (
            <li key={`${tool.name}-dup`} className="kuru-tool group cursor-default">
              <ToolIcon slug={tool.slug} size={20} className="text-white/70 group-hover:text-accent transition-colors" />
              <span className="font-medium text-white/80 group-hover:text-white transition-colors">
                {tool.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Row 2 (Reverse rightward scroll) */}
      <div className="kuru-tools-row is-reverse">
        <ul className="kuru-tools-track">
          {ROW_2.map((tool) => (
            <li key={tool.name} className="kuru-tool group cursor-default">
              <ToolIcon slug={tool.slug} size={20} className="text-white/70 group-hover:text-accent transition-colors" />
              <span className="font-medium text-white/80 group-hover:text-white transition-colors">
                {tool.name}
              </span>
            </li>
          ))}
        </ul>
        <ul className="kuru-tools-track" aria-hidden="true">
          {ROW_2.map((tool) => (
            <li key={`${tool.name}-dup`} className="kuru-tool group cursor-default">
              <ToolIcon slug={tool.slug} size={20} className="text-white/70 group-hover:text-accent transition-colors" />
              <span className="font-medium text-white/80 group-hover:text-white transition-colors">
                {tool.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
