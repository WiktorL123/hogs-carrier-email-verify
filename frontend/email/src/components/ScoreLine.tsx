export interface ScoreLineProps {
  icon: React.ElementType;
  title: string;
  value: string | undefined | number | boolean;
  color?: string;
}

export function ScoreLine({ icon: Icon, title, value, color }: ScoreLineProps) {
  return (
    <div className="flex gap-sm sm:gap-xs">
      <div className="flex items-center pt-0 sm:pt-[0.3rem] sm:items-start">
        <Icon className={`size-lg sm:size-[1.4rem] ${color}`} />
      </div>
      <div className="flex flex-col flex-wrap sm:flex-row sm:gap-2xs">
        <p className="poppins-14-600 text-text-content text-nowrap">{title}:</p>
        <p className="figtree-14-400">{value}</p>
      </div>
    </div>
  );
}
