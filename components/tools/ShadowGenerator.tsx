"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";

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
    return `${x}px ${y}px ${blur}px ${spread}px rgba(${hexToRgb(
      color
    )}, ${opacity})`;
  }, [x, y, blur, spread, opacity, color]);

  const cssOutput = `box-shadow: ${shadowValue};`;

  const tailwindOutput = `shadow-[${shadowValue.replaceAll(
    " ",
    "_"
  )}]`;

  async function copy(text: string) {
    await navigator.clipboard.writeText(text);
  }

  return (
    <div className="space-y-8">

      <div className="grid gap-6">

        <div>
          <label className="block mb-2">
            Offset X ({x}px)
          </label>

          <input
            type="range"
            min="-60"
            max="60"
            value={x}
            onChange={(e) =>
              setX(Number(e.target.value))
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-2">
            Offset Y ({y}px)
          </label>

          <input
            type="range"
            min="-60"
            max="60"
            value={y}
            onChange={(e) =>
              setY(Number(e.target.value))
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-2">
            Blur ({blur}px)
          </label>

          <input
            type="range"
            min="0"
            max="120"
            value={blur}
            onChange={(e) =>
              setBlur(Number(e.target.value))
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-2">
            Spread ({spread}px)
          </label>

          <input
            type="range"
            min="-50"
            max="50"
            value={spread}
            onChange={(e) =>
              setSpread(Number(e.target.value))
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-2">
            Opacity ({Math.round(opacity * 100)}%)
          </label>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={opacity}
            onChange={(e) =>
              setOpacity(Number(e.target.value))
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-2">
            Shadow Color
          </label>

          <input
            type="color"
            value={color}
            onChange={(e) =>
              setColor(e.target.value)
            }
          />
        </div>
      </div>

      <Card className="p-10">

        <div
          className="w-48 h-48 rounded-3xl mx-auto bg-white"
          style={{
            boxShadow: shadowValue,
          }}
        />

      </Card>

      <Card className="p-4 space-y-3">

        <div>
          <p className="text-sm font-medium mb-2">
            CSS
          </p>

          <code className="block break-all text-xs">
            {cssOutput}
          </code>

          <button
            onClick={() => copy(cssOutput)}
            className="mt-2 border px-3 py-1 rounded"
          >
            Copy CSS
          </button>
        </div>

      </Card>

      <Card className="p-4 space-y-3">

        <div>
          <p className="text-sm font-medium mb-2">
            Tailwind
          </p>

          <code className="block break-all text-xs">
            {tailwindOutput}
          </code>

          <button
            onClick={() =>
              copy(tailwindOutput)
            }
            className="mt-2 border px-3 py-1 rounded"
          >
            Copy Tailwind
          </button>
        </div>

      </Card>

    </div>
  );
}