"use client";

import { SunIcon, MoonIcon } from "./CustomIcons";
import { useContext, useEffect, useRef } from "react";
import { Logo } from "./Logo";
import { ThemeContext } from "@/context/ThemeContext";
import { LanguageMenu } from "./LanguageMenu";
import { languages } from "@/mocks/languageData";

export function Header() {
  const context = useContext(ThemeContext);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const preventScroll = (e: WheelEvent | TouchEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest(".lang-dropdown")) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
    };

    header.addEventListener("wheel", preventScroll, { passive: false });
    header.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      header.removeEventListener("wheel", preventScroll);
      header.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`h-[8vh] bg-site-bg px-md md:px-lg 2xl:px-4xl py-md flex justify-between duration-500 sticky top-0 z-50 ${
        !context ? "opacity-0" : "opacity-100"
      }`}
    >
      {context && (
        <>
          <div className="min-h-[2.5rem] flex justify-center items-center md:pl-3xl">
            <Logo variant={context.theme} />
          </div>

          <div className="flex items-center gap-xl">
            <LanguageMenu languages={languages} />
          </div>
        </>
      )}
    </header>
  );
}
