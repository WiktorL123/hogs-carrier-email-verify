import { ThemeContext } from "@/context/ThemeContext";
import { apiResponse } from "@/types/Response";
import { useContext } from "react";
import { useTranslations } from "next-intl";

export interface Props {
  content: string;
  result: apiResponse;
  email: string;
}
export function VerficationSummary({ result, email }: Props) {
  const context = useContext(ThemeContext);
  const t = useTranslations("EmailSection");

  if (!context) {
    return (
      <header className="h-[8vh] bg-base-200 px-md xs:px-3xl py-md flex justify-between opacity-0" />
    );
  }

  const { theme } = context;
  const calculatingScore = () => {
    const abstractScore = result.emailQuality.score * 100 || 0;
    const ratingsScore =
      result.ratings
        .map((rating) => rating.rating)
        .reduce((acc, value) => acc + value, 0) * 11;

    const score = Math.floor(abstractScore * 0.7 + ratingsScore * 0.3);
    return score;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-sm w-full">
      <h1 className="poppins-24-600">
        {t("summaryTitle")}:{" "}
        <span
          className={`poppins-24-600 ${
            calculatingScore() <= 40
              ? "text-danger-600"
              : calculatingScore() <= 70
                ? "text-amber-400"
                : "text-success-600"
          }`}
        >
          {email}
        </span>{" "}
      </h1>
      {/* <p
        className={`poppins-24-600 ${
          calculatingScore() <= 40
            ? "text-danger-600"
            : calculatingScore() <= 70
              ? "text-amber-400"
              : "text-success-600"
        }`}
      >
        {calculatingScore()} / 100
      </p> */}
      <div
        className={`py-sm px-md flex flex-col gap-xs rounded-[0.4rem] shadow-sm w-full sm:max-w-[45rem]  ${
          calculatingScore() <= 40
            ? "bg-danger-200"
            : calculatingScore() <= 70
              ? "bg-warning-200"
              : "bg-success-200"
        }`}
      >
        {calculatingScore() <= 40 ? (
          <p className={`figtree-14-500 text-text-content `}>{t("lowScore")}</p>
        ) : calculatingScore() <= 70 ? (
          <p className={`figtree-14-500 text-text-content `}>
            {t("mediumScore")}
          </p>
        ) : (
          <p className={`figtree-14-500 text-text-content `}>
            {t("highScore")}
          </p>
        )}
      </div>
      {/* <div
        className={`py-sm px-md flex flex-col gap-xs rounded-[0.4rem] shadow-sm w-full sm:max-w-[45rem]  ${
          type === "safe"
            ? `${theme === "light" ? "bg-success-200" : "bg-success-600"}`
            : ""
        } ${
          type === "warning"
            ? `${theme === "light" ? "bg-warning-200" : "bg-warning-600"}`
            : ""
        } ${
          type === "danger"
            ? `${theme === "light" ? "bg-danger-300" : "bg-danger-600"}`
            : ""
        }`}
      >
        <p className={`figtree-14-500 text-text-content `}>
          This email has passed most security and authenticity checks. It’s very
          likely to be genuine, with minimal risk of fraud or phishing attempts.
          You may proceed confidently with this email for further engagement.
        </p>
      </div>
      <div
        className={`py-sm px-md flex flex-col gap-xs rounded-[0.4rem] shadow-sm w-full sm:max-w-[45rem]  ${
          type === "safe"
            ? `${theme === "light" ? "bg-success-200" : "bg-success-600"}`
            : ""
        } ${
          type === "warning"
            ? `${theme === "light" ? "bg-orange-300" : "bg-warning-600"}`
            : ""
        } ${
          type === "danger"
            ? `${theme === "light" ? "bg-danger-300" : "bg-danger-600"}`
            : ""
        }`}
      >
        <p className={`figtree-14-500 text-text-content `}>
          This email has passed most security and authenticity checks. It’s very
          likely to be genuine, with minimal risk of fraud or phishing attempts.
          You may proceed confidently with this email for further engagement.
        </p>
      </div>
      <div
        className={`py-sm px-md flex flex-col gap-xs rounded-[0.4rem] shadow-sm w-full sm:max-w-[45rem]  ${
          type === "safe"
            ? `${theme === "light" ? "bg-success-200" : "bg-success-600"}`
            : ""
        } ${
          type === "warning"
            ? `${theme === "light" ? "bg-danger-300" : "bg-warning-600"}`
            : ""
        } ${
          type === "danger"
            ? `${theme === "light" ? "bg-danger-300" : "bg-danger-600"}`
            : ""
        }`}
      >
        <p className={`figtree-14-500 text-text-content `}>
          This email has passed most security and authenticity checks. It’s very
          likely to be genuine, with minimal risk of fraud or phishing attempts.
          You may proceed confidently with this email for further engagement.
        </p>
      </div> */}
    </div>
  );
}
