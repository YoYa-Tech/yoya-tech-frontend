// Kuru Labs content shared by the owned sections: what the agency does, how it is
// priced and what it builds with. Edit here and every section that lists it follows.

/** Line icons (Lucide paths, 24×24, stroke 1.5). */
export const ICON_PATHS = {
  rocket:
    '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  workflow:
    '<rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/>',
  bot: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2M20 14h2M15 13v2M9 13v2"/>',
  server:
    '<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 6h.01M6 18h.01"/>',
  window: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20M6 4v5M10 4v5"/>',
  blocks:
    '<rect width="7" height="7" x="14" y="3" rx="1"/><path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"/>',
  monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/>',
  dashboard:
    '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
  phone: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
  chart: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>',
  cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
  shapes:
    '<path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"/><rect x="3" y="14" width="7" height="7" rx="1"/><circle cx="17.5" cy="17.5" r="3.5"/>',
  plug: '<path d="M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>',
  wrench:
    '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  compass:
    '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/>',
  cpu: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
};
export const icon = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name]}</svg>`;

/** Tool marks come from one cached sprite; tools without a public mark get a glyph. */
export const toolMark = (slug) =>
  slug
    ? `<svg class="kuru-mark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><use href="/kuru/images/tools.svg?v=57d7b931e97a#${slug}"/></svg>`
    : icon("cpu");

export const DIVISIONS = [
  {
    id: "web",
    name: "Web & digital presence",
    short: "Web",
    summary:
      "Websites and online stores that carry your brand, load fast and turn visitors into customers.",
    note: "Starting points in US dollars",
    tiers: [
      [
        "Business website",
        "$800",
        "Three core pages designed from the ground up, on a CMS you run yourself.",
        "/services/crafted-websites",
      ],
      [
        "eCommerce store",
        "$1,500",
        "Catalogue, cart and checkout, with a dashboard you can actually run.",
        "/services/ecommerce-website-design",
      ],
      [
        "Custom build",
        "$3,000",
        "Multi-collection CMS, advanced motion and larger sites, scoped together first.",
        "/services/cms-and-dynamic-websites",
      ],
    ],
  },
  {
    id: "product-engineering",
    name: "Product engineering",
    short: "Product",
    summary:
      "Customer-facing platforms, web and mobile apps, and the infrastructure underneath them, built to scale.",
    note: "Starting points in US dollars, confirmed after a discovery call",
    tiers: [
      [
        "MVP launch",
        "$2,500",
        "A focused first version: core flows, accounts and an admin, ready for real users.",
        "/services#product-engineering",
      ],
      [
        "Mobile app",
        "$4,000",
        "iOS and Android from one codebase, connected to your backend and payments.",
        "/services#product-engineering",
      ],
      [
        "Web platform",
        "$6,000",
        "Portals, dashboards and SaaS products with roles, billing and integrations.",
        "/services#product-engineering",
      ],
    ],
  },
  {
    id: "automation-ai",
    name: "Automation & AI",
    short: "Automation & AI",
    summary:
      "Repetitive work handed to automations and AI, so your team spends its time on what matters.",
    note: "Starting points in US dollars, per workflow or assistant",
    tiers: [
      [
        "Workflow automation",
        "$400",
        "Connect your tools with n8n, Make or Zapier and take one process off your team’s plate.",
        "/services#automation-ai",
      ],
      [
        "AI assistant",
        "$1,200",
        "A chat assistant that answers from your own documents, on your site or WhatsApp.",
        "/services#automation-ai",
      ],
      [
        "AI agents & custom ML",
        "$3,000",
        "Agents that act across your systems, and models trained on your own data.",
        "/services#automation-ai",
      ],
    ],
  },
  {
    id: "partnership",
    name: "Partnership & support",
    short: "Partnership",
    summary:
      "A long-term technical partner for upkeep, steady improvement and new ideas after launch.",
    note: "Monthly plans in US dollars",
    tiers: [
      [
        "Care plan",
        "$150",
        "Updates, backups, monitoring and small fixes for one site or app.",
        "/services/maintenance-and-ongoing-support",
        "/mo",
      ],
      [
        "Growth plan",
        "$500",
        "Monthly hours for improvements, content, analytics and new automations.",
        "/services/maintenance-and-ongoing-support",
        "/mo",
      ],
      [
        "Dedicated capacity",
        "$1,500",
        "A part-time designer and engineer working inside your roadmap.",
        "/contact",
        "/mo",
      ],
    ],
  },
];

