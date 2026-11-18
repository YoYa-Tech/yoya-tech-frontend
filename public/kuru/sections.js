// Owned home sections. Each is placed in front of the retained block it replaces
// (styles.css hides that block only once the owned one is in place), or in front
// of the section it precedes. experience.js waits for React to hydrate each anchor.
import {
  CAPABILITIES,
  DIVISIONS,
  PLATFORMS,
  SERVICES,
  TOOLS,
  icon,
  serviceHref,
  toolMark,
} from "/kuru/data.js?v=57d7b931e97a";

const OUTCOMES = [
  [
    "rocket",
    "Launch new products and platforms",
    "From first idea to launch day, with strategy, design and engineering in one team.",
  ],
  [
    "workflow",
    "Streamline operations and workflows",
    "Map how work moves through the business and take out the steps that slow it down.",
  ],
  [
    "bot",
    "Automate repetitive business processes",
    "Hand routine tasks to automations and AI, so people spend their time on the work that matters.",
  ],
  [
    "server",
    "Build scalable digital infrastructure",
    "Platforms, data and integrations that keep up with growth without a rebuild.",
  ],
  [
    "window",
    "Improve digital presence and customer experience",
    "Websites and customer touchpoints that are fast, clear and easy to use.",
  ],
  [
    "blocks",
    "Transform ideas into reliable systems",
    "Turn plans on paper into dependable software that runs every day.",
  ],
];

const REASONS = [
  ["Business-first thinking", "We start from the outcome your business needs."],
  ["Clear communication", "Plain updates and honest timelines at every stage."],
  ["Scalable, maintainable work", "Built to grow and stay easy to change."],
  ["End-to-end execution", "Strategy to launch, from one team."],
  ["Long-term partnership", "We stay to support and improve what we built."],
];

const pad = (n) => String(n).padStart(2, "0");
const clamp = (value) => Math.max(0, Math.min(1, value));
export const fragment = (html) => {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
};
const owned = (tag, attributes, body) =>
  fragment(`<${tag} data-kuru-owned ${attributes}>${body}</${tag}>`);

function toolsSection() {
  const row = (tools, reverse) => {
    const items = tools
      .map(([name, slug]) => `<li class="kuru-tool">${toolMark(slug)}<span>${name}</span></li>`)
      .join("");
    return `<div class="kuru-tools-row${reverse ? " is-reverse" : ""}"><ul class="kuru-tools-track">${items}</ul><ul class="kuru-tools-track" aria-hidden="true">${items}</ul></div>`;
  };
  return owned(
    "section",
    'class="kuru-tools" aria-label="Tools and platforms we build with"',
    TOOLS.map((tools, index) => row(tools, index === 1)).join(""),
  );
}

function servicesGrid() {
  const division = Object.fromEntries(DIVISIONS.map((item) => [item.id, item.short]));
  return owned(
    "ul",
    'class="kuru-svc-grid"',
    SERVICES.map(
      (service) =>
        `<li><a class="kuru-svc" href="${serviceHref(service)}"><span class="kuru-svc-division">${division[service.division]}</span><span class="kuru-svc-icon">${icon(service.icon)}</span><span class="kuru-svc-name">${service.name}</span></a></li>`,
    ).join(""),
  );
}

function platformsGrid() {
  return owned(
    "ul",
    'class="kuru-platforms" aria-label="Platforms we build on"',
    PLATFORMS.map(
      ([name, slug]) => `<li title="${name}">${toolMark(slug)}<span>${name}</span></li>`,
    ).join(""),
  );
}

function capabilitiesBand() {
  const items = CAPABILITIES.map((item) => `<li>${item}</li>`).join("");
  return owned(
    "section",
    'class="kuru-band" aria-label="What YoYa Tech does"',
    `<div class="kuru-band-track"><ul>${items}</ul><ul aria-hidden="true">${items}</ul></div>`,
  );
}

