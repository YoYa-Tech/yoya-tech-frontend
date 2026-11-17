"use client";

import * as React from "react";
import Image from "next/image";
import { Check, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export function OurApproach() {
  // Live clock dial rotation angles
  const [secondsDeg, setSecondsDeg] = React.useState(0);
  const [minutesDeg, setMinutesDeg] = React.useState(0);
  const [hoursDeg, setHoursDeg] = React.useState(0);

  React.useEffect(() => {
    function updateClock() {
      const now = new Date();
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
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

  return (
    <section id="approach" className="relative z-10 bg-black py-28 sm:py-36 border-b border-white/5">
      <div className="mx-auto max-w-[1380px] px-6 md:px-8">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            // METHODOLOGY
          </span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white">
            Our Approach
          </h2>
          <p className="mt-3 text-base text-text-primary max-w-xl">
            How we take projects from vague ideas to resilient systems that scale without surprises.
          </p>
        </div>

        {/* 6 Approach Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Discovery first */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-6 sm:p-8 flex flex-col justify-between transition-all hover:border-accent/40 hover:bg-[#151515]">
            <div>
              <span className="font-mono text-xs text-accent">01 //</span>
              <h3 className="mt-2 font-display text-2xl font-medium text-white group-hover:text-accent transition-colors">
                Discovery first
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-primary">
                We begin by defining clear goals, understanding your users and mapping how your business runs before anything is built.
              </p>
            </div>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-black/80">
              <Image
                src="/kuru/showcase/discovery-board.webp"
                alt="Discovery Board"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* 2. Design around people */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-6 sm:p-8 flex flex-col justify-between transition-all hover:border-accent/40 hover:bg-[#151515]">
            <div>
              <span className="font-mono text-xs text-accent">02 //</span>
              <h3 className="mt-2 font-display text-2xl font-medium text-white group-hover:text-accent transition-colors">
                Design around people
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-primary">
                Wireframes, visual design and interactive prototypes tested against real user flows for effortless clarity.
              </p>
            </div>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-black/80 flex items-center justify-center p-4">
              <div className="relative h-full aspect-[9/19] rounded-xl overflow-hidden shadow-2xl border border-white/20">
                <Image
                  src="/kuru/showcase/phone-meridian.webp"
                  alt="Mobile Experience"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* 3. Built to convert */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-6 sm:p-8 flex flex-col justify-between transition-all hover:border-accent/40 hover:bg-[#151515]">
            <div>
              <span className="font-mono text-xs text-accent">03 //</span>
              <h3 className="mt-2 font-display text-2xl font-medium text-white group-hover:text-accent transition-colors">
                Built to convert
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-primary">
                Fast loading times, responsive layouts, clear visual hierarchy and persuasive microcopy designed to turn traffic into revenue.
              </p>
            </div>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-black/80">
              <Image
                src="/kuru/showcase/dashboard.webp"
                alt="Conversion Dashboard"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* 4. Engineered to last (Laptop mockup) */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-6 sm:p-8 flex flex-col justify-between transition-all hover:border-accent/40 hover:bg-[#151515]">
            <div>
              <span className="font-mono text-xs text-accent">04 //</span>
              <h3 className="mt-2 font-display text-2xl font-medium text-white group-hover:text-accent transition-colors">
                Engineered to last
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-primary">
                Modern component architectures, strict typing, zero bloat, and automated CI/CD pipelines that stay maintainable for years.
              </p>
            </div>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-black/80">
              <Image
                src="/kuru/showcase/screen-meridian.webp"
                alt="Screen Meridian"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* 5. Launch and hand over */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-6 sm:p-8 flex flex-col justify-between transition-all hover:border-accent/40 hover:bg-[#151515]">
            <div>
              <span className="font-mono text-xs text-accent">05 //</span>
              <h3 className="mt-2 font-display text-2xl font-medium text-white group-hover:text-accent transition-colors">
                Launch and hand over
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-primary">
                Smooth deployment, domain configuration, analytics tracking, and full admin documentation so your team owns every asset.
              </p>
            </div>

            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-black/80">
              <Image
                src="/approach/panel.webp"
                alt="Admin Panel"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* 6. Automate as you grow (Live Dial) */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-6 sm:p-8 flex flex-col justify-between transition-all hover:border-accent/40 hover:bg-[#151515]">
            <div>
              <span className="font-mono text-xs text-accent">06 //</span>
              <h3 className="mt-2 font-display text-2xl font-medium text-white group-hover:text-accent transition-colors">
                Automate as you grow
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-primary">
                Save dozens of hours every week by connecting routine workflows to intelligent agents and custom integrations.
              </p>
            </div>

            {/* Live Clock Dial Component */}
            <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-black/90 flex items-center justify-center p-2">
              <div className="relative h-44 w-44">
                {/* Dial Base Face */}
                <Image
                  src="/approach/dial.webp"
                  alt="Rotary Dial"
                  fill
                  className="object-contain"
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
                      className="object-contain"
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
                      className="object-contain"
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
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
