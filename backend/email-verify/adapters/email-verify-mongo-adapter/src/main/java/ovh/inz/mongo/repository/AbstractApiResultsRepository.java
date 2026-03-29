package ovh.inz.mongo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import ovh.inz.mongo.model.abstractApiResult.AbstractApiResultDocument;

import java.util.Optional;
@Repository
public interface AbstractApiResultsRepository extends MongoRepository<AbstractApiResultDocument, String> {
    Optional<AbstractApiResultDocument> findByEmail(String enail);
}
