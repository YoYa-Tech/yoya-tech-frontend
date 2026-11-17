import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-body font-medium transition-all duration-300 ease-custom-1 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-gray-deep rounded-full hover:bg-[color-mix(in_srgb,var(--kuru-primary)_82%,#ffffff)] active:scale-98 font-semibold shadow-sm",
        secondary:
          "bg-white text-gray-deep rounded-full hover:bg-gray-light active:scale-98 font-semibold",
        outline:
          "border border-border text-text-secondary bg-transparent hover:bg-white/5 active:scale-98 rounded-full",
        ghost:
          "bg-transparent text-text-secondary hover:text-white hover:bg-white/5 rounded-md",
        nav:
          "text-text-primary hover:text-white text-[15px] font-normal transition-colors duration-200",
        pill:
          "bg-[#141414] border border-border text-text-secondary rounded-full hover:border-white/30 hover:bg-[#1f1f1f]",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4.5 text-body",
        lg: "h-12 px-6 text-[15px]",
        icon: "h-10 w-10 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

