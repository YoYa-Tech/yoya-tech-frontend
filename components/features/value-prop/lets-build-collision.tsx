"use client";

import * as React from "react";

const clamp = (val: number) => Math.max(0, Math.min(1, val));
const center = { x: 52, y: 46 };
const vertices = [
  { x: 18, y: 0 },
  { x: 48, y: 0 },
  { x: 78, y: 0 },
  { x: 100, y: 20 },
  { x: 100, y: 75 },
  { x: 85, y: 100 },
  { x: 55, y: 100 },
  { x: 22, y: 100 },
  { x: 0, y: 70 },
  { x: 0, y: 25 },
];
const corners: Record<number, { x: number; y: number }> = {
  2: { x: 100, y: 0 },
  4: { x: 100, y: 100 },
  7: { x: 0, y: 100 },
  9: { x: 0, y: 0 },
};
const bends = [3, -2.5, 2, -3, 2.5, -2, 3, -2.5, 2, -3];

function midpoint(index: number) {
  const vertex = vertices[index];
  const x = vertex.x - center.x;
  const y = vertex.y - center.y;
  const length = Math.hypot(x, y);
  return {
    x: center.x + x * 0.5 - (y / length) * bends[index],
    y: center.y + y * 0.5 + (x / length) * bends[index],
  };
}

const shards = vertices.map((vertex, index) => {
  const next = (index + 1) % vertices.length;
  const points = [center, midpoint(index), vertex];
  if (corners[index]) points.push(corners[index]);
  points.push(vertices[next], midpoint(next));
  const x = points.reduce((sum, p) => sum + p.x, 0) / points.length;
  const y = points.reduce((sum, p) => sum + p.y, 0) / points.length;
  return {
    clip: `polygon(${points.map((p) => `${p.x.toFixed(1)}% ${p.y.toFixed(1)}%`).join(", ")})`,
    origin: `${x.toFixed(1)}% ${y.toFixed(1)}%`,
    start: 0.62 + 0.07 * clamp(Math.hypot(x - center.x, y - center.y) / 55) + (index % 3) * 0.015,
    fall: 75 + ((23 * index) % 45),
    drift: (x - center.x) * 0.35 + (index % 2 === 0 ? 1.5 : -1.5),
    rotation: (x < center.x ? -1 : 1) * (8 + ((11 * index) % 18)),
    separationX: ((x - center.x) / 55) * 3.5,
    separationY: ((y - center.y) / 55) * 7,
  };
});

const pieces = [
  { x: -120, y: -90, r: 45, s: 1 },
  { x: 130, y: -70, r: -30, s: 0.8 },
  { x: -160, y: 30, r: 70, s: 0.7 },
  { x: 150, y: 60, r: -60, s: 1.1 },
  { x: -60, y: -140, r: 20, s: 0.6 },
  { x: 70, y: 130, r: -45, s: 0.9 },
  { x: -30, y: 120, r: 90, s: 0.5 },
  { x: 40, y: -120, r: -80, s: 0.7 },
];

const FIELD_LINES = 6;
const ENTRY_FAR = -44;
const ENTRY_NEAR = -24;

