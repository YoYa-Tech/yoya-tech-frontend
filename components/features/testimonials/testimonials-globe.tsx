"use client";

import * as React from "react";
import createGlobe from "cobe";

export function TestimonialsGlobe({ className = "" }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const pointerInteracting = React.useRef<number | null>(null);
  const pointerInteractionMovement = React.useRef(0);
  const dragDelta = React.useRef(0);
  const inViewRef = React.useRef(false);
  const [ready, setReady] = React.useState(false);

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
        dark: 1,
        diffuse: 0.55,
        mapSamples: 16000,
        mapBrightness: 4.6,
        baseColor: [0.32, 0.34, 0.38],
        glowColor: [0.09, 0.11, 0.15],
        markerColor: [0.435, 1, 0.329],
        markers: [
          { location: [9.03, 38.74], size: 0.08 }, // Addis Ababa
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
        globe?.destroy();
        try {
          const ctx = (canvas.getContext("webgl2") ?? canvas.getContext("webgl")) as WebGLRenderingContext | null;
          ctx?.getExtension("WEBGL_lose_context")?.loseContext();
        } catch {
          // ignore
        }
      };
    } catch {
      // Graceful fallback if WebGL is unavailable
      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", onResize);
      };
    }
  }, [ready]);

  const onPointerDown = (clientX: number) => {
    pointerInteracting.current = clientX - pointerInteractionMovement.current;
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
  };

  const onPointerUp = () => {
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  };

  const onPointerMove = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      pointerInteractionMovement.current = clientX - pointerInteracting.current;
      dragDelta.current = pointerInteractionMovement.current / 200;
    }
  };

  return (
    <div ref={containerRef} className={`absolute inset-0 mx-auto aspect-square w-full ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="size-full cursor-grab opacity-0 transition-opacity duration-700 [contain:layout_paint_size]"
        onPointerDown={(e) => onPointerDown(e.clientX)}
        onPointerUp={onPointerUp}
        onPointerOut={onPointerUp}
        onMouseMove={(e) => onPointerMove(e.clientX)}
        onTouchMove={(e) => e.touches[0] && onPointerMove(e.touches[0].clientX)}
      />
    </div>
  );
}

