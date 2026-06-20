export function PresetChip({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-xs font-medium rounded-full bg-surface-1 border border-border hover:border-muted-foreground transition-colors shadow-sm text-foreground"
    >
      {label}
    </button>
  );
}