/** Every service, across divisions. `page` links to a full service page when one exists. */
export const SERVICES = [
  {
    name: "Websites & eCommerce",
    division: "web",
    icon: "monitor",
    page: "/services/crafted-websites",
    text: "Marketing sites and online stores, designed and built on a CMS you can run.",
  },
  {
    name: "UI/UX & brand identity",
    division: "web",
    icon: "shapes",
    page: "/services/consistent-identity",
    text: "Interfaces, design systems and identities that stay consistent everywhere.",
  },
  {
    name: "Web apps & platforms",
    from: "$2,500",
    division: "product-engineering",
    icon: "dashboard",
    text: "Portals, dashboards and SaaS products with accounts, roles and billing.",
    includes: [
      "Product strategy and MVP scoping",
      "Design systems and front end",
      "APIs, databases and admin panels",
    ],
  },
  {
    name: "Mobile apps",
    from: "$4,000",
    division: "product-engineering",
    icon: "phone",
    text: "iOS and Android apps from one codebase, connected to your backend.",
    includes: [
      "Flutter and React Native",
      "Payments, maps and notifications",
      "Store submission and updates",
    ],
  },
  {
    name: "Cloud & DevOps",
    division: "product-engineering",
    icon: "cloud",
    text: "Hosting, deployment pipelines and monitoring that keep products fast and online.",
    includes: [
      "Cloud setup on AWS, Google Cloud or Vercel",
      "CI/CD and automated backups",
      "Monitoring, logs and alerts",
    ],
  },
  {
    name: "Integrations & APIs",
    division: "product-engineering",
    icon: "plug",
    text: "Your CRM, payments, ERP and tools connected so data flows without copy-paste.",
    includes: [
      "Payment and CRM integrations",
      "Custom REST and webhook APIs",
      "Data migration and sync",
    ],
  },
  {
    name: "Workflow automation",
    from: "$400",
    division: "automation-ai",
    icon: "workflow",
    text: "Repetitive processes automated end to end with n8n, Make, Zapier or custom code.",
    includes: [
      "Process mapping and audit",
      "Lead, order and invoice flows",
      "Alerts on Slack, email or WhatsApp",
    ],
  },
  {
    name: "AI agents & assistants",
    from: "$1,200",
    division: "automation-ai",
    icon: "bot",
    text: "Assistants that answer from your knowledge, and agents that complete tasks across your tools.",
    includes: [
      "Support and sales assistants",
      "Document and email agents",
      "OpenAI, Claude and open models",
    ],
  },
  {
    name: "Data, analytics & ML",
    from: "$3,000",
    division: "automation-ai",
    icon: "chart",
    text: "Dashboards, reporting and machine learning models built on your own data.",
    includes: [
      "Dashboards and KPI reporting",
      "Forecasting and classification",
      "Data pipelines and cleaning",
    ],
  },
  {
    name: "Maintenance & support",
    division: "partnership",
    icon: "wrench",
    page: "/services/maintenance-and-ongoing-support",
    text: "Updates, monitoring and improvements, so what we built keeps getting better.",
  },
];

export const serviceHref = (service) => service.page ?? `/services#${service.division}`;

export const TOOLS = [
  [
    ["Next.js", "nextdotjs"],
    ["React", "react"],
    ["TypeScript", "typescript"],
    ["Node.js", "nodedotjs"],
    ["Tailwind CSS", "tailwindcss"],
    ["Flutter", "flutter"],
    ["Laravel", "laravel"],
    ["Django", "django"],
    ["FastAPI", "fastapi"],
    ["Supabase", "supabase"],
    ["PostgreSQL", "postgresql"],
    ["MongoDB", "mongodb"],
    ["Firebase", "firebase"],
    ["Prisma", "prisma"],
    ["Stripe", "stripe"],
    ["Shopify", "shopify"],
    ["WordPress", "wordpress"],
    ["Webflow", "webflow"],
    ["Framer", "framer"],
    ["Wix Studio", "wix"],
    ["Figma", "figma"],
    ["Blender", "blender"],
    ["Docker", "docker"],
    ["Kubernetes", "kubernetes"],
    ["Vercel", "vercel"],
    ["Cloudflare", "cloudflare"],
    ["Google Cloud", "googlecloud"],
    ["AWS", null],
    ["DigitalOcean", "digitalocean"],
    ["GitHub", "github"],
  ],
  [
    ["n8n", "n8n"],
    ["Make", "make"],
    ["Zapier", "zapier"],
    ["OpenAI", null],
    ["Claude", "claude"],
    ["Anthropic", "anthropic"],
    ["Gemini", "googlegemini"],
    ["Mistral AI", "mistralai"],
    ["Hugging Face", "huggingface"],
    ["LangChain", "langchain"],
    ["Ollama", "ollama"],
    ["OpenClaw", null],
    ["Hermes Agent", null],
    ["PyTorch", "pytorch"],
    ["TensorFlow", "tensorflow"],
    ["scikit-learn", "scikitlearn"],
    ["Python", "python"],
    ["Jupyter", "jupyter"],
    ["pandas", "pandas"],
    ["Airtable", "airtable"],
    ["HubSpot", "hubspot"],
    ["Notion", "notion"],
    ["Slack", null],
    ["WhatsApp", "whatsapp"],
    ["Telegram", "telegram"],
    ["Google Analytics", "googleanalytics"],
  ],
];

/** Platforms shown in the grid beside “Any stack, one standard”. */
export const PLATFORMS = [
  ["Webflow", "webflow"],
  ["WordPress", "wordpress"],
  ["Wix Studio", "wix"],
  ["Shopify", "shopify"],
  ["Framer", "framer"],
  ["Next.js", "nextdotjs"],
  ["React", "react"],
  ["Flutter", "flutter"],
  ["Node.js", "nodedotjs"],
  ["Python", "python"],
  ["Laravel", "laravel"],
  ["Supabase", "supabase"],
  ["PostgreSQL", "postgresql"],
  ["Docker", "docker"],
  ["Google Cloud", "googlecloud"],
  ["n8n", "n8n"],
  ["Hugging Face", "huggingface"],
  ["Claude", "claude"],
];

/** The capabilities band under the services grid. */
export const CAPABILITIES = [
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

export const PROCESS = [
  ["Discover", "Goals, users and how the business runs today, mapped before anything is built."],
  ["Design", "Flows, interfaces and system architecture, agreed with you step by step."],
  ["Build", "Clean, tested code across web, mobile, data and infrastructure."],
  ["Automate", "Repetitive work handed to automations and AI agents where it pays off."],
  ["Launch & support", "Documented hand-over, monitoring and steady improvement after go-live."],
];
