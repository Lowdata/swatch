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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start max-w-6xl mx-auto">
      {/* Controls */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-2">AI Theme Generator</h2>
          <p className="text-sm text-neutral-500 mb-6">
            Describe your business, website, app or startup in under 100 words to generate a complete design system.
          </p>
          
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Luxury fashion brand, Cybersecurity SaaS, Coffee shop, Fintech startup..."
            className="w-full h-32 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 resize-none focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-neutral-400 font-medium">
              {prompt.trim().split(/\s+/).filter(Boolean).length}/100 words
            </span>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black font-semibold tracking-wide hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {loading ? "Generating..." : "Generate Theme"}
        </button>
      </div>

      {/* Preview & Output */}
      <div className="sticky top-12">
        {theme ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <p className="text-sm italic text-neutral-600 dark:text-neutral-400 border-l-2 border-neutral-300 dark:border-neutral-700 pl-4">
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
                  className="group flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                  title={`Copy ${c.name} HEX`}
                >
                  <div className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 shadow-sm" style={{ background: c.hex }} />
                  <span className="text-[10px] font-mono font-medium text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">{c.hex}</span>
                </button>
              ))}
            </div>

            <TicketOutput css={cssOutput} tailwind={tailwindOutput} />
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl">
            <p className="text-neutral-400 font-medium text-sm">Theme preview will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
