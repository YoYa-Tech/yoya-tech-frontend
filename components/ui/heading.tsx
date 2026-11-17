import * as React from "react";
import { cn } from "@/lib/utils";

const headingSizes = {
  1: "text-heading md:text-heading-xl lg:text-display font-medium tracking-tight text-white",
  2: "text-heading md:text-heading-lg lg:text-heading-xl font-medium tracking-tight text-white",
  3: "text-subheading md:text-heading-sm lg:text-heading font-medium tracking-tight text-white",
  4: "text-subheading-2 md:text-subheading font-medium text-white",
} as const;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
}

export function Heading({ level = 2, className, ...props }: HeadingProps) {
  const Tag = (`h${level}` as "h1" | "h2" | "h3" | "h4");
  return (
    <Tag
      className={cn(
        "font-display text-balance leading-none",
        headingSizes[level],
        className
      )}
      {...props}
    />
  );
}

