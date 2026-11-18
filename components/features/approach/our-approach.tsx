"use client";

import * as React from "react";
import Image from "next/image";

const DISCOVERY_CARDS = [
  { name: "agency", src: "/kuru/showcase/discovery-tarn.webp" },
  { name: "lumora", src: "/kuru/showcase/discovery-board.webp" },
  { name: "watches", src: "/kuru/showcase/discovery-meridian.webp" },
  { name: "greenearth", src: "/approach/guardianvets.jpg" },
  { name: "guardianvets", src: "/kuru/showcase/discovery-health.webp" },
];

const HANDOVER_DOCS = [
  { title: "Store admin guide", date: "27 October 2026", img: "/kuru/showcase/ws-meridian.webp" },
  { title: "Content editing handbook", date: "26 October 2026", img: "/kuru/showcase/ws-tarn.webp" },
  { title: "Lead routing runbook", date: "10 July 2026", img: "/kuru/showcase/cover-flow.webp" },
  { title: "Support agent playbook", date: "27 June 2026", img: "/kuru/showcase/cover-agent.webp" },
  { title: "API reference", date: "31 May 2026", img: "/kuru/showcase/cover-analytics.webp" },
  { title: "Analytics dashboard guide", date: "10 January 2026", img: "/kuru/showcase/ws-health.webp" },
  { title: "Launch checklist", date: "1 February 2025", img: "/kuru/showcase/cover-norholm.webp" },
];

