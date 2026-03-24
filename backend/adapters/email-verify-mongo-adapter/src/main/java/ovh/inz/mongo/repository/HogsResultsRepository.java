package ovh.inz.mongo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import ovh.inz.mongo.model.hogsRatings.HogsResultsDocument;

import java.util.Optional;

@Repository
public interface HogsResultsRepository extends MongoRepository<HogsResultsDocument,String> {
    Optional<HogsResultsDocument> findByEmail(String email);
}
