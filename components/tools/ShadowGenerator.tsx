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
      case "Neumorphic":
        setX(20); setY(20); setBlur(60); setSpread(0); setOpacity(0.1); setColor("#000000");
        break;
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto h-full">
      <div className="mb-2">
        <h2 className="text-3xl font-bold mb-1">Shadow</h2>
        <p className="text-muted-foreground text-lg mb-2">Layer and tune box-shadow values.</p>
        <p className="text-sm font-medium text-accent">Start from a preset below, then drag any slider to adjust it.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start relative flex-1">
        {/* Controls */}
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-3 text-muted-foreground">Start here</label>
            <h2 className="text-xl font-bold mb-4">Presets</h2>
            <div className="flex flex-wrap gap-2">
              {["Soft", "Hard", "Float", "Glass", "Neumorphic"].map((p) => (
                <PresetChip key={p} label={p} onClick={() => applyPreset(p)} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Adjustments</h2>
            
            <div>
              <label className="flex justify-between text-sm font-medium mb-2">
                <span>Offset X</span>
                <span className="text-muted-foreground">{x}px</span>
              </label>
              <input
                type="range"
                min="-60" max="60"
                value={x}
                onChange={(e) => setX(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm font-medium mb-2">
                <span>Offset Y</span>
                <span className="text-muted-foreground">{y}px</span>
              </label>
              <input
                type="range"
                min="-60" max="60"
                value={y}
                onChange={(e) => setY(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Blur <span className="text-xs font-normal text-muted-foreground ml-1">(softness of the shadow)</span></label>
                <span className="text-sm text-muted-foreground">{blur}px</span>
              </div>
              <input type="range" min="0" max="100" value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full accent-primary" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Spread <span className="text-xs font-normal text-muted-foreground ml-1">(grows or shrinks the edge)</span></label>
                <span className="text-sm text-muted-foreground">{spread}px</span>
              </div>
              <input type="range" min="-50" max="50" value={spread} onChange={(e) => setSpread(Number(e.target.value))} className="w-full accent-primary" />
            </div>

            <div>
              <label className="flex justify-between text-sm font-medium mb-2">
                <span>Opacity</span>
                <span className="text-muted-foreground">{Math.round(opacity * 100)}%</span>
              </label>
              <input
                type="range"
                min="0" max="1" step="0.01"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full accent-primary"
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
        <div className="flex flex-col min-h-full">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full relative pb-4">
            <ChipPreview 
              innerClassName="bg-card"
              style={{ boxShadow: shadowValue }} 
            />
            
            <div className="sticky bottom-4 z-10 mt-8">
              <TicketOutput css={cssOutput} tailwind={tailwindOutput} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}