package ovh.inz.application.useCase;
import lombok.RequiredArgsConstructor;
import ovh.inz.core.domain.AggregationResult;
import ovh.inz.core.domain.VerifyEmailCommand;
import ovh.inz.core.port.in.AggregateEmailVerificationResultPort;
import ovh.inz.core.port.in.VerifyEmailUseCasePort;
@RequiredArgsConstructor
public class VerifyEmailUseCase implements VerifyEmailUseCasePort {


    private final AggregateEmailVerificationResultPort aggregator;

    @Override
    public AggregationResult verify(VerifyEmailCommand command) {
       return aggregator.getAggregateEmailVerificationResult(command);
    }
}
