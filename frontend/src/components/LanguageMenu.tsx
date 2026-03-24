import { Language } from "@/types/Language";
import { LanguageSelect } from "./LanguageSelect";

interface LanguageMenuProps {
  languages: Language[];
}

export function LanguageMenu({ languages }: LanguageMenuProps) {
  return <LanguageSelect data={languages} />;
}