function outcomesSection() {
  const rows = OUTCOMES.map(
    ([name, title, text], index) =>
      `<li class="kuru-outcome"><span class="kuru-outcome-index">${pad(index + 1)}</span><span class="kuru-outcome-icon">${icon(name)}</span><div><h3>${title}</h3><p>${text}</p></div></li>`,
  ).join("");
  return owned(
    "section",
    'class="kuru-outcomes" aria-labelledby="kuru-outcomes-heading"',
    `<div class="kuru-wrap kuru-outcomes-grid">
      <div class="kuru-outcomes-intro">
        <h2 id="kuru-outcomes-heading" class="kuru-h2">What we help businesses <span class="kuru-accent kuru-ink">achieve</span></h2>
        <p class="kuru-lead">From customer-facing platforms to internal workflows, we design and build solutions that remove friction and unlock opportunities.</p>
        <a class="kuru-text-link" href="/about-us">More about YoYa Tech ${icon("arrow")}</a>
      </div>
      <ol class="kuru-outcomes-list">${rows}</ol>
    </div>`,
  );
}

function pricingSection() {
  const cards = DIVISIONS.map((division, index) => {
    const tiers = division.tiers
      .map(
        ([name, price, text, href, per = ""]) =>
          `<li><a class="kuru-tier" href="${href}"><span class="kuru-tier-name">${name}</span><span class="kuru-tier-text">${text}</span><span class="kuru-tier-price"><small>from</small>${price}${per ? `<small>${per}</small>` : ""}</span></a></li>`,
      )
      .join("");
    return `<article class="kuru-division" id="pricing-${division.id}" style="--i:${index}" aria-labelledby="kuru-division-${index}">
      <div class="kuru-division-card">
        <div class="kuru-division-head">
          <p class="kuru-division-index">${pad(index + 1)} <span>/ ${pad(DIVISIONS.length)}</span></p>
          <h3 id="kuru-division-${index}" class="kuru-division-name">${division.name}</h3>
          <p class="kuru-division-summary">${division.summary}</p>
          <p class="kuru-division-note">${division.note}</p>
          <a class="kuru-button" href="/contact">Start a project</a>
        </div>
        <div class="kuru-division-body"><ul class="kuru-tiers">${tiers}</ul></div>
        <span class="kuru-division-numeral" aria-hidden="true">${pad(index + 1)}</span>
      </div>
    </article>`;
  }).join("");
  return owned(
    "section",
    'class="kuru-pricing" aria-labelledby="kuru-pricing-heading"',
    `<div class="kuru-wrap">
      <div class="kuru-pricing-intro">
        <h2 id="kuru-pricing-heading" class="kuru-h2">Pricing</h2>
        <p class="kuru-lead">Four divisions, one team. Every price is a starting point in US dollars, and each project is quoted on its actual scope before work begins.</p>
      </div>
      <div class="kuru-stack">${cards}</div>
    </div>`,
  );
}

function closingSection() {
  const reasons = REASONS.map(
    ([title, text], index) =>
      `<li><span class="kuru-reason-index">${pad(index + 1)}</span><h3>${title}</h3><p>${text}</p></li>`,
  ).join("");
  return owned(
    "section",
    'class="kuru-closing" aria-labelledby="kuru-closing-heading"',
    `<div class="kuru-closing-ripple" aria-hidden="true"><canvas data-kuru-ripple></canvas></div>
    <div class="kuru-wrap kuru-closing-inner">
      <h2 id="kuru-closing-heading" class="kuru-closing-statement">
        <span class="kuru-closing-line kuru-closing-muted">We don’t just deliver projects.</span>
        <span class="kuru-closing-line">We build <span class="kuru-accent kuru-ink">beyond limits</span></span>
      </h2>
      <div class="kuru-closing-actions">
        <a class="kuru-button" href="/contact">Start a project</a>
        <a class="kuru-button kuru-button-quiet" href="/works">See our work</a>
      </div>
      <div class="kuru-reasons">
        <p class="kuru-reasons-title">Why clients work with YoYa Tech</p>
        <ul>${reasons}</ul>
      </div>
    </div>`,
  );
}

