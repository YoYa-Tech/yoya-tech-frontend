import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToolIconProps extends React.SVGProps<SVGSVGElement> {
  slug: string;
  className?: string;
  size?: number;
}

/**
 * Renders an official tech mark from /kuru/images/tools.svg sprite.
 * Supports all 51 modern engineering tools:
 * nextdotjs, react, typescript, nodedotjs, tailwindcss, flutter, laravel, django,
 * fastapi, supabase, postgresql, mongodb, figma, claude, n8n, make, python, etc.
 */
export function ToolIcon({ slug, className, size = 20, ...props }: ToolIconProps) {
  return (
    <svg
      className={cn("shrink-0 inline-block fill-current", className)}
      style={{ width: size, height: size }}
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <use href={`/kuru/images/tools.svg#${slug}`} />
    </svg>
  );
}

