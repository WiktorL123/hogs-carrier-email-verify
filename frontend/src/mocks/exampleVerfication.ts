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
      ratingType: "freightsCount",
      comment: "High shipment volume detected",
      rating: 4,
    },
    {
      ratingType: "firstFreight",
      comment: "Client active for 3 years",
      rating: 5,
    },
    {
      ratingType: "associatedCompanies",
      comment: "No suspicious associated entities",
      rating: 3,
    },
  ],
};
