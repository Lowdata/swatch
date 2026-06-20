import { cn } from "@/lib/utils";
import React from "react";

export function ChipPreview({
  children,
  className,
  style,
  innerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  innerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 w-full max-w-[280px] mx-auto aspect-[3/4] flex flex-col",
        className
      )}
    >
      {/* Punch hole */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-neutral-50 dark:bg-neutral-900 shadow-inner z-10 border border-neutral-200 dark:border-neutral-800" />
      
      {/* The actual colored/styled area */}
      <div 
        className={cn("flex-1 rounded-xl w-full mt-8", innerClassName)}
        style={style}
      >
        {children}
      </div>
      
      {/* Optional bottom space for text like a real paint chip */}
      <div className="pt-4 pb-2 px-2 flex justify-between items-end opacity-50">
        <div className="h-2 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
        <div className="h-2 w-8 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
      </div>
    </div>
  );
}
