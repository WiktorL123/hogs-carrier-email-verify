package ovh.inz.mongo.repository;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import ovh.inz.mongo.model.cacheDoc.CacheEmailDocument;
import ovh.inz.mongo.view.RatingsAggregationView;

import java.util.Optional;


@Repository
    public interface CacheEmailsRepository extends MongoRepository<CacheEmailDocument, String> {


        @Aggregation(pipeline = {
                "{ '$match': { 'email': ?0 } }",
                "{ '$project': { " +
                        "email: 1, " +
                        "ratings: { '$map': { " +
                        "input: { '$objectToArray': '$ratings' }, " +
                        "as: 'rating', " +
                        "in: { ratingType: '$$rating.k', ratingValue: '$$rating.v.rating', comment: '$$rating.v.comment' } " +
                        "} }" +
                        "} }"
        })
        Optional<RatingsAggregationView> findByEmailAggregated(String email);
    }


