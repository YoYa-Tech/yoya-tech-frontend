"use client";

import * as React from "react";
import { LetsBuildCollision } from "./lets-build-collision";

export function LetsBuild() {
  return (
    <div className="relative bg-black text-white">
      {/* Interactive Scroll-Driven Kinetic Collision */}
      <LetsBuildCollision />
    </div>
  );
}
