package ovh.inz.mongo.adapter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ovh.inz.core.domain.AbstractApiResult;
import ovh.inz.core.port.out.AbstractApiResultsPort;
import ovh.inz.mongo.mapper.AbstractApiResultMongoMapper;
import ovh.inz.mongo.repository.AbstractApiResultsRepository;

import java.util.Optional;
@Component
@RequiredArgsConstructor
public class MongoAbstractApiResultAdapter implements AbstractApiResultsPort {

    private final AbstractApiResultsRepository repository;
    private final AbstractApiResultMongoMapper mapper;

    @Override
    public Optional<AbstractApiResult> find(String email) {
        return repository.findByEmail(email)
                .map(mapper::mapToDomain);
    }


    @Override
    public void save(AbstractApiResult result, String email) {
        var doc  = mapper.mapToDocument(result, email);
        repository.save(doc);
    }
}
