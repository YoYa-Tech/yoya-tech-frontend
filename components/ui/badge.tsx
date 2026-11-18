import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        accent: "bg-accent/15 text-accent border border-accent/25",
        outline: "border border-border text-text-primary bg-transparent",
        subtle: "bg-surface text-fg-muted border border-line",
        pill: "bg-surface-strong text-fg border border-line",
        greenDot: "bg-[#021533] text-accent border border-accent/30",
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs rounded-full",
        md: "px-3 py-1 text-[13px] rounded-full",
        lg: "px-4 py-1.5 text-body rounded-full",
      },
    },
    defaultVariants: {
      variant: "subtle",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

