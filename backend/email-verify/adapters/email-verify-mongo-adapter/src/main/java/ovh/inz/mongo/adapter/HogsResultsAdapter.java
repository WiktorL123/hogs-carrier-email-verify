package ovh.inz.mongo.adapter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ovh.inz.core.domain.HogsResult;
import ovh.inz.core.port.out.HogsRatingsPort;
import ovh.inz.mongo.mapper.HogsResultsMongoAdapter;
import ovh.inz.mongo.repository.HogsResultsRepository;

import java.util.Optional;
@Component
@RequiredArgsConstructor
public class HogsResultsAdapter implements HogsRatingsPort {
    private final HogsResultsRepository repository;
    private final HogsResultsMongoAdapter mapper;

    @Override
    public Optional<HogsResult> find(String email) {
        return repository.findByEmail(email)
                .map(mapper::toDomain);
    }

    @Override
    public void save(HogsResult hogsResult, String email) {
        var doc = mapper.toHogsRatingDoc(hogsResult, email);
        repository.save(doc);

    }
}
