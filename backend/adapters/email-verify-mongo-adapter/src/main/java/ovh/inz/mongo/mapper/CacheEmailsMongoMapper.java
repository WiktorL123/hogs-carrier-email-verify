package ovh.inz.mongo.mapper;

import org.springframework.stereotype.Component;
import ovh.inz.core.domain.MongoResult;
import ovh.inz.core.domain.Rating;
import ovh.inz.mongo.view.RatingsAggregationView;

@Component
public class CacheEmailsMongoMapper {
        public MongoResult mapToMongoResult(RatingsAggregationView view) {
            var ratings = view.ratings()
                            .stream()
                            .map(this::mapToDomainRating)
                            .toList();
            return new MongoResult(view.email(), ratings);
        }
        public Rating mapToDomainRating(RatingsAggregationView.AggregationRating rating){
            Rating.RatingType domainType = switch (rating.ratingType()) {
                case first_freight -> Rating.RatingType.firstFreight;
                case freights_count ->  Rating.RatingType.freightsCount;
                case companies_count ->   Rating.RatingType.companiesCount;
            };
            return new Rating(domainType,rating.ratingValue(), rating.comment());
        }

    }
