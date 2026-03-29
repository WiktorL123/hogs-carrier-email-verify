import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const locales = [
  "en",
  "bg",
  "cz",
  "de",
  "dk",
  "es",
  "fin",
  "fr",
  "gr",
  "hr",
  "it",
  "lt",
  "nl",
  "pl",
  "pt",
  "ro",
  "ru",
  "se",
  "sk",
  "tr",
  "ua",
] as const;

export const routing = defineRouting({
  locales: locales,
  defaultLocale: "en",
  localePrefix: "always",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
