import { motion } from "framer-motion";
import Underline from "./animated/Underline";
import ScrollReveal from "./animated/ScrollReveal";
import { useTranslations } from "next-intl";

export function WhyVerifyEmail() {
  const t = useTranslations("WhyVerifyEmail");
  return (
    <div className="grid grid-cols-1 smallTablet:grid-cols-1 lg:grid-cols-2 gap-5xl">
      <div className="flex flex-col gap-xl md:pl-3xl">
        <div>
          <h2 className="poppins-28-600">{t("title")}</h2>
          <Underline />
        </div>
        <ScrollReveal>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "0px 0px 200px 0px" }}
            className="font-figtree font-normal text-[1.4rem] sm:text-[1.8rem] md:text-[1.8rem] 2xl:text-[2rem] 3xl:text-[2.4rem] leading-[1.9]"
          >
            {t("paragraph")}
          </motion.p>
        </ScrollReveal>
      </div>
      <motion.div
        className="relative aspect-[4/3]"
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <svg
          viewBox="20 0 600 500"
          className="h-full smallTablet:h-[85%] w-full"
        >
          <defs>
            <path
              id="shape"
              d="M193.126 435.904L9.46889 104.156C-16.3477 57.5221 17.3517 0.294854 70.6547 0.252273L345.179 0.0329741C370.648 0.0126283 394.119 13.8275 406.463 36.1053L590.412 368.072C616.265 414.728 582.523 472 529.184 472H254.367C228.908 472 205.456 458.177 193.126 435.904Z"
            />
            <pattern
              id="image-bg"
              patternUnits="userSpaceOnUse"
              width="600"
              height="472"
            >
              <image
                href="/images/person.jpg"
                width="600"
                height="472"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>

          <use href="#shape" fill="#854CDB" />

          <use
            href="#shape"
            fill="#BFF678"
            transform="translate(100, 50) scale(0.9)"
          />

          <use
            href="#shape"
            fill="url(#image-bg)"
            transform="translate(50,30) scale(0.85)"
          />
        </svg>
      </motion.div>
    </div>
  );
}
