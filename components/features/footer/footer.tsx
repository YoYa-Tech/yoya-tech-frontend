import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 bg-black pt-24 pb-16 text-text-primary border-t border-white/10">
      <div className="mx-auto max-w-[1355px] px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative h-7 w-7 transition-transform group-hover:scale-110">
                <Image
                  src="/kuru/images/mark-green.svg"
                  alt="Kuru Labs"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-display text-xl font-medium tracking-tight text-white group-hover:text-accent transition-colors">
                Kuru Labs
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-text-muted max-w-sm">
              A software, web, automation and AI studio in Addis Ababa, Ethiopia. Engineering scalable systems for ambitious businesses worldwide.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-accent">
              <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
              <span>ADDIS ABABA (UTC+3) · ACTIVE DISPATCH</span>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Services */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-wider text-white">Services</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <Link href="#services" className="hover:text-accent transition-colors">
                    Websites & eCommerce
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-accent transition-colors">
                    Product Engineering
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-accent transition-colors">
                    Automation & AI
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-accent transition-colors">
                    Maintenance & Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Works & Case Studies */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-wider text-white">Works</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <Link href="#works" className="hover:text-accent transition-colors">
                    Meridian Timepieces
                  </Link>
                </li>
                <li>
                  <Link href="#works" className="hover:text-accent transition-colors">
                    Tarn Cash Forecast
                  </Link>
                </li>
                <li>
                  <Link href="#works" className="hover:text-accent transition-colors">
                    HealthCore Clinical
                  </Link>
                </li>
                <li>
                  <Link href="#works" className="hover:text-accent transition-colors">
                    Norholm Architecture
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-wider text-white">Company</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <Link href="#approach" className="hover:text-accent transition-colors">
                    Our Approach
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-accent transition-colors">
                    Transparent Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="hover:text-accent transition-colors">
                    Client Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#faqs" className="hover:text-accent transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect & Social */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-wider text-white">Connect</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-accent transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-accent transition-colors"
                  >
                    <span>Twitter / X</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/251911000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-accent transition-colors"
                  >
                    <span>WhatsApp</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-accent transition-colors"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Legal Notice */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div>
            © 2026 Kuru Labs. All rights reserved.
          </div>
          <div>
            A software, web, automation and AI company in Addis Ababa, Ethiopia.
          </div>
        </div>
      </div>
    </footer>
  );
}
