"use client";

import { useMemo, useState } from "react";
import { ChipPreview } from "@/components/ui/chip-preview";
import { TicketOutput } from "@/components/ui/ticket-output";
import { PresetChip } from "@/components/ui/preset-chip";

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

export default function ShadowGenerator() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(12);
  const [blur, setBlur] = useState(30);
  const [spread, setSpread] = useState(0);
  const [opacity, setOpacity] = useState(0.25);
  const [color, setColor] = useState("#000000");

  const shadowValue = useMemo(() => {
    return `${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(color)}, ${opacity})`;
  }, [x, y, blur, spread, opacity, color]);

  const cssOutput = `box-shadow: ${shadowValue};`;
  const tailwindOutput = `shadow-[${shadowValue.replaceAll(" ", "_")}]`;

  const applyPreset = (preset: string) => {
    switch (preset) {
      case "Soft":
        setX(0); setY(4); setBlur(14); setSpread(0); setOpacity(0.1); setColor("#000000");
        break;
      case "Hard":
        setX(8); setY(8); setBlur(0); setSpread(0); setOpacity(1); setColor("#000000");
        break;
      case "Glass":
        setX(0); setY(8); setBlur(32); setSpread(0); setOpacity(0.15); setColor("#ffffff");
        break;
      case "Neumorphism":
        setX(20); setY(20); setBlur(60); setSpread(0); setOpacity(0.1); setColor("#000000"); // Simplified single shadow for demo
        break;
      case "Layered":
        setX(0); setY(14); setBlur(28); setSpread(0); setOpacity(0.25); setColor("#000000");
        break;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start max-w-6xl mx-auto">
      {/* Controls */}
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Presets</h2>
          <div className="flex flex-wrap gap-2">
            {["Soft", "Hard", "Glass", "Neumorphism", "Layered"].map((p) => (
              <PresetChip key={p} label={p} onClick={() => applyPreset(p)} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold mb-4">Adjustments</h2>
          
          <div>
            <label className="flex justify-between text-sm font-medium mb-2">
              <span>Offset X</span>
              <span className="text-neutral-500">{x}px</span>
            </label>
            <input
              type="range"
              min="-60" max="60"
              value={x}
              onChange={(e) => setX(Number(e.target.value))}
              className="w-full accent-black dark:accent-white"
            />
          </div>

          <div>
            <label className="flex justify-between text-sm font-medium mb-2">
              <span>Offset Y</span>
              <span className="text-neutral-500">{y}px</span>
            </label>
            <input
              type="range"
              min="-60" max="60"
              value={y}
              onChange={(e) => setY(Number(e.target.value))}
              className="w-full accent-black dark:accent-white"
            />
          </div>

          <div>
            <label className="flex justify-between text-sm font-medium mb-2">
              <span>Blur</span>
              <span className="text-neutral-500">{blur}px</span>
            </label>
            <input
              type="range"
              min="0" max="120"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full accent-black dark:accent-white"
            />
          </div>

          <div>
            <label className="flex justify-between text-sm font-medium mb-2">
              <span>Spread</span>
              <span className="text-neutral-500">{spread}px</span>
            </label>
            <input
              type="range"
              min="-50" max="50"
              value={spread}
              onChange={(e) => setSpread(Number(e.target.value))}
              className="w-full accent-black dark:accent-white"
            />
          </div>

          <div>
            <label className="flex justify-between text-sm font-medium mb-2">
              <span>Opacity</span>
              <span className="text-neutral-500">{Math.round(opacity * 100)}%</span>
            </label>
            <input
              type="range"
              min="0" max="1" step="0.01"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full accent-black dark:accent-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Shadow Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Preview & Output */}
      <div className="sticky top-12">
        <ChipPreview style={{ boxShadow: shadowValue }} />
        <TicketOutput css={cssOutput} tailwind={tailwindOutput} />
      </div>
    </div>
  );
}