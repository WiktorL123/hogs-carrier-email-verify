"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Language } from "@/types/Language";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/navigation";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  data: Language[];
  variant?: "" | "input";
  defaultCountry?: string;
}

export function LanguageSelect({ data }: SelectProps) {
  const [isShownOptions, setIsShownOptions] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentSymbol = locale.toUpperCase();
  const isDisabled = data.length === 1;

  const handleLanguageChange = (symbolFromData: string) => {
    const nextLocale = symbolFromData.toLowerCase() as any;
    router.replace(pathname, { locale: nextLocale });
    setIsShownOptions(false);
  };

  return (
    <div
      className="max-w-[24rem] relative"
      onMouseEnter={() => !isDisabled && setIsShownOptions(true)}
      onMouseLeave={() => setIsShownOptions(false)}
    >
      <div
        className={`flex items-center justify-between gap-sm px-2xs py-2xs w-full 
        ${isShownOptions ? "rounded-none" : "rounded-[0.4rem]"} 
         group
        ${isDisabled ? "opacity-60 cursor-default" : "hover:cursor-pointer"}`}
        onClick={() => !isDisabled && setIsShownOptions((prev) => !prev)}
      >
        <p
          className={`text-text-content figtree-14-400 ${!isDisabled && "group-hover:text-dark"}`}
        >
          {currentSymbol}
        </p>

        <ChevronDownIcon className="w-md h-md text-mainAccent-blue stroke-3" />
      </div>

      {isShownOptions && !isDisabled && (
        <div className="absolute w-full flex flex-col items-center border-t-0 z-10 shadow-lg">
          <div
            data-lenis-prevent="true"
            className="lang-dropdown py-xs pl-2xs flex flex-col gap-sm max-h-[17rem] overflow-y-auto overscroll-y-contain custom-scrollbar self-start w-full"
          >
            {data.map((d) => (
              <div
                key={d.id}
                className="group"
                onClick={() => handleLanguageChange(d.symbol)}
              >
                <p className="figtree-12-400 cursor-pointer text-text-content py-1">
                  {d.symbol}
                </p>
                <span className="opacity-0 group-hover:opacity-100 block w-[45%] h-[0.3rem] rounded-full bg-primary-500 transition-all ease-in-out duration-200"></span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
