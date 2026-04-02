export const mockApiResponse = {
  emailQuality: {
    score: 0.85,
    addressRiskStatus: "low",
    deliverabilityStatus: "deliverable",
    domainRiskStatus: "low",
    freeEmail: false,
    totalBreaches: 0,
    usernameSuspicious: false,
  },
  ratings: [
    {
      ratingType: "scam",
      rating: -1,
    },
    {
      ratingType: "scamDomain",
      rating: 0,
    },
    {
      ratingType: "generalDomain",
      rating: 0,
    },
    {
      ratingType: "firstFreight",
      rating: 2,
    },
    {
      ratingType: "freightsCount",
      rating: 3,
    },
    {
      ratingType: "invoicesLate",
      rating: 1,
    },
    // {
    //   ratingType: "associatedCompanies",
    //   rating: 3,
    // },
    {
      ratingType: "companiesCount",
      rating: 1
    }
  ],
};
