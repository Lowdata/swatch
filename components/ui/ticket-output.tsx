"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface TicketOutputProps {
  css: string;
  tailwind: string;
}

export function TicketOutput({ css, tailwind }: TicketOutputProps) {
  const [copiedCss, setCopiedCss] = useState(false);
  const [copiedTw, setCopiedTw] = useState(false);

  const copy = async (text: string, type: "css" | "tw") => {
    await navigator.clipboard.writeText(text);
    if (type === "css") {
      setCopiedCss(true);
      setTimeout(() => setCopiedCss(false), 2000);
      toast.success("CSS copied to clipboard");
    } else {
      setCopiedTw(true);
      setTimeout(() => setCopiedTw(false), 2000);
      toast.success("Tailwind copied to clipboard");
    }
  };

  return (
    <div className="relative mt-12 bg-card border border-border rounded-lg shadow-sm">
      {/* Perforated top edge */}
      <div className="absolute top-0 left-0 w-full h-3 -mt-[6px] overflow-hidden flex justify-around px-2">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="w-3 h-3 rounded-full bg-surface-2 border border-border" />
        ))}
      </div>

      <div className="p-6 pt-8 space-y-6">
        {/* CSS Row */}
        {css && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">CSS</span>
              <button
                onClick={() => copy(css, "css")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Copy CSS"
              >
                {copiedCss ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <pre className="block p-4 bg-surface-2 rounded-md border border-border text-sm font-mono text-foreground overflow-x-auto whitespace-pre-wrap">
              {css}
            </pre>
          </div>
        )}

        {/* Tailwind Row */}
        {tailwind && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Tailwind</span>
              <button
                onClick={() => copy(tailwind, "tw")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Copy Tailwind"
              >
                {copiedTw ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <pre className="block p-4 bg-surface-2 rounded-md border border-border text-sm font-mono text-foreground overflow-x-auto whitespace-pre-wrap">
              {tailwind}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
