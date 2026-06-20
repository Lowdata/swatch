"use client";

import { useMemo, useState } from "react";
import { ChipPreview } from "@/components/ui/chip-preview";
import { TicketOutput } from "@/components/ui/ticket-output";
import { PresetChip } from "@/components/ui/preset-chip";
import { buildGradient } from "@/lib/gradient";

export default function GradientGenerator() {
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [radialPosition, setRadialPosition] = useState("center");
  const [radialShape, setRadialShape] = useState<"circle" | "ellipse">("circle");
  const [stops, setStops] = useState([
    { color: "#D9A441", position: 0 },
    { color: "#7C9885", position: 100 },
  ]);

  const gradient = useMemo(() => {
    return buildGradient(angle, stops, type, radialPosition, radialShape);
  }, [angle, stops, type, radialPosition, radialShape]);

  const cssOutput = `background: ${gradient};`;
  const tailwindOutput = `bg-[${gradient.replaceAll(" ", "_")}]`;

  const updateColor = (index: number, value: string) => {
    const copy = [...stops];
    copy[index].color = value;
    setStops(copy);
  };

  const applyPreset = (preset: string) => {
    switch (preset) {
      case "Sunset":
        setAngle(135); setStops([{ color: "#ff7e5f", position: 0 }, { color: "#feb47b", position: 100 }]);
        break;
      case "Ocean":
        setAngle(90); setStops([{ color: "#2E3192", position: 0 }, { color: "#1BFFFF", position: 100 }]);
        break;
      case "Aurora":
        setAngle(45); setStops([{ color: "#00c6ff", position: 0 }, { color: "#0072ff", position: 100 }]);
        break;
      case "Ink Fade":
        setAngle(180); setStops([{ color: "#0f2027", position: 0 }, { color: "#203a43", position: 50 }, { color: "#2c5364", position: 100 }]);
        break;
      case "Sage Mist":
        setAngle(135); setStops([{ color: "#A8B8A6", position: 0 }, { color: "#D1D5D0", position: 100 }]);
        break;
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto h-full">
      <div className="mb-2">
        <h2 className="text-3xl font-bold mb-1">Gradient</h2>
        <p className="text-foreground/90 text-lg mb-2">Blend colors into linear or radial gradients.</p>
        <p className="text-sm font-medium text-white">Pick two colors and an angle, or start from a preset.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start relative flex-1">
        {/* Controls */}
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-3 text-muted-foreground">Start here</label>
            <h2 className="text-xl font-bold mb-4">Presets</h2>
            <div className="flex flex-wrap gap-2">
              {["Sunset", "Ocean", "Aurora", "Ink Fade", "Sage Mist"].map((p) => (
                <PresetChip key={p} label={p} onClick={() => applyPreset(p)} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Adjustments</h2>
            
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setType("linear")}
                className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${type === "linear" ? "bg-primary text-primary-foreground border-primary" : "bg-surface-2 border-border text-muted-foreground hover:text-foreground"}`}
              >
                Linear
              </button>
              <button
                onClick={() => setType("radial")}
                className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${type === "radial" ? "bg-primary text-primary-foreground border-primary" : "bg-surface-2 border-border text-muted-foreground hover:text-foreground"}`}
              >
                Radial
              </button>
            </div>

            {type === "linear" ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Angle <span className="text-xs font-normal text-muted-foreground ml-1">(controls the direction of the color blend)</span></label>
                  <span className="text-sm text-muted-foreground">{angle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-4">
                  <label className="text-sm font-medium">Shape <span className="text-xs font-normal text-muted-foreground ml-1">(circle or ellipse)</span></label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setRadialShape("circle")}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${radialShape === "circle" ? "bg-surface-2 text-foreground border-accent" : "bg-transparent border-border text-muted-foreground hover:text-foreground"}`}
                    >
                      Circle
                    </button>
                    <button
                      onClick={() => setRadialShape("ellipse")}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${radialShape === "ellipse" ? "bg-surface-2 text-foreground border-accent" : "bg-transparent border-border text-muted-foreground hover:text-foreground"}`}
                    >
                      Ellipse
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium mb-2">Position <span className="text-xs font-normal text-muted-foreground ml-1">(origin of the blend)</span></label>
                  <select 
                    value={radialPosition}
                    onChange={(e) => setRadialPosition(e.target.value)}
                    className="w-full p-3 rounded-lg border border-border bg-input text-foreground outline-none focus:border-accent transition-colors"
                  >
                    <option value="center">Center</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="top left">Top Left</option>
                    <option value="top right">Top Right</option>
                    <option value="bottom left">Bottom Left</option>
                    <option value="bottom right">Bottom Right</option>
                  </select>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <label className="block text-sm font-medium">Color Stops</label>
              <div className="flex gap-4">
                {stops.map((stop, index) => (
                  <div key={index} className="flex-1">
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) => updateColor(index, e.target.value)}
                      className="w-full h-12 rounded-md cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preview & Output */}
        <div className="flex flex-col min-h-full">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full relative pb-4">
            <ChipPreview style={{ background: gradient }} />
            
            <div className="sticky bottom-4 z-10 mt-8">
              <TicketOutput css={cssOutput} tailwind={tailwindOutput} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}