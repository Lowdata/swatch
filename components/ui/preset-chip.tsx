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
      className="px-3 py-1.5 text-xs font-medium rounded-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors shadow-sm text-neutral-700 dark:text-neutral-300"
    >
      {label}
    </button>
  );
}