export function OurApproach() {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  // Live scroll-linked progress state (GSAP equivalent)
  const [scrollProgress, setScrollProgress] = React.useState(0);

  // Live clock dial rotation angles
  const [secondsDeg, setSecondsDeg] = React.useState(0);
  const [minutesDeg, setMinutesDeg] = React.useState(0);
  const [hoursDeg, setHoursDeg] = React.useState(0);

  // Clock interval
  React.useEffect(() => {
    function updateClock() {
      const now = new Date();
      const ms = now.getMilliseconds();
      const sec = now.getSeconds() + ms / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr = (now.getHours() % 12) + min / 60;
      setSecondsDeg(sec * 6);
      setMinutesDeg(min * 6);
      setHoursDeg(hr * 30);
    }

    const interval = setInterval(updateClock, 50);
    updateClock();
    return () => clearInterval(interval);
  }, []);

  // Scroll parallax listener
  React.useEffect(() => {
    let frame = 0;

    function onScroll() {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Progress from 0 (entering viewport) to 1 (leaving viewport)
      const totalDist = windowH + rect.height;
      const currentDist = windowH - rect.top;
      const p = Math.max(0, Math.min(1, currentDist / totalDist));
      setScrollProgress(p);
    }

    function schedule() {
      if (!frame) {
        frame = requestAnimationFrame(onScroll);
      }
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Parallax calculations matching smooth GSAP values
  // Card 1: x from 210px to -210px
  const discoveryX = 210 - scrollProgress * 420;
  // Card 3: laptop tilt from -19deg to 0deg as it scrolls in
  const laptopRotateX = -19 * (1 - Math.min(1, scrollProgress * 1.8));
  // Card 4: Alex cursor following Y movement
  const cursorY = (scrollProgress - 0.5) * 50;

  return (
    <section
      id="approach"
      ref={sectionRef}
      aria-labelledby="approach-heading"
      className="relative z-10 bg-bg-canvas text-text-secondary py-28 sm:py-36 border-b border-border"
    >
      <div className="mx-auto max-w-[1380px] px-6 md:px-8">
        {/* Section Header */}
        <div>
          <h2
            id="approach-heading"
            className="font-display text-[clamp(38px,4.6vw,64px)] leading-[1] font-medium tracking-tight text-text-secondary"
          >
            Our Approach
          </h2>
          <p className="mt-2 text-sm sm:text-base leading-[1.6] text-text-muted lg:mt-3 max-w-2xl">
            <span>We begin by </span>
            <span className="text-text-secondary font-medium">defining clear goals,</span>
            <span> understanding your users and mapping how your business runs before anything is built.</span>
          </p>
        </div>

        {/* 3-Row Asymmetric Bento Grid */}
        <div className="mt-12 space-y-5">
          {/* ================= ROW 1 ================= */}
          <div className="grid gap-5 min-[751px]:grid-cols-[775fr_540fr] lg:h-[593px]">
            {/* Card 1: Discovery first (Wide) with Scroll Parallax */}
            <article className="relative isolate overflow-hidden rounded-[12px] border border-border bg-bg-surface min-h-[353px] lg:min-h-0 flex flex-col justify-between">
              <div className="relative z-10 px-5 py-8 lg:px-9 lg:pt-[45px] lg:pb-0">
                <h3 className="font-display text-[clamp(24px,2.6vw,36px)] leading-[1.1] font-medium tracking-tight text-text-secondary">
                  Discovery first
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-[1.6] text-text-muted lg:mt-3">
                  <span>We begin by </span>
                  <span className="text-text-secondary font-medium">defining clear goals,</span>
                  <span> understanding your users and mapping how your business runs before anything is built.</span>
                </p>
              </div>

              {/* Parallax sliding discovery boards: translates from 210 to -210 on scroll */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-[168px] left-[-150px] origin-top-left scale-[0.5] lg:top-[219px] lg:left-[-472px] lg:scale-100"
              >
                <div
                  className="flex will-change-transform"
                  style={{
                    gap: "20px",
                    transform: `translateX(${discoveryX}px)`,
                    transition: "transform 80ms linear",
                  }}
                >
                  {DISCOVERY_CARDS.map((card) => (
                    <div
                      key={card.name}
                      className="shrink-0 overflow-hidden rounded-[7px] bg-black"
                      style={{
                        width: 524,
                        height: 524,
                        boxShadow: "0 6px 12px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {/* macOS Window Titlebar */}
                      <div className="flex items-center gap-[5px] pl-[10px]" style={{ height: 18 }}>
                        <span className="size-[7px] rounded-full bg-[#ff5f57]" />
                        <span className="size-[7px] rounded-full bg-[#febc2e]" />
                        <span className="size-[7px] rounded-full bg-[#28c840]" />
                      </div>
                      <img
                        src={card.src}
                        alt=""
                        width={524}
                        height={506}
                        loading="lazy"
                        decoding="async"
                        className="block w-full object-cover object-top"
                        style={{ height: 506 }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* Card 2: Design around people (Narrow) - Zero Cropping, Full Phone Bezels */}
            <article className="relative isolate overflow-hidden rounded-[12px] border border-border bg-bg-surface min-h-[391px] lg:min-h-0">
              <div className="vv-art-mobile absolute inset-0 pointer-events-none opacity-80 dark:opacity-60" aria-hidden="true" />

              <div className="relative z-10 px-5 py-8 lg:px-9 lg:pt-[45px] lg:pb-0">
                <h3 className="font-display text-[clamp(24px,2.6vw,36px)] leading-[1.1] font-medium tracking-tight text-text-secondary">
                  Design around people
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-[1.6] text-text-muted lg:mt-3">
                  <span>Every screen, flow and dashboard is designed for </span>
                  <span className="text-text-secondary font-medium">the people who use it,</span>
                  <span> on any device.</span>
                </p>
              </div>

              {/* Exact uncropped floating phones directly inside card */}
              <img
                src="/kuru/showcase/phone-meridian.webp"
                alt="Meridian Phone View"
                className="vv-breathe pointer-events-none absolute top-[131px] left-[45.3%] w-[50%] lg:top-[170px]"
                style={{ animationDuration: "5s" }}
                loading="lazy"
                decoding="async"
              />
              <img
                src="/approach/phone-b.webp"
                alt="Mobile Experience"
                className="vv-breathe pointer-events-none absolute top-[142px] left-[5%] w-[52.6%] lg:top-[214px]"
                style={{ animationDuration: "6s" }}
                loading="lazy"
                decoding="async"
              />
            </article>
          </div>

          {/* ================= ROW 2 ================= */}
          <div className="grid gap-5 min-[751px]:grid-cols-[540fr_775fr] lg:h-[650px]">
            {/* Card 3: Built to convert (Narrow) with 3D Tilt on Scroll */}
            <article className="relative isolate overflow-hidden rounded-[12px] border border-border bg-bg-surface min-h-[398px] lg:min-h-0 flex flex-col justify-between">
              <div className="vv-art-conversion absolute inset-0 pointer-events-none opacity-80 dark:opacity-60" aria-hidden="true" />

              <div className="relative z-10 px-5 py-8 lg:px-9 lg:pt-[45px] lg:pb-0">
                <h3 className="font-display text-[clamp(24px,2.6vw,36px)] leading-[1.1] font-medium tracking-tight text-text-secondary">
                  Built to convert
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-[1.6] text-text-muted lg:mt-3">
                  <span>Products and sites built with strategy, designed to engage, and crafted to turn </span>
                  <span className="text-text-secondary font-medium">visitors into customers.</span>
                </p>
              </div>

              {/* Exact 3D Perspective Laptop Visual with Scroll Tilt */}
              <div className="absolute inset-0 origin-top-left translate-x-[24px] translate-y-[18px] scale-[0.584] lg:translate-x-0 lg:translate-y-0 lg:scale-100">
                <div className="group/laptop pointer-events-none absolute inset-0">
                  <div
                    className="absolute"
                    style={{ left: -9, top: 201, width: 719, height: 421, perspective: "900px" }}
                  >
                    <div
                      className="absolute inset-0 will-change-transform"
                      style={{
                        transformOrigin: "50% 100%",
                        transform: `rotateX(${laptopRotateX}deg)`,
                        transition: "transform 100ms ease-out",
                      }}
                    >
                      <div
                        className="absolute overflow-hidden"
                        style={{ left: 67, top: 28, width: 604, height: 371 }}
                      >
                        <img
                          src="/kuru/showcase/dashboard.webp"
                          alt=""
                          className="absolute top-0 max-w-none transition-transform duration-500 ease-out group-hover/laptop:translate-x-24"
                          style={{ left: -95, width: 700 }}
                          loading="lazy"
                          decoding="async"
                        />
                        <img
                          src="/approach/rail.webp"
                          alt=""
                          className="absolute top-[1px] left-0"
                          style={{ width: 34 }}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <img
                        src="/approach/laptop-lid.webp"
                        alt=""
                        className="absolute inset-0 h-full w-full"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  <img
                    src="/approach/laptop-base.webp"
                    alt=""
                    className="absolute max-w-none"
                    style={{ left: -9, top: 622, width: 719, height: 29 }}
                    loading="lazy"
                    decoding="async"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-auto absolute"
                    style={{ left: -9, top: 201, width: 719, height: 450 }}
                  />
                </div>
              </div>
            </article>

            {/* Card 4: Engineered to last (Wide) with Presence Cursors */}
            <article className="relative isolate overflow-hidden rounded-[12px] border border-border bg-bg-surface min-h-[399px] lg:min-h-0 flex flex-col justify-between">
              <div className="vv-art-pixel absolute inset-0 pointer-events-none opacity-80 dark:opacity-60" aria-hidden="true" />

              <div className="relative z-10 px-5 py-8 lg:px-9 lg:pt-[45px] lg:pb-0">
                <h3 className="font-display text-[clamp(24px,2.6vw,36px)] leading-[1.1] font-medium tracking-tight text-text-secondary">
                  Engineered to last
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-[1.6] text-text-muted lg:mt-3">
                  <span>Built with </span>
                  <span className="text-text-secondary font-medium">clean, tested code</span>
                  <span>, from interfaces to APIs, data and infrastructure.</span>
                </p>
              </div>

              {/* Exact Layered IDE Workspace Frame */}
              <div className="absolute inset-0 origin-top-left -translate-x-[4px] scale-[0.68] lg:translate-x-0 lg:scale-100">
                <div className="pointer-events-none absolute inset-0">
                  <div
                    className="absolute overflow-hidden border border-border bg-bg-surface/50 backdrop-blur-[4px]"
                    style={{
                      left: 36,
                      top: 201,
                      width: 685,
                      height: 450,
                      borderRadius: "13.5px 13.5px 0 0",
                      boxShadow: "0 0 56px 9px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <div
                      className="absolute overflow-hidden bg-black"
                      style={{ left: 7, top: 7, width: 671, height: 455, borderRadius: 6.5 }}
                    >
                      <div className="absolute inset-0 will-change-transform">
                        <img
                          src="/kuru/showcase/screen-meridian.webp"
                          alt=""
                          className="absolute max-w-none"
                          style={{ left: -63, top: 69, width: 172 }}
                          loading="lazy"
                          decoding="async"
                        />
                        <img
                          src="/kuru/showcase/screen-tarn.webp"
                          alt=""
                          className="absolute max-w-none"
                          style={{ left: 129, top: 69, width: 172 }}
                          loading="lazy"
                          decoding="async"
                        />
                        <img
                          src="/kuru/showcase/screen-norholm.webp"
                          alt=""
                          className="absolute max-w-none outline-[1.5px] outline-blue-500"
                          style={{ left: 322, top: 71, width: 169 }}
                          loading="lazy"
                          decoding="async"
                        />
                        <img
                          src="/kuru/showcase/screen-health.webp"
                          alt=""
                          className="absolute max-w-none"
                          style={{ left: 512, top: 69, width: 172 }}
                          loading="lazy"
                          decoding="async"
                        />
                        <div
                          className="absolute flex items-center bg-[#161618] px-1"
                          style={{
                            left: 322,
                            top: 48,
                            width: 169,
                            height: 16,
                            borderRadius: 3.5,
                          }}
                        >
                          <span className="grid place-items-center bg-[#2f2f33] size-2 rounded-sm">
                            <svg viewBox="0 0 10 10" className="size-full" fill="#fff">
                              <path d="M4 3.1 6.9 5 4 6.9z" />
                            </svg>
                          </span>
                          <span className="text-[7px] text-white ml-1 font-mono">Desktop</span>
                        </div>
                      </div>
                    </div>
                    <img
                      src="/approach/panel.webp"
                      alt=""
                      className="absolute max-w-none"
                      style={{ left: 7, top: 7, width: 671, borderRadius: 6.5 }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Alex Cursor: Scrolls along Y axis with parallax */}
                  <div
                    className="absolute inset-0 transition-transform duration-100 ease-out"
                    style={{ transform: `translateY(${cursorY}px)` }}
                  >
                    <span className="absolute" style={{ left: 111, top: 413 }}>
                      <svg width="20" height="22" viewBox="0 0 249 273" fill="none">
                        <path
                          d="m1.81 20.046 39.667 238.391c2.237 13.443 19.18 18.114 27.99 7.717l57.9-68.335a30 30 0 0 1 14.345-9.364l94.457-28.064c13.362-3.97 15.611-21.939 3.639-29.079L25.788 3.678C14.086-3.3-.427 6.607 1.81 20.046Z"
                          fill="#05c4f5"
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                      </svg>
                    </span>
                    <span
                      className="absolute rounded-full bg-accent px-3 py-1 text-xs font-medium text-black shadow-lg"
                      style={{ left: 132, top: 426 }}
                    >
                      Alex
                    </span>
                  </div>

                  {/* Gangu Cursor: Continuous breathing presence */}
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 vv-breathe" style={{ animationDuration: "6s" }}>
                      <span className="absolute" style={{ left: 531, top: 482 }}>
                        <svg width="18" height="20" viewBox="0 0 249 273" fill="none">
                          <path
                            d="m1.81 20.046 39.667 238.391c2.237 13.443 19.18 18.114 27.99 7.717l57.9-68.335a30 30 0 0 1 14.345-9.364l94.457-28.064c13.362-3.97 15.611-21.939 3.639-29.079L25.788 3.678C14.086-3.3-.427 6.607 1.81 20.046Z"
                            fill="#05c4f5"
                            stroke="#ffffff"
                            strokeWidth="2"
                          />
                        </svg>
                      </span>
                      <span
                        className="absolute rounded-full bg-accent px-3 py-1 text-xs font-medium text-black shadow-lg"
                        style={{ left: 547, top: 492 }}
                      >
                        Gangu
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* ================= ROW 3 ================= */}
          <div className="grid gap-5 min-[751px]:grid-cols-[775fr_540fr] lg:h-[560px]">
            {/* Card 5: Launch and hand over (Wide) */}
            <article className="relative overflow-hidden rounded-[12px] border border-border bg-bg-surface min-h-[430px] lg:min-h-0 flex flex-col justify-between">
              <div className="vv-art-cms absolute inset-0 pointer-events-none opacity-80 dark:opacity-40" aria-hidden="true" />

              <div className="relative z-10 px-5 py-8 lg:px-9 lg:pt-[45px] lg:pb-0">
                <h3 className="font-display text-[clamp(24px,2.6vw,36px)] leading-[1.1] font-medium tracking-tight text-text-secondary">
                  Launch and hand over
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-[1.6] text-text-muted lg:mt-3">
                  <span>Launched with documentation and an admin you can run, so you can </span>
                  <span className="text-text-secondary font-medium">update and manage everything</span>
                  <span> yourself after going live.</span>
                </p>
              </div>

              {/* Handover CMS Documentation Table */}
              <div
                aria-hidden="true"
                className="relative mt-6 mr-0 ml-5 lg:ml-9 overflow-hidden rounded-tl-xl border-t border-l border-border bg-white/85 dark:bg-black/60 backdrop-blur-md shadow-xl p-4 lg:p-6"
              >
                {/* Table Header */}
                <div className="grid grid-cols-[1fr_120px_60px] lg:grid-cols-[1fr_150px_90px] gap-4 pb-3 text-[11px] font-medium uppercase tracking-wider text-text-muted">
                  <span>Document Title</span>
                  <span>Verified Date</span>
                  <span>Asset</span>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-border">
                  {HANDOVER_DOCS.map((doc) => (
                    <div
                      key={doc.title}
                      className="grid grid-cols-[1fr_120px_60px] lg:grid-cols-[1fr_150px_90px] items-center gap-4 py-2.5 text-xs text-text-secondary"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-text-muted" fill="currentColor">
                          <path d="M6.5 2h6.67a1 1 0 0 1 .7.29l5.34 5.32a1 1 0 0 1 .29.71V20a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7.25 2.42v2.9a.6.6 0 0 0 .6.6h2.9l-3.5-3.5Z" />
                        </svg>
                        <span className="truncate">{doc.title}</span>
                      </div>
                      <span className="text-text-muted text-[11px]">{doc.date}</span>
                      <div className="relative h-[24px] w-[40px] lg:h-[30px] lg:w-[50px] rounded overflow-hidden border border-border bg-bg-surface">
                        <Image
                          src={doc.img}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="60px"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* Card 6: Automate as you grow (Narrow) */}
            <article
              className="relative overflow-hidden rounded-[12px] border border-border min-h-[380px] lg:min-h-0 flex flex-col justify-between"
              style={{ background: "var(--vv-future-wash)" }}
            >
              <div className="relative z-10 px-5 py-8 lg:px-9 lg:pt-[45px] lg:pb-0">
                <h3 className="font-display text-[clamp(24px,2.6vw,36px)] leading-[1.1] font-medium tracking-tight text-text-secondary">
                  Automate as you grow
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-[1.6] text-text-muted lg:mt-3">
                  <span>Systems designed to be </span>
                  <span className="text-text-secondary font-medium">scalable and automated,</span>
                  <span> so repetitive work moves to automations and AI as you grow.</span>
                </p>
              </div>

              {/* High-Precision Real-Time Clock Dial Visual */}
              <div className="relative flex flex-1 items-center justify-center p-6">
                <div className="relative h-56 w-56 sm:h-64 sm:w-64">
                  {/* Watch Face Base - Dual Dark & Light Face */}
                  <Image
                    src="/approach/dial.webp"
                    alt="Analog Dial"
                    fill
                    sizes="(max-width: 640px) 224px, 256px"
                    className="object-contain hidden dark:block"
                  />
                  <Image
                    src="/approach/dial-light.webp"
                    alt="Analog Dial"
                    fill
                    sizes="(max-width: 640px) 224px, 256px"
                    className="object-contain block dark:hidden"
                  />

                  {/* Rotating Hour Hand */}
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform"
                    style={{ transform: `rotate(${hoursDeg}deg)` }}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src="/approach/hand-hour.webp"
                        alt="Hour Hand"
                        fill
                        sizes="(max-width: 640px) 224px, 256px"
                        className="object-contain dark:invert-0 invert transition-[filter] duration-300"
                      />
                    </div>
                  </div>

                  {/* Rotating Minute Hand */}
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform"
                    style={{ transform: `rotate(${minutesDeg}deg)` }}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src="/approach/hand-minute.webp"
                        alt="Minute Hand"
                        fill
                        sizes="(max-width: 640px) 224px, 256px"
                        className="object-contain dark:invert-0 invert transition-[filter] duration-300"
                      />
                    </div>
                  </div>

                  {/* Rotating Second Hand */}
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ transform: `rotate(${secondsDeg}deg)` }}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src="/approach/hand-second.webp"
                        alt="Second Hand"
                        fill
                        sizes="(max-width: 640px) 224px, 256px"
                        className="object-contain dark:invert-0 invert transition-[filter] duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
