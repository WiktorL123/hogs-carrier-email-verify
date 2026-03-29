package ovh.inz.core.port.out;

import ovh.inz.core.domain.AbstractApiResult;

public interface AbstractApiVerificationPort {
    AbstractApiResult verify(String email);
}