/**
 * Where each owned element goes: in front of the retained element it names. Every
 * lookup skips owned elements, or an owned copy would be found and moved forever.
 */
export function homeAnchors() {
  const retained = ":not([data-kuru-owned])";
  const platformCard = document.querySelector('[class*="min-h-[294px]"]:has(> h3)');
  return {
    tools: document.querySelector(
      `section[aria-label="Tools and platforms we build with"]${retained}`,
    ),
    outcomes: document.querySelector('section[aria-labelledby="intro-heading"]'),
    services: document.querySelector("ul.svc-grid"),
    platforms: platformCard?.parentElement?.querySelector(`:scope > ul${retained}`) ?? null,
    band: document.querySelector("section.bg-surface:has(.vv-marquee-track)"),
    pricing: document.getElementById("pricing"),
    closing: document.getElementById("faqs"),
  };
}

export function createHomeSections() {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const elements = {
    tools: toolsSection(),
    outcomes: outcomesSection(),
    services: servicesGrid(),
    platforms: platformsGrid(),
    band: capabilitiesBand(),
    pricing: pricingSection(),
    closing: closingSection(),
  };
  const { pricing, outcomes, closing } = elements;
  const cards = [...pricing.querySelectorAll(".kuru-division")];
  const rows = [...outcomes.querySelectorAll(".kuru-outcome")];
  let mounted = false,
    frame = 0,
    stackInView = false,
    stackTop = 112;

  // Stacked divisions: each arriving card pushes the ones beneath it back a little.
  function renderStack() {
    frame = 0;
    if (!stackInView || reduced || innerWidth < 768) return;
    const arrived = cards.map((card, index) => {
      if (!index) return 0;
      const distance = card.getBoundingClientRect().top - (stackTop + index * 20);
      return clamp(1 - distance / (innerHeight * 0.7));
    });
    cards.forEach((card, index) => {
      const depth = arrived.slice(index + 1).reduce((sum, value) => sum + value, 0);
      card.style.setProperty("--depth", depth.toFixed(3));
    });
  }
  function schedule() {
    if (!frame && stackInView) frame = requestAnimationFrame(renderStack);
  }
  function measure() {
    stackTop = parseFloat(getComputedStyle(pricing).getPropertyValue("--kuru-stack-top")) || 112;
    schedule();
  }
  const stackObserver = new IntersectionObserver((entries) => {
    stackInView = entries[entries.length - 1].isIntersecting;
    schedule();
  });
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        }
    },
    { rootMargin: "0px 0px -12% 0px" },
  );
  // The outcome nearest the middle of the screen leads.
  const focusObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        entry.target.toggleAttribute("data-active", entry.isIntersecting);
    },
    { rootMargin: "-47% 0px -47% 0px" },
  );

  return {
    elements: Object.values(elements),
    /** Place every element whose anchor exists; true when anything moved. */
    place(anchors) {
      let moved = false;
      for (const [key, element] of Object.entries(elements)) {
        const anchor = anchors[key];
        if (!anchor || anchor === element || anchor.previousElementSibling === element) continue;
        anchor.before(element);
        moved = true;
      }
      return moved;
    },
    mount() {
      if (mounted) return;
      mounted = true;
      if (reduced) {
        for (const node of [...rows, ...cards, closing]) node.classList.add("is-in");
        rows.forEach((row) => row.setAttribute("data-active", ""));
        return;
      }
      for (const node of [...rows, ...cards, closing]) revealObserver.observe(node);
      rows.forEach((row) => focusObserver.observe(row));
      stackObserver.observe(pricing);
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", measure, { passive: true });
      measure();
    },
    remove() {
      for (const element of Object.values(elements)) element.remove();
      this.dispose();
    },
    dispose() {
      if (!mounted) return;
      mounted = false;
      cancelAnimationFrame(frame);
      frame = 0;
      revealObserver.disconnect();
      focusObserver.disconnect();
      stackObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
    },
  };
}
