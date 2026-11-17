"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RollingText } from "@/components/ui/rolling-text";
import { Sun, Moon, Menu, X, ArrowRight } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "h-[70px] bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "h-[77px] bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1355px] items-center justify-between px-6 sm:px-8">
        {/* Brand Logo with Official Green Monogram */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative h-6 w-6 transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/kuru/images/mark-green.svg"
              alt="Kuru Labs"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-display text-lg font-medium tracking-tight text-white group-hover:text-accent transition-colors">
            Kuru Labs
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-primary">
          <Link href="#hero" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="#works" className="hover:text-white transition-colors">
            Works
          </Link>
          <Link href="#services" className="hover:text-white transition-colors">
            Services
          </Link>
          <Link href="#approach" className="hover:text-white transition-colors">
            Approach
          </Link>
          <Link href="#faqs" className="hover:text-white transition-colors">
            About
          </Link>
        </nav>

        {/* Right Action Stack */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all hover:border-accent hover:text-accent"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Start Project CTA Pill */}
          <Button asChild size="sm" className="rounded-full px-5 py-2 font-medium">
            <Link href="#pricing">
              <RollingText text="Start a project" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-black/95 px-6 py-6 backdrop-blur-2xl">
          <nav className="flex flex-col gap-4 text-base font-medium text-text-primary">
            <Link
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-accent transition-colors"
            >
              Home
            </Link>
            <Link
              href="#works"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-accent transition-colors"
            >
              Works
            </Link>
            <Link
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-accent transition-colors"
            >
              Services
            </Link>
            <Link
              href="#approach"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-accent transition-colors"
            >
              Approach
            </Link>
            <Link
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-accent transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-accent transition-colors"
            >
              FAQ
            </Link>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-text-muted">Appearance</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-xs font-mono text-white/80"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </button>
            </div>

            <Button asChild className="mt-2 w-full rounded-full">
              <Link href="#pricing" onClick={() => setMobileMenuOpen(false)}>
                Start a project
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
