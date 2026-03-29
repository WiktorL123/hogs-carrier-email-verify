package ovh.inz.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ovh.inz.application.useCase.AggregateEmailVerificationResultUseCase;
import ovh.inz.application.useCase.VerifyEmailUseCase;
import ovh.inz.core.port.in.AggregateEmailVerificationResultPort;
import ovh.inz.core.port.in.VerifyEmailUseCasePort;
import ovh.inz.core.port.out.*;

@Configuration
public class VerifyEmailConfiguration {
    @Bean
    AggregateEmailVerificationResultPort aggregationService(
            SeedEmailLookupPort port,
            HogsVerificationPort hogsPort,
            AbstractApiVerificationPort abstractApiPort,
            AbstractApiResultsPort abstractApiResultsPort,
            HogsRatingsPort hogsRatingsPort
            )
    {
        return new AggregateEmailVerificationResultUseCase(
                port,
                hogsPort,
                abstractApiPort,
                abstractApiResultsPort,
                hogsRatingsPort
        );
    }
    @Bean
    VerifyEmailUseCasePort VerifyEmailService(AggregateEmailVerificationResultPort port){
        return new VerifyEmailUseCase(port);
    }

}
