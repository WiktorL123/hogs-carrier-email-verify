package ovh.inz.core.port.out;

import ovh.inz.core.domain.HogsResult;

public interface HogsVerificationPort {
    HogsResult verify(String email);
}
