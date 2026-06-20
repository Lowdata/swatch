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
        "relative overflow-hidden rounded-2xl shadow-sm border border-border bg-card p-4 w-full max-w-[280px] mx-auto aspect-[3/4] flex flex-col",
        className
      )}
    >
      {/* Punch hole */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-surface-2 shadow-inner z-10 border border-border" />
      
      {/* The actual colored/styled area */}
      <div 
        className={cn("flex-1 rounded-xl w-full mt-8", innerClassName)}
        style={style}
      >
        {children}
      </div>
      
      {/* Optional bottom space for text like a real paint chip */}
      <div className="pt-4 pb-2 px-2 flex justify-between items-end opacity-50">
        <div className="h-2 w-16 bg-surface-2 rounded-full" />
        <div className="h-2 w-8 bg-surface-2 rounded-full" />
      </div>
    </div>
  );
}
