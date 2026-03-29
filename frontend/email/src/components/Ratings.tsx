import { apiResponse } from "@/types/Response";
import { RatingScoreLine } from "./RatingScoreLine";
import { useTranslations } from "next-intl";

interface RatingsProps {
  result: apiResponse | undefined;
}

export function Ratings({ result }: RatingsProps) {
  const t = useTranslations("EmailSection");
    const ratings = result?.ratings ?? []
    
  return (
    <div className="flex flex-col items-center justify-center gap-sm w-full">
      <div className="flex flex-row justify-center items-center gap-xs">
        <h1 className="poppins-18-600 text-text-header">{t("hogsRatings")}:</h1>
      </div>
      <div className="px-sm py-xl md:px-2xl bg-card-bg shadow-sm border border-card-border color-base-400 rounded-[1.5rem] w-full sm:max-w-[45rem]">
        <div className="flex justify-center">
          <div className="flex flex-col gap-xs">
                    {ratings?.length > 0 ? (
          ratings.map((rating, index) => (
            <RatingScoreLine
              key={index}
              title={
                rating.ratingType === "freightsCount"
                  ? t("shipmentVolume")
                  : rating.ratingType === "firstFreight"
                    ? t("clientTenure")
                    : t("associatedCompanies")
              }
              value={rating.comment}
            />
          ))
        ) : (
          <p className="poppins-14-600 text-danger-600">{t('NoDataFromHogs')}</p>
        )}
          </div>
        </div>
      </div>
    </div>
  );
}
