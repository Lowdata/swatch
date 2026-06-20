export type GradientStop = {
  color: string;
  position: number;
};

export function buildGradient(
  angle: number,
  stops: GradientStop[],
  type: "linear" | "radial" = "linear",
  radialPosition: string = "center",
  radialShape: "circle" | "ellipse" = "circle"
) {
  const stopString = stops
    .sort((a, b) => a.position - b.position)
    .map(
      (stop) =>
        `${stop.color} ${stop.position}%`
    )
    .join(", ");

  if (type === "radial") {
    return `radial-gradient(${radialShape} at ${radialPosition}, ${stopString})`;
  }
  return `linear-gradient(${angle}deg, ${stopString})`;
}