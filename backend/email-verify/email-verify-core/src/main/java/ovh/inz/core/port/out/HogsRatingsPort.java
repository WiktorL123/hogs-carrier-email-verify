package ovh.inz.core.port.out;

import ovh.inz.core.domain.HogsResult;

import java.util.Optional;

public interface HogsRatingsPort {
    Optional<HogsResult> find(String email);
    void save(HogsResult hogsResult,  String email);
}
