"use client";

import * as React from "react";
import { TestimonialsGlobe } from "./testimonials-globe";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role?: string;
  company?: string;
  rating?: number;
  avatar?: string | null;
}

const STATS: StatItem[] = [
  { value: 99, suffix: "%", label: "Client satisfaction on milestone delivery" },
  { value: 100, suffix: "%", label: "On-time release and SLA commitment" },
  { value: 16, suffix: "+", label: "Digital platforms and systems launched" },
];

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "lasada",
    quote:
      "I've worked with YoYa Tech on several different occasions and it's always a pleasure. They go through every detail and deliver according to your desires.",
    name: "Lasada Pippen",
    role: "Keynote Speaker, Author & Entrepreneur",
    company: "United States",
    rating: 5,
    avatar: "/team/avatar-1.0c4e3fc0.jpg",
  },
  {
    id: "lucas",
    quote:
      "Great work overall. The design feels premium, the layout is well structured, and everything is responsive. They made the changes I requested quickly and didn't miss a beat.",
    name: "Lucas M.",
    role: "Founder & Product Lead",
    company: "United States",
    rating: 5,
    avatar: null,
  },
  {
    id: "saleh",
    quote:
      "Talented, creative, and most importantly trustworthy. They completed the revisions even after the project was marked complete on Contra weeks earlier.",
    name: "Saleh Al Zamil",
    role: "Managing Director",
    company: "Tamkene, Saudi Arabia",
    rating: 5,
    avatar: "/team/avatar-2.58306c73.jpg",
  },
];

const formatNum = (idx: number) => String(idx + 1).padStart(2, "0");

// Double Quote SVG Icon
function DoubleQuoteIcon({ className = "" }: { className?: string }) {
  const d =
    "M18 4v10c0 7.7-4.6 12.9-11.4 14.9L5 25.6c3.6-1.3 5.8-3.7 6.4-6.6H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h12Z";
  return (
    <svg viewBox="0 0 44 32" className={className} fill="currentColor" aria-hidden="true">
      <path d={d} />
      <path d={d} transform="translate(24 0)" />
    </svg>
  );
}

// 5-Star Rating Component
function StarRating({ filled = 5 }: { filled?: number }) {
  return (
    <div aria-hidden="true" className="flex gap-1">
      {[1, 2, 3, 4, 5].map((t) => (
        <svg
          key={t}
          viewBox="0 0 24 24"
          className={`size-[17px] ${t <= filled ? "text-[#f59e0b]" : "text-white/20"}`}
          fill="currentColor"
        >
          <path d="M12 2.6l2.6 5.9 6.4.6-4.8 4.3 1.4 6.3-5.6-3.3-5.6 3.3 1.4-6.3L3 9.1l6.4-.6L12 2.6Z" />
        </svg>
      ))}
    </div>
  );
}

// Card Inner Glass Highlights
function CardInnerGlow() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-px w-[420px] max-w-[80%] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--vv-tint-strong) 50%, transparent 100%)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[12px]"
        style={{
          background:
            "radial-gradient(58% 46% at 50% 0%, var(--vv-tint) 0%, var(--vv-tint-weak) 45%, transparent 78%)",
        }}
      />
    </>
  );
}

