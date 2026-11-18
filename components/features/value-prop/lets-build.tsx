"use client";

import * as React from "react";
import { LetsBuildCollision } from "./lets-build-collision";

export function LetsBuild() {
  return (
    <div className="relative bg-bg-canvas text-text-secondary">
      {/* Interactive Scroll-Driven Kinetic Collision */}
      <LetsBuildCollision />
    </div>
  );
}
