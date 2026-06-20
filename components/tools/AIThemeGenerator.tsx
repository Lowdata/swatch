"use client";

import { useState } from "react";
import { ChipPreview } from "@/components/ui/chip-preview";
import { TicketOutput } from "@/components/ui/ticket-output";
import toast from "react-hot-toast";

interface ThemeResult {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  gradient: string;
  shadow: string;
  description: string;
}

export default function AIThemeGenerator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<ThemeResult | null>(null);

  const handleGenerate = async () => {
    const wordCount = prompt.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount > 100) {
      toast.error("Please keep your description under 100 words.");
      return;
    }

    if (!prompt.trim()) {
      toast.error("Please enter a description.");
      return;
    }

    setLoading(true);
    setTheme(null);

    try {
      const res = await fetch("/api/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        toast.error(data.error || "Generation failed.");
      } else {
        setTheme(data as ThemeResult);
        toast.success("Theme generated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while generating the theme.");
    } finally {
      setLoading(false);
    }
  };

  const copyHex = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    toast.success(`${hex} copied`);
  };

  const cssOutput = theme
    ? `:root {
  --primary: ${theme.primary};
  --secondary: ${theme.secondary};
  --accent: ${theme.accent};
  --background: ${theme.background};
  --text: ${theme.text};
}`
    : "";

  const tailwindOutput = theme
    ? `colors: {
  primary: '${theme.primary}',
  secondary: '${theme.secondary}',
  accent: '${theme.accent}',
  background: '${theme.background}',
  text: '${theme.text}',
}`
    : "";

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto h-full">
      <div className="mb-2">
        <h2 className="text-3xl font-bold mb-1">AI Theme ✨</h2>
        <p className="text-foreground/90 text-lg mb-2">Describe a brand, get a full color system.</p>
        <p className="text-sm font-medium text-white">Select a quick idea below or type your own description to start.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start relative flex-1">
        {/* Controls */}
        <div className="space-y-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Luxury fashion brand, Cybersecurity SaaS, Coffee shop, Fintech startup..."
            className="w-full h-32 p-4 rounded-xl border border-border bg-input resize-none focus:ring-2 focus:ring-ring outline-none transition-all"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-muted-foreground font-medium">
              {prompt.trim().split(/\s+/).filter(Boolean).length}/100 words
            </span>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold tracking-wide hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {loading ? "Generating..." : "Generate Theme"}
        </button>

        <div className="pt-2">
          <label className="block text-sm font-medium mb-3 text-muted-foreground">Quick Ideas</label>
          <div className="flex flex-wrap gap-2">
            {["Coffee shop", "Fintech SaaS", "Fashion brand", "Crypto Wallet"].map((idea) => (
              <button
                key={idea}
                onClick={() => setPrompt(idea)}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-surface-2 border border-border hover:border-muted-foreground transition-colors shadow-sm text-foreground"
              >
                {idea}
              </button>
            ))}
          </div>
        </div>

        {theme && (
          <div className="pt-6 border-t border-border">
            <label className="block text-sm font-medium mb-3">Generated Colors</label>
            <div className="grid grid-cols-5 gap-2">
              {[
                { name: "Primary", hex: theme.primary },
                { name: "Secondary", hex: theme.secondary },
                { name: "Accent", hex: theme.accent },
                { name: "Bg", hex: theme.background },
                { name: "Text", hex: theme.text },
              ].map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div 
                    className="w-full aspect-square rounded-md shadow-sm border border-border cursor-pointer transition-transform hover:scale-105"
                    style={{ backgroundColor: c.hex }}
                    onClick={() => copyHex(c.hex)}
                    title={`Copy ${c.name}`}
                  />
                  <span className="text-[10px] font-mono text-muted-foreground">{c.hex}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Preview & Output */}
      <div className="flex flex-col min-h-full">
        {theme ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full relative pb-4">
            <div className="mb-8">
              <p className="text-sm italic text-muted-foreground border-l-2 border-border pl-4">
                &quot;{theme.description}&quot;
              </p>
            </div>
            
            <ChipPreview 
              style={{ background: theme.gradient, boxShadow: theme.shadow }}
              innerClassName="flex flex-col overflow-hidden relative p-6"
            >
              <div className="flex-1 flex flex-col z-10" style={{ color: theme.text }}>
                <h3 className="text-2xl font-bold mb-1">Brand Name</h3>
                <p className="text-sm opacity-80 mb-6">Tagline goes here</p>
                
                <div className="mt-auto space-y-3">
                  <button className="px-5 py-2.5 text-sm font-semibold rounded-md shadow-sm w-full" style={{ background: theme.primary, color: theme.background }}>
                    Primary CTA
                  </button>
                  <button className="px-5 py-2.5 text-sm font-semibold rounded-md w-full border" style={{ background: theme.secondary, color: theme.text, borderColor: theme.text }}>
                    Secondary
                  </button>
                </div>
              </div>
            </ChipPreview>

            <div className="flex flex-wrap gap-3 mt-8 justify-center">
              {[
                { name: "Primary", hex: theme.primary },
                { name: "Secondary", hex: theme.secondary },
                { name: "Accent", hex: theme.accent },
                { name: "Background", hex: theme.background },
                { name: "Text", hex: theme.text },
              ].map((c) => (
                <button
                  key={c.name}
                  onClick={() => copyHex(c.hex)}
                  className="group flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-surface-2 transition-colors"
                  title={`Copy ${c.name} HEX`}
                >
                  <div className="w-8 h-8 rounded-full border border-border shadow-sm" style={{ background: c.hex }} />
                  <span className="text-[10px] font-mono font-medium text-muted-foreground group-hover:text-foreground transition-colors">{c.hex}</span>
                </button>
              ))}
            </div>

            <div className="sticky bottom-4 z-10 mt-8">
              <TicketOutput css={cssOutput} tailwind={tailwindOutput} />
            </div>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-2xl bg-card">
            <p className="text-muted-foreground font-medium text-sm">Theme preview will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
