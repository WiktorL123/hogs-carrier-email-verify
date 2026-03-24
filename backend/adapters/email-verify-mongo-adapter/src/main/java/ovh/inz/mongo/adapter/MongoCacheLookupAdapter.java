package ovh.inz.mongo.adapter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ovh.inz.core.domain.MongoResult;
import ovh.inz.core.port.out.SeedEmailLookupPort;
import ovh.inz.mongo.mapper.CacheEmailsMongoMapper;
import ovh.inz.mongo.repository.CacheEmailsRepository;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class MongoCacheLookupAdapter implements SeedEmailLookupPort {

    private final CacheEmailsRepository repository;
    private final CacheEmailsMongoMapper mapper;

    @Override
    public Optional<MongoResult> findByEmail(String email) {
        return repository.findByEmailAggregated(email)
                .map(mapper::mapToMongoResult);
    }

}