export function TestimonialsSection() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [hasScrolledIn, setHasScrolledIn] = React.useState(false);
  const [animatedValues, setAnimatedValues] = React.useState<number[]>(STATS.map(() => 0));

  const total = TESTIMONIALS.length;
  const goTo = React.useCallback(
    (idx: number) => {
      setCurrentIndex((idx % total + total) % total);
    },
    [total]
  );

  // Auto-advance every 7 seconds, pauses on hover/focus
  React.useEffect(() => {
    if (isPaused || total < 2) return;
    const timer = setInterval(() => {
      goTo(currentIndex + 1);
    }, 7000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused, total, goTo]);

  // Count-up stats on scroll into view
  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasScrolledIn) {
          setHasScrolledIn(true);
          const duration = 1500;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(1, elapsed / duration);
            // Ease-out quad
            const eased = 1 - (1 - progress) * (1 - progress);

            setAnimatedValues(STATS.map((s) => Math.round(s.value * eased)));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasScrolledIn]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative isolate z-10 overflow-hidden bg-bg-canvas text-text-secondary py-[clamp(80px,9vw,120px)] border-b border-border"
    >
      {/* Interactive 3D WebGL Rotating Globe Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 grid place-items-center"
      >
        <div className="relative -mt-[clamp(44px,5.5vw,92px)] aspect-square w-[min(980px,130vw)] opacity-[0.72]">
          <TestimonialsGlobe />
        </div>
      </div>

      {/* Radial fade mask over globe for seamless canvas immersion */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(62% 62% at 50% 42%, transparent 42%, color-mix(in srgb, var(--color-bg-canvas, #000) 45%, transparent) 70%, var(--color-bg-canvas, #000000) 96%)",
        }}
      />

      <div className="mx-auto max-w-[1380px] px-6 md:px-8">
        {/* Giant Centerpiece Heading */}
        <h2
          id="testimonials-heading"
          className="text-center font-display text-[clamp(46px,9vw,132px)] leading-[1] font-medium tracking-[-0.05em] text-text-secondary"
        >
          Testimonials
        </h2>

        {/* 2-Card Stage overlapping the centerpiece heading */}
        <div
          className="vv-quote-stage relative mt-7 md:mt-[clamp(-44px,-3vw,-18px)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div className="mx-auto grid max-w-[1120px] gap-4 lg:grid-cols-12">
            {/* Left Card: 3 Live Count-Up Stats */}
            <div
              className="relative overflow-hidden rounded-[12px] border border-border bg-bg-surface/85 backdrop-blur-[12px] order-2 flex flex-col justify-between gap-8 p-8 lg:order-1 lg:col-span-4 lg:gap-10 lg:p-10 shadow-xl"
            >
              <CardInnerGlow />
              {STATS.map((s, idx) => (
                <div key={s.label} className="relative">
                  <div className="flex items-start font-display text-[clamp(40px,4.4vw,60px)] leading-[0.9] font-medium tracking-[-0.045em] text-text-secondary">
                    <span className="tabular-nums">
                      {hasScrolledIn ? animatedValues[idx] : s.value}
                    </span>
                    {s.suffix && (
                      <span className="ml-0.5 text-[0.46em] leading-[1.5] text-accent">
                        {s.suffix}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-xs sm:text-sm text-text-muted">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Right Card: Client Testimonial Carousel */}
            <div
              className="relative overflow-hidden rounded-[12px] border border-border bg-bg-surface/85 backdrop-blur-[12px] order-1 flex flex-col p-8 lg:order-2 lg:col-span-8 lg:p-11 shadow-xl"
            >
              <CardInnerGlow />

              {/* Top Bar: Counter & Double Quote Icon */}
              <div className="relative flex items-center justify-between gap-6">
                <div>
                  <p className="text-xs sm:text-sm tracking-[0.06em] text-text-muted tabular-nums">
                    <span className="text-text-secondary font-medium" aria-live="polite">
                      {formatNum(currentIndex)}
                    </span>{" "}
                    <span aria-hidden="true">/ {formatNum(total - 1)}</span>
                    <span className="sr-only">of {total}</span>
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-2.5 block h-px w-14 bg-border"
                  />
                </div>
                <DoubleQuoteIcon className="h-[clamp(20px,2.2vw,28px)] w-auto shrink-0 text-text-secondary opacity-30" />
              </div>

              {/* Quote Body with Star Rating & Fade Transition */}
              <div className="relative mt-8 grid min-h-[clamp(210px,20vw,268px)] grid-cols-1">
                {TESTIMONIALS.map((t, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <figure
                      key={t.id}
                      style={{ gridArea: "1 / 1" }}
                      aria-hidden={!isActive}
                      className={`flex h-full flex-col transition-opacity duration-500 ease-out ${
                        isActive ? "opacity-100" : "pointer-events-none opacity-0"
                      }`}
                    >
                      {t.rating && (
                        <div className="flex items-center gap-2.5">
                          <StarRating filled={t.rating} />
                          <span className="sr-only">{t.rating} out of 5</span>
                        </div>
                      )}

                      <blockquote
                        className={`mt-auto font-display text-[clamp(18px,1.7vw,25px)] leading-[1.4] font-medium tracking-[-0.02em] text-text-secondary ${
                          t.rating ? "pt-6" : ""
                        }`}
                      >
                        “{t.quote}”
                      </blockquote>

                      {/* Author Caption */}
                      <figcaption className="mt-7 flex items-center gap-3.5 sm:pr-24">
                        {t.avatar ? (
                          <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-border bg-bg-surface">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={t.avatar}
                              alt={t.name}
                              width={48}
                              height={48}
                              loading="lazy"
                              decoding="async"
                              className="size-12 shrink-0 rounded-full object-cover"
                            />
                          </div>
                        ) : (
                          <span
                            aria-hidden="true"
                            className="grid size-12 shrink-0 place-items-center rounded-full border border-border bg-bg-surface font-display text-[17px] font-medium text-text-muted"
                          >
                            {t.name.trim().charAt(0).toUpperCase()}
                          </span>
                        )}

                        <span className="min-w-0">
                          <span className="block truncate text-[15px] font-medium tracking-[0.02em] text-text-secondary uppercase">
                            {t.name}
                          </span>
                          {(t.role || t.company) && (
                            <span className="block text-xs sm:text-sm text-text-muted sm:truncate">
                              {[t.role, t.company].filter(Boolean).join(", ")}
                            </span>
                          )}
                        </span>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>

              {/* Prev / Next Navigation Arrows */}
              <div className="mt-6 flex items-center justify-end gap-2 sm:absolute sm:right-8 sm:bottom-8 sm:mt-0 lg:right-11 lg:bottom-11">
                <button
                  type="button"
                  onClick={() => goTo(currentIndex - 1)}
                  aria-label="Previous testimonial"
                  className="grid size-10 place-items-center rounded-full border border-border text-text-muted transition-colors hover:border-text-secondary/40 hover:bg-bg-surface hover:text-text-secondary"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-[18px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => goTo(currentIndex + 1)}
                  aria-label="Next testimonial"
                  className="grid size-10 place-items-center rounded-full border border-border text-text-muted transition-colors hover:border-text-secondary/40 hover:bg-bg-surface hover:text-text-secondary"
                >
                  <span className="rotate-180">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M15 6l-6 6 6 6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
