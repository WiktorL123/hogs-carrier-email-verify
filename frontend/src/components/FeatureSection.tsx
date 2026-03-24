import { SafetyBenefits } from "./SafetyBenefits";
import { WhyVerifyEmail } from "./WhyVerifyEmail";

export function FeatureSection() {
  return (
    <div className="py-3xl px-md md:px-lg 2xl:px-4xl flex flex-col gap-5xl lg:gap-7xl mb-7xl">
      <WhyVerifyEmail />
      <SafetyBenefits />
    </div>
  );
}
