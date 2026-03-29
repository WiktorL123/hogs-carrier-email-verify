export type apiResponse = {
  email: string;
  ratings: Rating[];
  emailQuality: EmailQuailty;
};

export type Rating = {
  ratingType: string;
  rating: number;
  comment: string;
};

export type EmailQuailty = {
  deliverabilityStatus: string;
  score: number;
  freeEmail: boolean;
  usernameSuspicious: boolean;
  addressRiskStatus: string;
  domainRiskStatus: string;
  totalBreaches: number;
};
