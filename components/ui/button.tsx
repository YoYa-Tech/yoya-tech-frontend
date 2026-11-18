import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-body font-medium transition-all duration-300 ease-custom-1 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  {
    variants: {
      variant: {
        primary:
          "bg-text-secondary text-bg-canvas rounded-full hover:opacity-90 active:scale-[0.98] font-medium shadow-sm",
        accent:
          "bg-accent text-gray-deep rounded-full hover:bg-[#8cff76] active:scale-[0.98] font-medium shadow-sm",
        secondary:
          "bg-text-secondary text-bg-canvas rounded-full hover:opacity-90 active:scale-[0.98] font-medium",
        outline:
          "border border-border text-text-secondary bg-transparent hover:border-text-secondary/40 hover:bg-bg-surface active:scale-[0.98] rounded-full font-medium",
        glass:
          "border border-border/50 bg-text-secondary/10 text-text-secondary hover:bg-text-secondary/20 active:scale-[0.98] rounded-full font-medium",
        ghost:
          "bg-transparent text-text-secondary hover:bg-bg-surface rounded-md",
        nav:
          "text-text-primary hover:text-text-secondary text-[15px] font-normal transition-colors duration-200",
        pill:
          "bg-bg-surface border border-border text-text-secondary rounded-full hover:border-text-secondary/30 hover:bg-bg-surface/80",
      },
      size: {
        sm: "h-8 px-3.5 text-xs",
        md: "h-10 px-5 text-sm",
        lg: "h-11 sm:h-12 px-6 sm:px-8 text-[14px] sm:text-[15px]",
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
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const combinedClassName = cn(buttonVariants({ variant, size, className }));

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(combinedClassName, child.props.className),
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

