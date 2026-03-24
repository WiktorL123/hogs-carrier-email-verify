"use client";
import { useContext, useEffect, useState } from "react";
import { FooterLink } from "./FooterLink";
import { Logo } from "./Logo";
import { ThemeContext } from "@/context/ThemeContext";
import { useTranslations } from "next-intl";

export function Footer() {
  const context = useContext(ThemeContext);

  const currentYear = new Date().getFullYear();

  const t = useTranslations("Footer");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!context) {
    return (
      <header className="h-[8vh] bg-base-200 px-md xs:px-3xl py-md flex justify-between opacity-0" />
    );
  }

  const { theme } = context;

  return (
    <footer className="grid grid-col-1 xl:grid-cols-2 bg-card-bg shadow-[inset_0_0.4rem_0.4rem_0_rgba(0,0,0,0.1)]">
      <div className="col-span-full flex flex-col md:flex-col xl:flex-row xl:justify-between py-xl px-4xl text-center gap-3xl xl:gap-0">
        <div className="flex flex-col md:flex-row md:justify-center md:items-center xl:flex-col xl:items-start xl:justify-normal gap-sm">
          <div className="flex justify-center md:flex md:flex-col md:items-end md:flex-1 xl:flex-0">
            <Logo variant={theme} />
          </div>
          <div className="flex md:flex-1 flex-col gap-xs items-center md:items-start xl:flex-0">
            <div className="flex flex-col items-start">
              <FooterLink
                href="https://adar.pl/"
                linkType="external"
                color="red"
              >
                ADAR
              </FooterLink>
              <FooterLink href="https://sea.adar.pl/" linkType="external">
                ADAR sea & air
              </FooterLink>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row xl:justify-st md:justify-center xl:gap-7xl text-center xl:text-left xl:items-baseline gap-xl">
          <div className="flex flex-1 flex-col gap-sm">
            <h2 className="poppins-14-600">{t("contact")}</h2>
            <div className="flex flex-col gap-xs">
              <FooterLink href="mailto:hello@hogs.pl">
                hello@hogs.live
              </FooterLink>
              <FooterLink href="tel:+48223499090">+48 223 499 090</FooterLink>
            </div>
          </div>
          <div className="flex flex-col flex-1 items-center xl:items-start gap-sm">
            <h2 className="poppins-14-600">{t("headquarters")}</h2>
            <p className="poppins-12-600 max-w-[20rem]">
              {t("headquartersAddress")}
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-sm">
            <h2 className="poppins-14-600 ">{t("menu")}</h2>
            <div className="flex flex-col gap-xs">
              <FooterLink href="#">{t("termsAndConditions")}</FooterLink>
              <FooterLink href="#">{t("privacyAndCookiePolicy")}</FooterLink>
              <FooterLink href="#">{t("aboutHogs")}</FooterLink>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-full flex flex-col xl:flex-row xl:justify-between py-sm px-4xl md:gap-lg gap-3xl">
        <div className="flex flex-col md:flex-row md:justify-center xl:justify-between items-center md:gap-xl gap-sm xl:gap-3xl ">
          <FooterLink href="#">{t("termsAndConditions")}</FooterLink>
          <span className="inline-block w-7xl h-[0.3rem] md:w-[0.3rem] md:h-[3.9rem] rounded-[0.2rem] bg-primary-400" />
          <FooterLink href="#">{t("privacyAndCookiePolicy")}</FooterLink>
          <span className="inline-block w-7xl h-[0.3rem] md:w-[0.3rem] md:h-[3.9rem] rounded-[0.2rem] bg-primary-400" />
          <FooterLink href="#">{t("aboutHogs")}</FooterLink>
          <span className="inline-block w-7xl h-[0.3rem] md:w-[0.3rem] md:h-[3.9rem] rounded-[0.2rem] bg-primary-400 visible md:invisible" />
        </div>
        <p className="flex justify-center items-center poppins-12-600">
          Copyright &copy; {currentYear} HOGS
        </p>
      </div>
    </footer>
  );
}
