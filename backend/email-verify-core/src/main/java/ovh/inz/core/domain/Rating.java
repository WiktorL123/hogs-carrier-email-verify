package ovh.inz.core.domain;




public record Rating(
        RatingType ratingType,
        Integer rating,
        String comment
) {
    public enum RatingType {
        freightsCount,
        firstFreight,
        companiesCount,
//        freightOrderCount
    }

}
