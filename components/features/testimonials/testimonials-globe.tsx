"use client";

import * as React from "react";
import createGlobe from "cobe";

const DARK_CONFIG = {
  dark: 1,
  diffuse: 0.55,
  mapBrightness: 4.6,
  baseColor: [0.32, 0.34, 0.38] as [number, number, number],
  glowColor: [0.09, 0.11, 0.15] as [number, number, number],
  markerColor: [0.435, 1, 0.329] as [number, number, number],
};

const LIGHT_CONFIG = {
  dark: 0,
  diffuse: 0.45,
  mapBrightness: 1.3,
  baseColor: [0.74, 0.75, 0.79] as [number, number, number],
  glowColor: [1, 1, 1] as [number, number, number],
  markerColor: [0.435, 1, 0.329] as [number, number, number],
};

export function TestimonialsGlobe({ className = "" }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const pointerInteracting = React.useRef<number | null>(null);
  const pointerInteractionMovement = React.useRef(0);
  const dragDelta = React.useRef(0);
  const inViewRef = React.useRef(false);
  const [ready, setReady] = React.useState(false);

  const configRef = React.useRef(DARK_CONFIG);

  React.useEffect(() => {
    const updateConfig = () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      configRef.current = isLight ? LIGHT_CONFIG : DARK_CONFIG;
    };
    updateConfig();

    const observer = new MutationObserver(updateConfig);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      inViewRef.current = true;
      setReady(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          setReady(true);
        }
      },
      { rootMargin: "100% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!ready || !canvas) return;

    let width = canvas.offsetWidth || 600;
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth || 600;
      }
    };
    window.addEventListener("resize", onResize);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let phi = 0;
    let animId = 0;

    let globe: ReturnType<typeof createGlobe> | null = null;
    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.28,
        mapSamples: 16000,
        ...configRef.current,
        markers: [
          { location: [9.03, 38.74], size: 0.08 }, // Addis Ababa
          { location: [41.9, 12.5], size: 0.08 }, // Rome
          { location: [37.77, -122.41], size: 0.06 }, // San Francisco
          { location: [40.71, -74.0], size: 0.06 }, // New York
          { location: [24.71, 46.67], size: 0.06 }, // Riyadh
          { location: [51.5, -0.12], size: 0.06 }, // London
          { location: [25.2, 55.27], size: 0.06 }, // Dubai
        ],
      });

      const tick = () => {
        animId = requestAnimationFrame(tick);
        if (inViewRef.current && globe) {
          if (pointerInteracting.current === null && !prefersReducedMotion) {
            phi += 0.0032;
          }
          globe.update({
            phi: phi + dragDelta.current,
            width: width * 2,
            height: width * 2,
            ...configRef.current,
          });
        }
      };
      animId = requestAnimationFrame(tick);

      const fadeTimeout = setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.style.opacity = "1";
        }
      }, 150);

      return () => {
        clearTimeout(fadeTimeout);
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", onResize);
        if (globe) {
          globe.destroy();
        }
        try {
          const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
          gl?.getExtension("WEBGL_lose_context")?.loseContext();
        } catch {}
      };
    } catch {
      return () => {
        window.removeEventListener("resize", onResize);
      };
    }
  }, [ready]);

  const handlePointerDown = (clientX: number) => {
    pointerInteracting.current = clientX;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grabbing";
    }
  };

  const handlePointerUp = () => {
    pointerInteracting.current = null;
    dragDelta.current = 0;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab";
    }
  };

  const handlePointerMove = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      dragDelta.current = delta / 200;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto aspect-square h-full w-full max-w-[980px] select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="h-full w-full opacity-0 transition-opacity duration-1000 ease-out cursor-grab"
        onPointerDown={(e) => handlePointerDown(e.clientX)}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onTouchMove={(e) => e.touches[0] && handlePointerMove(e.touches[0].clientX)}
      />
    </div>
  );
}
