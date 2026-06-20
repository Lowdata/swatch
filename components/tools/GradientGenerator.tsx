"use client";

import { useMemo, useState } from "react";
import { ChipPreview } from "@/components/ui/chip-preview";
import { TicketOutput } from "@/components/ui/ticket-output";
import { PresetChip } from "@/components/ui/preset-chip";
import { buildGradient } from "@/lib/gradient";

export default function GradientGenerator() {
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState([
    { color: "#D9A441", position: 0 },
    { color: "#7C9885", position: 100 },
  ]);

  const gradient = useMemo(() => {
    return buildGradient(angle, stops);
  }, [angle, stops]);

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start max-w-6xl mx-auto">
      {/* Controls */}
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Presets</h2>
          <div className="flex flex-wrap gap-2">
            {["Sunset", "Ocean", "Aurora", "Ink Fade", "Sage Mist"].map((p) => (
              <PresetChip key={p} label={p} onClick={() => applyPreset(p)} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold mb-4">Adjustments</h2>
          
          <div>
            <label className="flex justify-between text-sm font-medium mb-2">
              <span>Angle</span>
              <span className="text-neutral-500">{angle}°</span>
            </label>
            <input
              type="range"
              min="0" max="360"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full accent-black dark:accent-white"
            />
          </div>

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
      <div className="sticky top-12">
        <ChipPreview style={{ background: gradient }} />
        <TicketOutput css={cssOutput} tailwind={tailwindOutput} />
      </div>
    </div>
  );
}