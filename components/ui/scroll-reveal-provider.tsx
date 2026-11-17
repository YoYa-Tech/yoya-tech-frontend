"use client";

import * as React from "react";

export function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll('[data-reveal="true"]').forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    const elements = document.querySelectorAll('[data-reveal="true"]');
    elements.forEach((el, index) => {
      (el as HTMLElement).style.setProperty("--i", String(index % 12));
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}

