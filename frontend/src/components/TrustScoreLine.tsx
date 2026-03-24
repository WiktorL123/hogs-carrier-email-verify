export interface TrustScoreLineProps {
  icon: React.ElementType;
  title: string;
  value: string | undefined | number | boolean;
  color?: string;
}

export function TrustScoreLine({
  icon: Icon,
  title,
  value,
  color,
}: TrustScoreLineProps) {
  return (
    <div className="flex gap-xs">
      <div className="flex justify-center items-center">
        <Icon className={`size-[1.4rem] ${color}`} />
      </div>
      <p className="poppins-14-600 text-text-content">{title}:</p>
      <p className="figtree-14-400 text-center md:text-start">{value}</p>
    </div>
  );
}
