export type ShadowLayer = {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset?: boolean;
};

export function buildShadow(
  layers: ShadowLayer[]
) {
  return layers
    .map(
      (l) =>
        `${l.inset ? "inset " : ""}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px rgba(${hexToRgb(
          l.color
        )}, ${l.opacity})`
    )
    .join(", ");
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");

  const bigint = parseInt(clean, 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
}