"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { buildGradient } from "@/lib/gradient";

export default function GradientGenerator() {
  const [angle, setAngle] =
    useState(135);

  const [stops, setStops] =
    useState([
      {
        color: "#D9A441",
        position: 0,
      },
      {
        color: "#7C9885",
        position: 100,
      },
    ]);

  const gradient = useMemo(() => {
    return buildGradient(
      angle,
      stops
    );
  }, [angle, stops]);

  const updateColor = (
    index: number,
    value: string
  ) => {
    const copy = [...stops];

    copy[index].color = value;

    setStops(copy);
  };

  return (
    <div className="space-y-6">

      <div>

        <label>
          Angle: {angle}°
        </label>

        <input
          type="range"
          min="0"
          max="360"
          value={angle}
          onChange={(e) =>
            setAngle(
              Number(e.target.value)
            )
          }
          className="w-full"
        />

      </div>

      <div className="flex gap-4">

        {stops.map(
          (stop, index) => (
            <input
              key={index}
              type="color"
              value={stop.color}
              onChange={(e) =>
                updateColor(
                  index,
                  e.target.value
                )
              }
            />
          )
        )}

      </div>

      <Card className="p-6">

        <div
          className="h-64 rounded-xl"
          style={{
            background: gradient,
          }}
        />

      </Card>

      <Card className="p-4">

        <p className="font-mono text-sm break-all">
          {gradient}
        </p>

      </Card>

    </div>
  );
}