import { apiResponse } from "@/types/Response";
import { ScoreLine } from "./ScoreLine";
import {
  AtSymbolIcon,
  PaperAirplaneIcon,
  GlobeAltIcon,
  CloudIcon,
  ShieldExclamationIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";

interface TrustScoreProps {
  result: apiResponse | undefined;
}

export function TrustScore({ result }: TrustScoreProps) {
  const t = useTranslations("EmailSection");
  return (
    <div className="flex flex-col items-center justify-center gap-sm w-full">
      <div className="flex flex-row justify-center items-center gap-xs">
        <h1 className="poppins-18-600 text-text-header">
          {t("trustworthiness")}:
        </h1>
        {/* <p className="poppins-18-600 text-green-600">
          {result?.emailQuality.score ? result?.emailQuality.score * 100 : "0"}
          /100
        </p> */}
      </div>
      <div className="px-sm py-xl sm:px-2xl bg-card-bg shadow-sm border border-card-border color-base-400 rounded-[1.5rem] w-full sm:max-w-[50rem]">
        <div className="flex justify-center">
          <div className="flex flex-col sm:w-full gap-lg sm:gap-xs">
            <ScoreLine
              icon={AtSymbolIcon}
              title={t("addressRiskStatus")}
              value={
                result?.emailQuality.addressRiskStatus === "high"
                  ? t("statusHigh")
                  : result?.emailQuality.addressRiskStatus === "medium"
                    ? t("statusMedium")
                    : t("statusLow")
              }
              color={`${
                result?.emailQuality.addressRiskStatus === "high"
                  ? "text-danger-600"
                  : result?.emailQuality.addressRiskStatus === "medium"
                    ? "text-amber-400"
                    : "text-success-600"
              }`}
            />
            <ScoreLine
              icon={PaperAirplaneIcon}
              title={t("deliverabilityStatus")}
              value={
                result?.emailQuality.deliverabilityStatus === "undeliverable"
                  ? t("statusUndeliverable")
                  : result?.emailQuality.deliverabilityStatus === "unknown"
                    ? t("statusUnknown")
                    : t("statusDeliverable")
              }
              color={`${
                result?.emailQuality.deliverabilityStatus === "undeliverable"
                  ? "text-danger-600"
                  : result?.emailQuality.deliverabilityStatus === "unknown"
                    ? "text-amber-400"
                    : "text-success-600"
              }`}
            />
            <ScoreLine
              icon={GlobeAltIcon}
              title={t("domainRiskStatus")}
              value={
                result?.emailQuality.domainRiskStatus === "high"
                  ? t("statusHigh")
                  : t("statusLow")
              }
              color={`${
                result?.emailQuality.domainRiskStatus === "high"
                  ? "text-danger-600"
                  : "text-success-600"
              }`}
            />
            <ScoreLine
              icon={CloudIcon}
              title={t("knownProvider")}
              value={result?.emailQuality.freeEmail ? t("yes") : t("no")}
              color={`${
                result?.emailQuality.freeEmail
                  ? "text-success-600"
                  : "text-amber-400"
              }`}
            />
            <ScoreLine
              icon={ShieldExclamationIcon}
              title={t("appearedInDataBreaches")}
              value={
                result?.emailQuality.totalBreaches === 0
                  ? t("noBreaches")
                  : result?.emailQuality.totalBreaches === 1
                    ? t("oneTime")
                    : `${result?.emailQuality.totalBreaches} ${t("times")}`
              }
              color={`${
                result?.emailQuality.totalBreaches === 0
                  ? "text-success-600"
                  : "text-danger-600"
              }`}
            />
            <ScoreLine
              icon={MagnifyingGlassIcon}
              title={t("isUsernameSuspicious")}
              value={
                result?.emailQuality.usernameSuspicious ? t("yes") : t("no")
              }
              color={`${
                result?.emailQuality.usernameSuspicious
                  ? "text-danger-600"
                  : "text-success-600"
              }`}
            />
            {/* <TrustScoreLine
          icon={CheckIcon}
          title="HOGS blacklist"
          value="no entries"
          color="text-green-600"
        />
        <TrustScoreLine
          icon={CheckIcon}
          title="HOGS whitelist"
          value="no entries"
        /> */}
            {/* <TrustScoreLine
          icon={CheckIcon}
          title="HOGS Partnership history"
          value="no entries"
        /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
