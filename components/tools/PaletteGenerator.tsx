"use client";

import { useMemo, useState } from "react";
import { hexToHsl, hslToHex } from "@/lib/color";
import { ChipPreview } from "@/components/ui/chip-preview";
import { TicketOutput } from "@/components/ui/ticket-output";
import { PresetChip } from "@/components/ui/preset-chip";

export default function PaletteGenerator() {
  const [base, setBase] = useState("#D9A441");

  const colors = useMemo(() => {
    const { h, s, l } = hexToHsl(base);
    return [
      hslToHex(h - 30, s, l),
      hslToHex(h - 15, s, l),
      hslToHex(h, s, l),
      hslToHex(h + 15, s, l),
      hslToHex(h + 30, s, l),
    ];
  }, [base]);

  const cssOutput = `:root {\n${colors.map((c, i) => `  --swatch-${i + 1}: ${c};`).join("\n")}\n}`;
  const tailwindOutput = `colors: {\n${colors.map((c, i) => `  'swatch-${i + 1}': '${c}',`).join("\n")}\n}`;

  const applyPreset = (preset: string) => {
    switch (preset) {
      case "Luxury": setBase("#C5A059"); break;
      case "Coffee": setBase("#6F4E37"); break;
      case "Cyber": setBase("#00FF41"); break;
      case "Nature": setBase("#2E8B57"); break;
      case "Editorial": setBase("#F4F4F0"); break; // Actually, this is very bright, maybe a slightly darker editorial color
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start max-w-6xl mx-auto">
      {/* Controls */}
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Presets</h2>
          <div className="flex flex-wrap gap-2">
            {["Luxury", "Coffee", "Cyber", "Nature", "Editorial"].map((p) => (
              <PresetChip key={p} label={p} onClick={() => applyPreset(p)} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold mb-4">Adjustments</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Base Color</label>
            <input
              type="color"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="w-full h-12 rounded-md cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Preview & Output */}
      <div className="sticky top-12">
        <ChipPreview innerClassName="flex flex-col overflow-hidden">
          {colors.map((color, idx) => (
            <div 
              key={idx} 
              className="flex-1 flex items-center px-4"
              style={{ background: color }}
            >
              <span className="text-xs font-mono font-medium mix-blend-difference text-white opacity-80">
                {color}
              </span>
            </div>
          ))}
        </ChipPreview>
        <TicketOutput css={cssOutput} tailwind={tailwindOutput} />
      </div>
    </div>
  );
}