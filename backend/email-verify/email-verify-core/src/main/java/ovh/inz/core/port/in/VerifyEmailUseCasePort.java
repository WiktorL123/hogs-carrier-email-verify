package ovh.inz.core.port.in;

import ovh.inz.core.domain.AggregationResult;
import ovh.inz.core.domain.VerifyEmailCommand;
public interface VerifyEmailUseCasePort {
    AggregationResult verify(VerifyEmailCommand command);

}
