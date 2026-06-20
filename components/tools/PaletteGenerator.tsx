"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  hexToHsl,
  hslToHex,
  clamp,
} from "@/lib/color";

export default function PaletteGenerator() {
  const [base, setBase] =
    useState("#D9A441");

  const colors = useMemo(() => {
    const { h, s, l } =
      hexToHsl(base);

    return [
      hslToHex(h - 30, s, l),
      hslToHex(h - 15, s, l),
      hslToHex(h, s, l),
      hslToHex(h + 15, s, l),
      hslToHex(h + 30, s, l),
    ];
  }, [base]);

  return (
    <div className="space-y-6">
      <input
        type="color"
        value={base}
        onChange={(e) =>
          setBase(e.target.value)
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {colors.map((color) => (
          <Card
            key={color}
            className="overflow-hidden"
          >
            <div
              className="h-28"
              style={{
                background: color,
              }}
            />

            <div className="p-3 text-xs font-mono">
              {color}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}