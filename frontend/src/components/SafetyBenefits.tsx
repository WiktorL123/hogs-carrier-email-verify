"use client";

import { CheckIcon } from "@heroicons/react/16/solid";
import Button from "./Button";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import Underline from "./animated/Underline";
import ScrollReveal from "./animated/ScrollReveal";
import DelayedScrollReveal from "./animated/DelayedScrollReveal";
import ScrollSlideReveal from "./animated/ScrollSlideReveal";
import { useLenis } from "@/providers/LenisProvider";
import { useTranslations } from "next-intl";

export function SafetyBenefits() {
  const t = useTranslations("SafetyBenefits");
  const context = useContext(ThemeContext);
  const lenis = useLenis();

  if (!context) {
    return (
      <header className="h-[8vh] bg-base-200 px-md xs:px-3xl py-md flex justify-between opacity-0" />
    );
  }

  const { theme } = context;

  return (
    <div className="grid grid-cols-1 smallTablet:grid-cols-1 lg:grid-cols-2 gap-5xl">
      <div className="relative aspect-[4/3] order-1 lg:order-0 self-end">
        <motion.img
          src={`${
            theme === "light" ? "images/darkImage.png" : "images/lightImage.png"
          }`}
          className="rounded-4xl absolute left-1/2 -translate-x-1/2 z-10 w-[65%] h-[95%]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <ScrollSlideReveal distance={500}>
          <svg
            viewBox="0 0 600 500"
            xmlns="http://www.w3.org/2000/svg"
            className="scale-90 translate-y-[10%]"
          >
            <path
              d="M193.126 435.904L9.46889 104.156C-16.3477 57.5221 17.3517 0.294854 70.6547 0.252273L345.179 0.0329741C370.648 0.0126283 394.119 13.8275 406.463 36.1053L590.412 368.072C616.265 414.728 582.523 472 529.184 472H254.367C228.908 472 205.456 458.177 193.126 435.904Z"
              className="fill-[#BFF678]"
            />
          </svg>
        </ScrollSlideReveal>
      </div>
      <div className="flex flex-col gap-3xl">
        <div>
          <h2 className="poppins-28-600">{t("title")}</h2>
          <Underline />
        </div>
        <ScrollReveal>
          <ul className="space-y-3 font-figtree font-normal text-[1.4rem] sm:text-[1.8rem] md:text-[1.8rem] 2xl:text-[2rem] 3xl:text-[2.4rem] ">
            <li className="flex gap-2xs items-center">
              <CheckIcon className="size-[2.4rem] flex-none self-start text-mainAccent-blue" />
              <p className="">{t("firstListItem")}</p>
            </li>
            <li className="flex gap-2xs items-center">
              <CheckIcon className="size-[2.4rem] flex-none self-start text-mainAccent-blue" />
              <p className="">{t("secondListItem")} </p>
            </li>
            <li className="flex gap-2xs items-center">
              <CheckIcon className="size-[2.4rem] flex-none self-start text-mainAccent-blue" />
              <p className="">{t("thirdListItem")}</p>
            </li>
            <li className="flex gap-2xs items-center">
              <CheckIcon className="size-[2.4rem] flex-none self-start text-mainAccent-blue" />
              <p className="">{t("fourthListItem")}</p>
            </li>
          </ul>
        </ScrollReveal>
        <DelayedScrollReveal delay={500}>
          <Button
            variant="primary"
            size="MD"
            className="w-[18rem] self-center lg:self-auto"
            onClick={() => {
              if (lenis) {
                lenis.scrollTo(0, {
                  duration: 1.2,
                  easing: (t: number) =>
                    Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            {t("buttonTitle")}
          </Button>
        </DelayedScrollReveal>
      </div>
    </div>
  );
}
