package ovh.inz.mongo.view;

import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

public record RatingsAggregationView(
        String email,
        List<AggregationRating> ratings

) {
    public record AggregationRating(
            RatingType ratingType,
            Integer ratingValue,
            String comment
    ){
        public enum RatingType {
            freights_count,
            first_freight,
             companies_count
//            invoices_late
        }
    }
}
