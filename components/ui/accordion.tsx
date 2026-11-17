"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (id: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string[];
}

export function Accordion({
  children,
  className,
  type = "single",
  defaultValue = [],
  ...props
}: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(defaultValue);

  const toggleItem = React.useCallback(
    (id: string) => {
      setOpenItems((prev) => {
        if (type === "single") {
          return prev.includes(id) ? [] : [id];
        } else {
          return prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
        }
      });
    },
    [type]
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn("divide-y divide-border/60", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  return (
    <div className={cn("py-2 transition-colors", className)} {...props} data-value={value}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ value?: string }>, { value });
        }
        return child;
      })}
    </div>
  );
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
}

export function AccordionTrigger({
  value = "",
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionTrigger must be used within an Accordion");

  const isOpen = context.openItems.includes(value);

  return (
    <button
      type="button"
      onClick={() => context.toggleItem(value)}
      aria-expanded={isOpen}
      className={cn(
        "flex w-full items-center justify-between py-4 text-left text-body md:text-subheading-3 font-medium text-text-secondary transition-all hover:text-white",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-text-muted transition-transform duration-300 ease-custom-1",
          isOpen && "rotate-180 text-accent"
        )}
      />
    </button>
  );
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
}

export function AccordionContent({
  value = "",
  className,
  children,
  ...props
}: AccordionContentProps) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionContent must be used within an Accordion");

  const isOpen = context.openItems.includes(value);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "pb-4 text-body text-text-muted leading-relaxed transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

