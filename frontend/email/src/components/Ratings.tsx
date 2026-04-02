import { apiResponse } from "@/types/Response";
import { useTranslations } from "next-intl";
import {
  CalendarDateRangeIcon,
  ArrowPathRoundedSquareIcon,
  ShieldExclamationIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/16/solid";
import { ScoreLine } from "./ScoreLine";

interface RatingsProps {
  result: apiResponse | undefined;
}

export function Ratings({ result }: RatingsProps) {
  const t = useTranslations("EmailSection");
  const ratings = result?.ratings ?? [];
  console.log(ratings)

  const getIcon = (ratingType: string): React.ElementType => {
    switch (ratingType) {
      case "scam":
        return ShieldExclamationIcon;
      case "scamDomain":
      case "generalDomain":
        return GlobeAltIcon;
      case "firstFreight":
        return CalendarDateRangeIcon;
      case "freightsCount":
        return ArrowPathRoundedSquareIcon;
      case "invoicesLate":
        return DocumentTextIcon;
      case "companiesCount":
        return DocumentTextIcon;//do zmiany
      default:
        return QuestionMarkCircleIcon;
    }
  };

  const getIconColor = (ratingType: string, rating: number): string => {
    const iconColor: Record<string, string> = {
      "-1": "text-danger-500",
      "0": "text-warning-400",
      "1": "text-success-200",
      "2": "text-success-400",
      "3": "text-success-600",
    };
    if (ratingType === "scam" || ratingType === "scamDomain") {
      return rating === -1 ? iconColor["-1"] : iconColor["3"];
    }
    if (ratingType === "generalDomain") {
      return rating === 0 ? iconColor["0"] : iconColor["3"];
    } else return iconColor[rating.toString()];
  };

  return (
    <div className="flex flex-col items-center justify-center gap-sm w-full">
      <div className="flex flex-row justify-center items-center gap-xs">
        <h1 className="poppins-18-600 text-text-header">{t("hogsRatings")}:</h1>
      </div>
      <div className="px-sm py-xl md:px-2xl bg-card-bg shadow-sm border border-card-border color-base-400 rounded-[1.5rem] w-full sm:max-w-[45rem]">
        <div className="flex justify-center">
          <div className="flex flex-col gap-lg sm:gap-xs">
            {ratings?.length > 0 ? (
              ratings
                // .slice(0, -1)
                .map((rating, index) => (
                  <ScoreLine
                    key={index}
                    icon={getIcon(rating.ratingType)}
                    title={t(rating.ratingType + ".title")}
                    value={t(rating.ratingType + "." + rating.rating)}
                    color={getIconColor(rating.ratingType, rating.rating)}
                  />
                ))
            ) : (
              <p className="poppins-14-600 text-danger-600">
                {t("NoDataFromHogs")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
