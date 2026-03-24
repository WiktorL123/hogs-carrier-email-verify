package ovh.inz.core.domain;



public record AggregationResult(
        MongoResult mongoRatings,
        AbstractApiResult emailQuality
) { }
