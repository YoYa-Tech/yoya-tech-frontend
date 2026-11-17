"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { RollingText } from "@/components/ui/rolling-text";

interface ServiceItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const SERVICES: ServiceItem[] = [
  {
    name: "Crafted Websites",
    href: "#pricing-web",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 48 48" className="h-7 w-7 shrink-0 text-white transition-colors duration-300 group-hover:text-accent" fill="currentColor">
        <path d="M24 4c-.07 0-.15 0-.22.01-2.3.26-4.72 4.56-5.96 10.99h12.36c-1.24-6.43-3.66-10.73-5.96-10.99C24.15 4 24.07 4 24 4m-5.7.83C12.98 6.4 8.59 10.13 6.14 15h8.63c.7-4 1.89-7.62 3.53-10.17m11.4 0C31.34 7.38 32.53 11 33.23 15h8.63c-2.45-4.87-6.84-8.6-12.16-10.17M14.638 18.027a1.25 1.25 0 0 0-1.174 1.077l-.822 5.158-1.497-3.457a1.25 1.25 0 0 0-2.292 0l-1.497 3.457-.822-5.158a1.25 1.25 0 0 0-1.205-1.07 1.25 1.25 0 0 0-1.264 1.462l1.5 9.4a1.25 1.25 0 0 0 2.381.3L10 24.446l2.053 4.748a1.25 1.25 0 0 0 2.38-.299l1.5-9.4a1.25 1.25 0 0 0-1.294-1.469m14 0a1.25 1.25 0 0 0-1.174 1.077l-.822 5.158-1.497-3.457a1.25 1.25 0 0 0-2.292 0l-1.497 3.457-.822-5.158a1.25 1.25 0 0 0-1.205-1.07 1.25 1.25 0 0 0-1.264 1.462l1.5 9.4a1.25 1.25 0 0 0 2.381.3L24 24.446l2.053 4.748a1.25 1.25 0 0 0 2.38-.299l1.5-9.4a1.25 1.25 0 0 0-1.294-1.469m14 0a1.25 1.25 0 0 0-1.174 1.077l-.822 5.158-1.497-3.457a1.25 1.25 0 0 0-2.292 0l-1.497 3.457-.822-5.158a1.25 1.25 0 0 0-1.205-1.07 1.25 1.25 0 0 0-1.264 1.462l1.5 9.4a1.25 1.25 0 0 0 2.381.3L38 24.446l2.053 4.748a1.25 1.25 0 0 0 2.38-.299l1.5-9.4a1.25 1.25 0 0 0-1.294-1.469M6.14 33c2.45 4.87 6.84 8.6 12.16 10.17C16.66 40.62 15.47 37 14.77 33zm11.68 0c1.24 6.43 3.658 10.73 5.958 10.99.07.01.151.01.221.01s.15 0 .22-.01c2.3-.26 4.72-4.56 5.96-10.99zm15.41 0c-.7 4-1.892 7.62-3.532 10.17 5.32-1.57 9.71-5.3 12.16-10.17z" />
      </svg>
    ),
  },
  {
    name: "Website Redesign",
    href: "#pricing-web",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 shrink-0 text-white transition-colors duration-300 group-hover:text-accent" fill="currentColor">
        <path d="M20.94 3.06a2.76 2.76 0 0 0-3.89 0l-.83.83.53.63 2.78 2.78.52.54.9-.9a2.76 2.76 0 0 0 0-3.89Z" />
        <path d="m15.64 5.53-.48-.58-4.88 4.88c-.33.33-.51.77-.51 1.24v2.41c0 .41.34.75.75.75h2.41c.47 0 .91-.18 1.24-.51l4.82-4.82-.53-.56-2.81-2.81Z" />
        <path d="M12.93 15.74h-2.41c-1.24 0-2.25-1.01-2.25-2.25v-2.41c0-.87.34-1.69.95-2.3l3.52-3.52H6c-2.07 0-3.75 1.68-3.75 3.75v9c0 2.07 1.68 3.75 3.75 3.75h9c2.07 0 3.75-1.68 3.75-3.75v-6.74l-3.52 3.52c-.61.61-1.43.95-2.3.95" />
      </svg>
    ),
  },
  {
    name: "eCommerce Website Design",
    href: "#pricing-web",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 shrink-0 text-white transition-colors duration-300 group-hover:text-accent" fill="currentColor">
        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
      </svg>
    ),
  },
  {
    name: "CMS & Dynamic Websites",
    href: "#pricing-web",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 shrink-0 text-white transition-colors duration-300 group-hover:text-accent" fill="currentColor">
        <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
      </svg>
    ),
  },
  {
    name: "Landing Pages & Microsites",
    href: "#pricing-web",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 shrink-0 text-white transition-colors duration-300 group-hover:text-accent" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Consistent Identity",
    href: "#pricing-web",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 shrink-0 text-white transition-colors duration-300 group-hover:text-accent" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10" />
      </svg>
    ),
  },
  {
    name: "Motion & Interaction Design",
    href: "#pricing-product-engineering",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 shrink-0 text-white transition-colors duration-300 group-hover:text-accent" fill="currentColor">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    name: "UX Centric Strategy",
    href: "#pricing-product-engineering",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 shrink-0 text-white transition-colors duration-300 group-hover:text-accent" fill="currentColor">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
  {
    name: "Performance Optimization",
    href: "#pricing-product-engineering",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 shrink-0 text-white transition-colors duration-300 group-hover:text-accent" fill="currentColor">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    name: "Maintenance & Ongoing Support",
    href: "#pricing-partnership",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 shrink-0 text-white transition-colors duration-300 group-hover:text-accent" fill="currentColor">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
];

const PLATFORMS = [
  { name: "Webflow", logo: "/platforms/webflow.png" },
  { name: "WordPress", logo: "/platforms/wordpress.png" },
  { name: "Wix", logo: "/platforms/wix.png", partner: "/platforms/wix-partner.png" },
  { name: "Framer", logo: "/platforms/framer.png" },
  { name: "Hostinger", logo: "/platforms/hostinger.png" },
  { name: "Squarespace", logo: "/platforms/squarespace.png" },
  { name: "Shopify", logo: "/platforms/shopify.png" },
  { name: "Figma", logo: "/platforms/figma.png" },
];

export function ProcessPipeline() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-black py-[clamp(80px,10vw,136px)] border-t border-white/10"
    >
      <div className="mx-auto max-w-[1380px] px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-10">
          <h2
            id="services-heading"
            className="font-display text-[clamp(38px,4.6vw,64px)] leading-[1] font-medium tracking-[-0.05em] text-white"
          >
            From first idea
            <br />
            to systems that run
          </h2>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-medium text-black transition-all hover:bg-gray-light active:scale-[0.98]"
              href="#pricing"
            >
              <RollingText text="View all services" />
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 sm:px-6 py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-medium text-white transition-all hover:border-white/40 hover:bg-white/20 active:scale-[0.98]"
              href="#pricing"
            >
              <RollingText text="Start a project" />
            </Link>
          </div>
        </div>

        {/* 10 Services 5x2 Grid */}
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {SERVICES.map((service) => (
            <li key={service.name}>
              <Link
                href={service.href}
                className="group relative flex aspect-square flex-col items-center justify-center gap-4 overflow-hidden rounded-[12px] border border-white/10 bg-[#121214] p-4 text-center transition-all duration-300 hover:border-accent/40 hover:bg-[#18181c]"
              >
                {/* Subtle Hover Radial Gradient */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-radial-gradient from-accent/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="relative z-10 flex flex-col items-center gap-3">
                  {service.icon}
                  <span className="text-sm sm:text-base font-medium leading-[1.3] text-text-muted transition-colors duration-300 group-hover:text-white">
                    {service.name}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Any stack. One standard. & Platforms 2-column Bento Grid */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {/* Left Card: Starfield Video Banner */}
          <div className="relative isolate min-h-[294px] overflow-hidden rounded-[12px] border border-white/10 p-8 md:p-[45px] flex flex-col justify-between">
            {/* Background Starfield Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            >
              <source src="/platform-starfield.mp4" type="video/mp4" />
            </video>
            {/* Dark wash for optimal text contrast */}
            <div className="absolute inset-0 -z-10 bg-black/40" />

            <div>
              <h3 className="font-display text-[clamp(28px,2.6vw,36px)] leading-[1.1] font-medium tracking-[-0.04em] text-white">
                Any stack.
                <br />
                One standard.
              </h3>
              <p className="mt-3 max-w-[568px] text-base leading-[1.6] text-white/75">
                Web, mobile, cloud, automation or AI, our work stays{" "}
                <span className="text-white font-medium">consistent, documented, secure</span> and built to perform.
              </p>
            </div>

            <div className="pt-5">
              <Link
                href="#works"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 sm:px-6 py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-medium text-white transition-all hover:border-white/40 hover:bg-white/20 active:scale-[0.98]"
              >
                <RollingText text="See our work" />
              </Link>
            </div>
          </div>

          {/* Right Card: 4x2 Platform Logos Grid */}
          <ul className="grid grid-cols-4 grid-rows-2 gap-px overflow-hidden rounded-[12px] border border-white/10 bg-white/10 sm:min-h-[294px]">
            {PLATFORMS.map((platform) => (
              <li
                key={platform.name}
                className="group/cell relative grid aspect-square sm:aspect-auto place-items-center bg-[#0d0d0f] hover:bg-[#141416] p-4 transition-colors"
              >
                <div className="relative size-[34px] sm:size-[50px]">
                  <Image
                    src={platform.logo}
                    alt={platform.name}
                    fill
                    className="object-contain opacity-75 transition-opacity duration-300 group-hover/cell:opacity-100"
                  />
                </div>

                {/* Overlaid Partner Badge for Wix */}
                {platform.partner && (
                  <div className="absolute right-2 bottom-1 sm:right-3 sm:bottom-2 size-[32px] sm:size-[44px] origin-center rotate-[25deg] transition-transform duration-300 group-hover/cell:scale-125 group-hover/cell:rotate-0">
                    <Image
                      src={platform.partner}
                      alt={`${platform.name} Partner`}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
