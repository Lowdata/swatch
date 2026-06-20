export type GradientStop = {
  color: string;
  position: number;
};

export function buildGradient(
  angle: number,
  stops: GradientStop[]
) {
  const stopString = stops
    .sort((a, b) => a.position - b.position)
    .map(
      (stop) =>
        `${stop.color} ${stop.position}%`
    )
    .join(", ");

  return `linear-gradient(${angle}deg, ${stopString})`;
}