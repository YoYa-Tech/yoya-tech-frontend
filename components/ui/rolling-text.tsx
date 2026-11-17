"use client";

import * as React from "react";

interface RollingTextProps {
  text: string;
  className?: string;
}

export function RollingText({ text, className = "" }: RollingTextProps) {
  const clean = text.replace(/\s+/g, " ").trim();

  return (
    <span className={`inline-block relative overflow-hidden align-middle ${className}`}>
      {/* Screen reader only accessibility */}
      <span className="sr-only">{clean}</span>

      {/* Signature Kuru desktop hover character roll */}
      <span aria-hidden="true" className="vv-roll">
        {[...clean].map((char, idx) => (
          <span
            key={idx}
            className="vv-roll-char"
            style={{ "--i": idx } as React.CSSProperties}
          >
            <span>{char === " " ? "\u00A0" : char}</span>
            <span>{char === " " ? "\u00A0" : char}</span>
          </span>
        ))}
      </span>
    </span>
  );
}

