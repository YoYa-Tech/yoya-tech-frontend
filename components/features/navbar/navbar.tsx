"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";
import { RollingText } from "@/components/ui/rolling-text";

interface NavItem {
  label: string;
  href: string;
}

const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "Works", href: "#works" },
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "About", href: "#faqs" },
];

function ThemeSwitch({
  className = "",
  isOverHero = false,
}: {
  className?: string;
  isOverHero?: boolean;
}) {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");
  const [mounted, setMounted] = React.useState(false);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const isTransitioningRef = React.useRef(false);

  React.useEffect(() => {
    setMounted(true);
    const syncTheme = () => {
      const current = document.documentElement.getAttribute("data-theme") as "dark" | "light" | null;
      if (current && (current === "dark" || current === "light")) {
        setTheme(current);
      }
    };
    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = React.useCallback(() => {
    if (isTransitioningRef.current) return;
    const currentTheme =
      (typeof document !== "undefined" &&
        (document.documentElement.getAttribute("data-theme") as "dark" | "light" | null)) ||
      theme;
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    const applyTheme = () => {
      document.documentElement.setAttribute("data-theme", nextTheme);
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
      document.documentElement.classList.toggle("light", nextTheme === "light");
      setTheme(nextTheme);
      try {
        localStorage.setItem("vv-theme", nextTheme);
      } catch { }
    };

    const startVT = (document as unknown as { startViewTransition?: (cb: () => void) => { finished: Promise<void>; ready: Promise<void> } }).startViewTransition?.bind(document);
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!startVT || prefersReducedMotion) {
      applyTheme();
      return;
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rect = btnRef.current?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width / 2 : vw / 2;
    const cy = rect ? rect.top + rect.height / 2 : vh / 2;
    const maxRadius = Math.hypot(Math.max(cx, vw - cx), Math.max(cy, vh - cy));
    const toPct = (val: number, total: number) => `${(val / total) * 100}%`;
    const radiusPct = `${(maxRadius / (Math.hypot(vw, vh) / Math.SQRT2)) * 100}%`;
    const centerPos = `${toPct(cx, vw)} ${toPct(cy, vh)}`;
    const clipFrom = `circle(0% at ${centerPos})`;
    const clipTo = `circle(${radiusPct} at ${centerPos})`;

    const docEl = document.documentElement;
    isTransitioningRef.current = true;
    docEl.dataset.vvThemeVt = "active";
    docEl.style.setProperty("--vv-theme-clip-from", clipFrom);

    const transition = startVT(() => {
      applyTheme();
    });

    transition.finished
      .finally(() => {
        isTransitioningRef.current = false;
        delete docEl.dataset.vvThemeVt;
        docEl.style.removeProperty("--vv-theme-clip-from");
      })
      .catch(() => { });

    transition.ready
      .then(() => {
        docEl.animate(
          { clipPath: [clipFrom, clipTo] },
          {
            duration: 480,
            easing: "ease-in-out",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => { });
  }, [theme]);

  const effectiveTheme = mounted ? theme : "dark";

  return (
    <button
      ref={btnRef}
      onClick={toggleTheme}
      type="button"
      role="switch"
      suppressHydrationWarning
      aria-checked={effectiveTheme === "light"}
      aria-label={`Switch to ${effectiveTheme === "dark" ? "light" : "dark"} mode`}
      className={`group relative inline-grid size-8 sm:size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ease-brand ${isOverHero
          ? "border-white/15 bg-white/5 text-white/80 hover:border-accent hover:text-accent hover:bg-white/10"
          : "border-line bg-surface/60 text-fg hover:border-accent hover:text-accent hover:bg-surface shadow-sm"
        } ${className}`}
    >
      <span className="sr-only" suppressHydrationWarning>
        {effectiveTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      </span>
      <Sun
        className="size-4 shrink-0 transition-transform duration-300 group-hover:rotate-45 hidden dark:block"
        strokeWidth={1.5}
      />
      <Moon
        className="size-4 shrink-0 transition-transform duration-300 group-hover:-rotate-12 block dark:hidden"
        strokeWidth={1.5}
      />
    </button>
  );
}

export function Navbar() {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isCompact, setIsCompact] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("hero");

  // Track active theme ("dark" or "light") to adapt logo & contrast
  React.useEffect(() => {
    const syncTheme = () => {
      const current = document.documentElement.getAttribute("data-theme") as "dark" | "light" | null;
      if (current === "dark" || current === "light") {
        setTheme(current);
      } else if (document.documentElement.classList.contains("dark")) {
        setTheme("dark");
      }
    };
    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });
    return () => observer.disconnect();
  }, []);

  // Scroll threshold check (> 24px)
  React.useEffect(() => {
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  // IntersectionObserver tracking #hero to morph into floating island dock
  React.useEffect(() => {
    const hero = document.getElementById("hero");
    if (hero && typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsCompact(!entry.isIntersecting);
        },
        { threshold: 0.15 }
      );
      observer.observe(hero);
      return () => observer.disconnect();
    }
    const fallback = () => setIsCompact(window.scrollY > 480);
    fallback();
    window.addEventListener("scroll", fallback, { passive: true });
    return () => window.removeEventListener("scroll", fallback);
  }, []);

  // Section observer to update active nav state
  React.useEffect(() => {
    const sectionIds = ["hero", "works", "services", "approach", "pricing", "faqs"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [mobileMenuOpen]);

  const isOverHero = !isCompact && !isScrolled;

  // The hero section is always dark (#020612), so while over the hero,
  // the logo text MUST be white (darkmodelogo.svg) regardless of light/dark theme.
  // The dark-text logo is only shown when scrolled past the hero in light mode (or when mobile menu drawer is open in light mode).
  const showDarkLogo = theme === "light" && (!isOverHero || mobileMenuOpen);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[200] border-b transition-[padding,background-color,border-color,backdrop-filter] duration-500 ease-brand motion-reduce:transition-none ${
          mobileMenuOpen
            ? "border-line bg-bg shadow-lg"
            : isScrolled && !isCompact
              ? "border-line bg-[var(--vv-nav-bg)] backdrop-blur-xl backdrop-saturate-150 shadow-sm"
              : isOverHero
                ? "border-white/10 bg-black/40 backdrop-blur-xl backdrop-saturate-150 shadow-sm min-[981px]:border-transparent min-[981px]:bg-transparent min-[981px]:backdrop-filter-none min-[981px]:shadow-none"
                : "border-line/40 bg-bg/85 backdrop-blur-xl backdrop-saturate-150 shadow-sm min-[981px]:border-transparent min-[981px]:bg-transparent min-[981px]:backdrop-filter-none min-[981px]:shadow-none"
        } ${
          isCompact
            ? "min-[981px]:border-transparent min-[981px]:bg-transparent min-[981px]:pt-5 min-[981px]:backdrop-filter-none min-[981px]:shadow-none"
            : ""
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-3.5 transition-[max-width,padding,background-color,border-radius,box-shadow,backdrop-filter] duration-500 ease-brand motion-reduce:transition-none min-[981px]:grid min-[981px]:max-w-[1380px] min-[981px]:grid-cols-[1fr_auto_1fr] min-[981px]:gap-5 min-[981px]:px-8 min-[981px]:py-4 ${
            isCompact
              ? "min-[981px]:max-w-[920px] min-[981px]:rounded-[8px] min-[981px]:bg-[var(--vv-nav-bg)] min-[981px]:px-3 min-[981px]:py-3 min-[981px]:ring-1 min-[981px]:ring-line min-[981px]:backdrop-blur-xl min-[981px]:backdrop-saturate-150 min-[981px]:shadow-2xl"
              : ""
          }`}
        >
          {/* Logo Column: Smooth Theme & Hero-Aware Transition */}
          <Link
            href="/"
            aria-label="YoYa Tech — Home"
            className={`flex items-center justify-self-start group shrink-0 transition-[padding] duration-500 ease-brand ${
              isCompact ? "min-[981px]:pl-2" : ""
            }`}
          >
            <div className="relative h-8 w-[102px] sm:h-9 sm:w-[118px] md:h-10 md:w-[132px] shrink-0 transition-transform duration-300 group-hover:scale-[1.03]">
              {/* White Text Logo (for dark backgrounds: hero section in any mode, or anywhere in dark mode) */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  showDarkLogo ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <Image
                  src="/yoya_tech_logos/SVG/darkmodelogo.svg"
                  alt="YoYa Tech"
                  fill
                  sizes="(max-width: 640px) 102px, (max-width: 768px) 118px, 132px"
                  className="object-contain object-left"
                  priority
                />
              </div>

              {/* Black Text Logo (only for light background: scrolled past hero in light mode) */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  showDarkLogo ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <Image
                  src="/yoya_tech_logos/SVG/lightmodelogo.svg"
                  alt="YoYa Tech"
                  fill
                  sizes="(max-width: 640px) 102px, (max-width: 768px) 118px, 132px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </div>
          </Link>

          {/* Desktop Primary Navigation */}
          <nav aria-label="Primary" className="hidden items-center gap-7 min-[981px]:flex justify-center">
            {NAV_LINKS.map((item) => {
              const targetId = item.href.replace("#", "");
              const isActive = activeSection === targetId;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[15px] tracking-[-0.01em] transition-colors ${
                    isOverHero
                      ? isActive
                        ? "font-medium text-white"
                        : "text-white/70 hover:text-white"
                      : isActive
                        ? "font-medium text-fg"
                        : "text-fg-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Column */}
          <div className="flex items-center gap-2 sm:gap-2.5 justify-self-end min-[981px]:gap-3.5">
            {/* Sun/Moon Theme Switch */}
            <ThemeSwitch isOverHero={isOverHero} />

            {/* Let's Connect CTA Pill */}
            <Link
              href="#pricing"
              className={`hidden xs:inline-flex h-8 sm:h-[36px] shrink-0 items-center rounded-full border border-transparent px-3 sm:px-4 text-xs sm:text-[13px] font-medium tracking-[-0.01em] whitespace-nowrap transition-all duration-300 min-[981px]:h-[36px] min-[981px]:px-[18px] ${
                isOverHero
                  ? "bg-white text-black hover:bg-white/90 shadow-sm"
                  : "bg-fg text-bg hover:bg-fg-strong shadow-sm"
              }`}
            >
              <RollingText text="Connect" className="min-[981px]:hidden" />
              <RollingText text="Let’s Connect" className="hidden min-[981px]:inline" />
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className={`grid size-9 sm:size-[40px] shrink-0 place-items-center rounded-full border transition-colors duration-300 ease-brand min-[981px]:hidden ${
                mobileMenuOpen
                  ? "border-fg bg-fg"
                  : isOverHero
                    ? "border-white/20 bg-white/10 text-white"
                    : "border-line-strong bg-surface text-fg"
              }`}
            >
              <span className="relative block h-[10px] w-4">
                <span
                  className={`absolute left-0 block h-[1.5px] w-full transition-[rotate,top,background-color] duration-[380ms] ease-brand motion-reduce:transition-none ${
                    mobileMenuOpen
                      ? "top-[4.25px] rotate-45 bg-bg"
                      : isOverHero
                        ? "top-0 bg-white"
                        : "top-0 bg-fg"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.5px] w-full transition-[rotate,top,background-color] duration-[380ms] ease-brand motion-reduce:transition-none ${
                    mobileMenuOpen
                      ? "top-[4.25px] -rotate-45 bg-bg"
                      : isOverHero
                        ? "top-[8.5px] bg-white"
                        : "top-[8.5px] bg-fg"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sliding Drawer Menu */}
      <div
        inert={!mobileMenuOpen}
        className={`fixed inset-0 z-[190] flex flex-col justify-between bg-bg/98 backdrop-blur-2xl px-6 pt-[78px] sm:pt-[90px] pb-8 transition-[clip-path] duration-[600ms] ease-brand min-[981px]:hidden ${
          mobileMenuOpen ? "[clip-path:inset(0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {NAV_LINKS.map((item, idx) => {
            const targetId = item.href.replace("#", "");
            const isActive = activeSection === targetId;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActive ? "page" : undefined}
                style={{ transitionDelay: mobileMenuOpen ? `${180 + 55 * idx}ms` : "0ms" }}
                className={`group flex items-baseline gap-4 border-b border-line py-[13px] transition-[opacity,translate,border-color] duration-[550ms] ease-brand motion-reduce:transition-none ${mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                  }`}
              >
                <span className="text-sm font-mono text-fg-muted/60">0{idx + 1}</span>
                <span className="font-display text-2xl font-medium tracking-tight text-fg group-hover:text-accent transition-colors">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-4 border-t border-line pt-6">
          <div className="flex items-center justify-between">
            <span className="text-xs text-fg-muted">Appearance</span>
            <ThemeSwitch />
          </div>
          <Link
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-fg text-center text-sm font-medium text-bg transition-colors hover:bg-fg-strong"
          >
            Start a project
          </Link>
        </div>
      </div>
    </>
  );
}
