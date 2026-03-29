/*PRZYKŁAD UŻYCIA
      <Label htmlFor="dane">Imie i nazwisko</Label>
      <Label required htmlFor="dane">Imie i nazwisko</Label>
      <Label className="text-amber-500" required htmlFor="dane">Imie i nazwisko</Label>
*/

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: string;
}

export function Label({
  required = false,
  children,
  className,
  ...props
}: LabelProps) {
  return (
    <label
      className={`figtree-12-400 text-dark-600 block ${className ?? ""}`}
      {...props}
    >
      {children}
      {required && <span className="pl-3xs text-danger-700">*</span>}
    </label>
  );
}
