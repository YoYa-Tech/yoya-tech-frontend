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
  const stickyRef = React.useRef<HTMLDivElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
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
    const sticky = stickyRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const main = mainRef.current;
    const tagline = taglineRef.current;
    const hint = hintRef.current;
    const fill = fillRef.current;
    const field = fieldRef.current;
    const content = contentRef.current;

    if (!section || !sticky || !left || !right || !main || !tagline || !hint || !fill || !field || !content) return;

    let collided = false;
    let frame = 0;
    let inView = false;
    let geometry: {
      from: number;
      to: number;
      y: number;
      width: number;
      height: number;
      taglineShift: number;
      taglineScale: number;
    } | null = null;

    const fieldPaths = Array.from(field.querySelectorAll("path"));

    function measureLayout() {
      if (!sticky || !left || !right || !main || !tagline || !content) return;
      const origin = content.offsetLeft + (left.offsetParent as HTMLElement)?.offsetLeft || 0;
      const leftParent = left.offsetParent as HTMLElement;
      const mainParent = main.offsetParent as HTMLElement;

      geometry = {
        from: origin + left.offsetLeft + left.offsetWidth,
        to: origin + right.offsetLeft,
        y: content.offsetTop + (leftParent?.offsetTop || 0) + left.offsetTop + left.offsetHeight / 2,
        width: sticky.clientWidth,
        height: sticky.clientHeight,
        taglineShift:
          (mainParent?.offsetTop || 0) +
          main.offsetTop +
          main.offsetHeight / 2 -
          (tagline.offsetTop + tagline.offsetHeight / 2),
        taglineScale: Math.max(1, Math.min(1.9, (sticky.clientWidth - 48) / (tagline.offsetWidth || 1))),
      };
      field?.setAttribute("viewBox", `0 0 ${geometry.width} ${geometry.height}`);
    }

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

      content?.animate(
        [
          { transform: "translate(0,0)" },
          { transform: "translate(-10px,6px)" },
          { transform: "translate(8px,-5px)" },
          { transform: "translate(-5px,3px)" },
          { transform: "translate(3px,-2px)" },
          { transform: "translate(0,0)" },
        ],
        { duration: 500, easing: "ease-out" }
      );

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

    function drawField(progress: number, entry: number, appear: number) {
      if (!field || !geometry) return;
      const visible = appear * clamp(1 - (progress - 0.43) / 0.03);
      field.style.opacity = visible.toFixed(3);
      if (!visible) return;

      const shift = (entry * geometry.width) / 100;
      const from = geometry.from + shift;
      const to = geometry.to - shift;
      const gap = Math.max(to - from, 0);
      const y = geometry.y;
      const pull = 1 - clamp(gap / (geometry.width * 0.9));
      field.style.setProperty("--pull", pull.toFixed(3));

      fieldPaths.forEach((path, index) => {
        const lane = index - (FIELD_LINES - 1) / 2;
        const bulge = lane * gap * (0.16 - pull * 0.08);
        const reach = gap * 0.32;
        path.setAttribute(
          "d",
          `M${from.toFixed(1)} ${y.toFixed(1)}C${(from + reach).toFixed(1)} ${(y + bulge).toFixed(1)} ${(to - reach).toFixed(1)} ${(y + bulge).toFixed(1)} ${to.toFixed(1)} ${y.toFixed(1)}`
        );
      });
    }

    function render() {
      frame = 0;
      if (!inView || !section) return;

      const bounds = section.getBoundingClientRect();
      const progress = clamp(-bounds.top / (bounds.height - window.innerHeight));
      const rise = clamp(1 - bounds.top / window.innerHeight);

      if (!geometry) measureLayout();

      const entry =
        progress === 0
          ? ENTRY_FAR + rise * (ENTRY_NEAR - ENTRY_FAR)
          : progress <= 0.42
          ? ENTRY_NEAR + (progress / 0.42) * (1.2 - ENTRY_NEAR)
          : 1.2 * (1 - clamp((progress - 0.42) / 0.03));
      const skew = 12 * (1 - clamp(progress / 0.45));

      if (left) left.style.transform = `translateX(${entry}vw) skewX(${-skew}deg)`;
      if (right) right.style.transform = `translateX(${-entry}vw) skewX(${skew}deg)`;
      if (main) main.style.opacity = progress < 0.62 ? "1" : "0";

      if (progress >= 0.45 && !collided) {
        collided = true;
        triggerCollision();
      }
      if (progress < 0.4) {
        collided = false;
      }

      drawField(progress, entry, progress > 0 ? 1 : clamp((rise - 0.35) / 0.4));

      // Tagline reveal and lift into center stage
      const arrive = clamp((progress - 0.46) / 0.07);
      const settle = clamp((progress - 0.76) / 0.14);
      const lift = settle * settle * (3 - 2 * settle);

      if (tagline && geometry) {
        tagline.style.opacity = String(arrive);
        tagline.style.transform = `translateY(${((1 - arrive) * 12 + lift * geometry.taglineShift).toFixed(1)}px) scale(${1 + lift * (geometry.taglineScale - 1)})`;
        tagline.style.color = lift > 0.5 ? "var(--build-foreground)" : "";
      }

      if (hint) {
        hint.style.opacity = String(clamp(1 - (progress - 0.45) / 0.12));
      }
      if (fill) {
        fill.style.transform = `scaleX(${clamp(progress / 0.45).toFixed(3)})`;
      }

      // Shards explosion & fall
      shardRefs.current.forEach((node, index) => {
        if (!node) return;
        const shard = shards[index];
        const p = clamp((progress - shard.start) / (0.96 - shard.start));
        const separate = Math.min(1, p * 3);
        node.style.opacity =
          progress < 0.62 ? "0" : String(p < 0.65 ? 1 : clamp(1 - (p - 0.65) / 0.35));
        node.style.transform = `translate(${separate * shard.separationX + p * shard.drift}vw,${separate * shard.separationY + p * p * shard.fall}vh) rotate(${p * p * shard.rotation}deg)`;
      });
    }

    function schedule() {
      if (!frame && inView) {
        frame = requestAnimationFrame(render);
      }
    }

    function onResize() {
      geometry = null;
      schedule();
    }

    const observer = new IntersectionObserver((entries) => {
      inView = entries[entries.length - 1].isIntersecting;
      schedule();
    });

    observer.observe(section);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    document.fonts?.ready.then(onResize);
    render();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="kuru-build"
      aria-label="Let’s build"
    >
      <div ref={stickyRef} className="kuru-build-sticky">
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

        {/* Dynamic Magnetic Field Lines SVG */}
        <svg ref={fieldRef} className="kuru-build-field" aria-hidden="true">
          {Array.from({ length: FIELD_LINES }).map((_, i) => (
            <path key={i} />
          ))}
        </svg>

        {/* Main Content & Words */}
        <div ref={contentRef} className="kuru-build-content">
          <div className="kuru-build-type">
            <h2 ref={mainRef} className="kuru-build-words">
              <span ref={leftRef}>Let’s</span>
              <span ref={rightRef} className="kuru-build-green">build</span>
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
                <div className="kuru-build-words">
                  <span>Let’s</span>
                  <span className="kuru-build-green">build</span>
                </div>
              </div>
            ))}
          </div>

          <p ref={taglineRef} className="kuru-build-tagline">
            Ideas into reliable systems
          </p>
        </div>

        {/* Scroll Track Hint */}
        <div ref={hintRef} className="kuru-build-scroll" aria-hidden="true">
          <span>Scroll</span>
          <span className="kuru-build-track">
            <span ref={fillRef} className="kuru-build-fill" />
          </span>
        </div>
      </div>
    </section>
  );
}