export function LetsBuildCollision() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const leftRef = React.useRef<HTMLSpanElement | null>(null);
  const rightRef = React.useRef<HTMLSpanElement | null>(null);
  const mainRef = React.useRef<HTMLHeadingElement | null>(null);
  const taglineRef = React.useRef<HTMLParagraphElement | null>(null);
  const fillRef = React.useRef<HTMLSpanElement | null>(null);
  const hintRef = React.useRef<HTMLDivElement | null>(null);
  const fieldRef = React.useRef<SVGSVGElement | null>(null);
  const ringRef = React.useRef<HTMLDivElement | null>(null);
  const echoRef = React.useRef<HTMLDivElement | null>(null);
  const flashRef = React.useRef<HTMLDivElement | null>(null);
  const piecesContainerRef = React.useRef<HTMLDivElement | null>(null);
  const shardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let collided = false;

    function triggerCollision() {
      const options: KeyframeAnimationOptions = {
        duration: 900,
        easing: "cubic-bezier(.16,1,.3,1)",
      };
      const wave = [
        { transform: "translate(-50%,-50%) scale(.2)", opacity: "0.9" },
        { transform: "translate(-50%,-50%) scale(9)", opacity: "0" },
      ];
      ringRef.current?.animate(wave, options);
      echoRef.current?.animate(wave, { ...options, duration: 1100, delay: 140 });
      flashRef.current?.animate([{ opacity: "1" }, { opacity: "0" }], {
        duration: 450,
        easing: "ease-out",
      });

      if (piecesContainerRef.current) {
        const children = Array.from(piecesContainerRef.current.children);
        children.forEach((node, index) => {
          const piece = pieces[index];
          node.animate(
            [
              { transform: `translate(0,0) rotate(0deg) scale(${piece.s})`, opacity: "1" },
              {
                transform: `translate(${piece.x * 1.6}px,${piece.y * 1.6}px) rotate(${piece.r * 3}deg) scale(0)`,
                opacity: "0",
              },
            ],
            { duration: 800, delay: index * 15, easing: "cubic-bezier(.16,1,.3,1)" }
          );
        });
      }
    }

    function onScroll() {
      if (!section) return;
      const bounds = section.getBoundingClientRect();
      const progress = clamp(-bounds.top / (bounds.height - window.innerHeight));
      const rise = clamp(1 - bounds.top / window.innerHeight);

      const entry =
        progress === 0
          ? ENTRY_FAR + rise * (ENTRY_NEAR - ENTRY_FAR)
          : progress <= 0.42
          ? ENTRY_NEAR + (progress / 0.42) * (1.2 - ENTRY_NEAR)
          : 1.2 * (1 - clamp((progress - 0.42) / 0.03));
      const skew = 12 * (1 - clamp(progress / 0.45));

      if (leftRef.current) {
        leftRef.current.style.transform = `translateX(${entry}vw) skewX(${-skew}deg)`;
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translateX(${-entry}vw) skewX(${skew}deg)`;
      }
      if (mainRef.current) {
        mainRef.current.style.opacity = progress < 0.62 ? "1" : "0";
      }

      if (progress >= 0.45 && !collided) {
        collided = true;
        triggerCollision();
      }
      if (progress < 0.4) {
        collided = false;
      }

      // Shards explosion
      shardRefs.current.forEach((node, index) => {
        if (!node) return;
        const shard = shards[index];
        const p = clamp((progress - shard.start) / (0.96 - shard.start));
        const separate = Math.min(1, p * 3);
        node.style.opacity =
          progress < 0.62 ? "0" : String(p < 0.65 ? 1 : clamp(1 - (p - 0.65) / 0.35));
        node.style.transform = `translate(${separate * shard.separationX + p * shard.drift}vw,${separate * shard.separationY + p * p * shard.fall}vh) rotate(${p * p * shard.rotation}deg)`;
      });

      // Tagline reveal
      const arrive = clamp((progress - 0.46) / 0.07);
      if (taglineRef.current) {
        taglineRef.current.style.opacity = String(arrive);
        taglineRef.current.style.transform = `translateY(${(1 - arrive) * 16}px)`;
      }

      // Scroll fill meter
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${clamp(progress / 0.45)})`;
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = String(clamp(1 - (progress - 0.45) / 0.12));
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="kuru-build relative h-[250vh] bg-black text-[#f3f4ec] isolate overflow-hidden"
      aria-label="Let’s build"
    >
      <div className="kuru-build-sticky sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Shockwave Rings */}
        <div ref={ringRef} className="kuru-build-ring" aria-hidden="true" />
        <div ref={echoRef} className="kuru-build-ring kuru-build-ring-echo" aria-hidden="true" />
        <div ref={flashRef} className="kuru-build-flash" aria-hidden="true" />

        {/* Floating Sparks */}
        <div ref={piecesContainerRef} className="kuru-build-pieces" aria-hidden="true">
          {pieces.map((_, i) => (
            <span key={i} />
          ))}
        </div>

        {/* Dynamic Field SVG */}
        <svg ref={fieldRef} className="kuru-build-field" aria-hidden="true">
          {Array.from({ length: FIELD_LINES }).map((_, i) => (
            <path key={i} />
          ))}
        </svg>

        {/* Main Content & Words */}
        <div className="kuru-build-content relative z-10 w-full px-6 text-center">
          <div className="kuru-build-type relative">
            <h2 ref={mainRef} className="kuru-build-words font-display text-[clamp(4rem,14vw,14rem)] font-medium tracking-tight">
              <span ref={leftRef} className="inline-block transition-transform duration-75">
                Let’s
              </span>
              <span
                ref={rightRef}
                className="kuru-build-green inline-block text-accent italic font-serif transition-transform duration-75"
              >
                build
              </span>
            </h2>

            {/* Shards */}
            {shards.map((shard, index) => (
              <div
                key={index}
                ref={(el) => {
                  shardRefs.current[index] = el;
                }}
                className="kuru-build-shard"
                aria-hidden="true"
                style={{
                  clipPath: shard.clip,
                  transformOrigin: shard.origin,
                }}
              >
                <div className="kuru-build-words font-display text-[clamp(4rem,14vw,14rem)] font-medium tracking-tight">
                  <span>Let’s</span>
                  <span className="kuru-build-green text-accent italic font-serif">build</span>
                </div>
              </div>
            ))}
          </div>

          <p
            ref={taglineRef}
            className="kuru-build-tagline mx-auto mt-6 max-w-xl text-xl sm:text-2xl text-white/80 font-normal transition-all"
          >
            Ideas into reliable, long-running systems.
          </p>
        </div>

        {/* Scroll down prompt */}
        <div ref={hintRef} className="kuru-build-scroll absolute bottom-8 flex flex-col items-center gap-2 text-xs font-mono text-white/50" aria-hidden="true">
          <span>Scroll</span>
          <span className="kuru-build-track h-10 w-[2px] bg-white/20 overflow-hidden rounded-full">
            <span ref={fillRef} className="kuru-build-fill block h-full w-full bg-accent origin-top scale-y-0 transition-transform" />
          </span>
        </div>
      </div>
    </section>
  );
}

