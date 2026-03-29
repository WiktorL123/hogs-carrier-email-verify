package ovh.inz.core.port.out;

import ovh.inz.core.domain.MongoResult;

import java.util.Optional;

public interface SeedEmailLookupPort {
    Optional<MongoResult> findByEmail(String email);
}
