export interface RatingScoreLineProps {
  title: string;
  value: string | undefined | number | boolean;
  color?: string;
}

export function RatingScoreLine({ title, value }: RatingScoreLineProps) {
  return (
    <div className="flex flex-col">
      <p className="poppins-14-600 text-nowrap">{title}:</p>
      <p className="figtree-14-400 md:text-start">{value ? value : 0}</p>
    </div>
  );
}
