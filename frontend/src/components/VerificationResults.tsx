"use client";

import { TrustScore } from "./TrustScore";
import { VerficationSummary } from "./VerificationSummary";
import { apiResponse } from "@/types/Response";
import { Ratings } from "./Ratings";
import { useTranslations } from "next-intl";

interface VerificationProps {
  result: apiResponse | undefined;
  isPending: boolean;
  email: string;
}

export function VerfificationResults({
  result,
  isPending,
  email,
}: VerificationProps) {
  const t = useTranslations("EmailSection");
  if (isPending) {
    return (
      <div className="flex flex-col gap-2xs justify-center items-center">
        <div className="border-[0.5rem] border-mainAccent-blue/20 border-t-mainAccent-blue animate-spin size-2xl rounded-full"></div>
        <span className="figtree-12-600 text-mainAccent-blue">
          {t("loading")}
        </span>
      </div>
    );
  }

  return (
    <div className="p-sm w-full">
      {!result && (
        <div className="flex flex-col items-center justify-center gap-xs">
          <p className="poppins-18-600">{t("resultNotExistingHeading")}</p>
          <p className="figtree-14-400">{t("resultNotExistingParagraph")}</p>
        </div>
      )}
      {result && (
        <div className="flex flex-col items-center justify-center gap-xl">
          <VerficationSummary
            result={result}
            content={"test content"}
            email={email}
          />
          <TrustScore result={result} />
          <Ratings result={result} />
        </div>
      )}
    </div>
  );
}
