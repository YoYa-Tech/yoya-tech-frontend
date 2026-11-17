import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
}

export function Container({ className, size = "default", ...props }: ContainerProps) {
  const maxWidth =
    size === "narrow"
      ? "max-w-[1100px]"
      : size === "wide"
      ? "max-w-[1420px]"
      : "max-w-[1360px]";

  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6 md:px-8", maxWidth, className)}
      {...props}
    />
  );
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  bleed?: boolean;
}

export function Section({ className, bleed = false, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        bleed ? "py-0" : "py-16 md:py-24 lg:py-32",
        className
      )}
      {...props}
    />
  );
}

