package ovh.inz.core.port.out;

import ovh.inz.core.domain.AbstractApiResult;

import java.util.Optional;

public interface AbstractApiResultsPort {
    Optional<AbstractApiResult> find(String email);
    void save(AbstractApiResult result, String email);

}
