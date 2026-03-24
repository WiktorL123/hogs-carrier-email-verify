
package ovh.inz.application.useCase;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ovh.inz.application.useCase.VerifyEmailUseCase;
import ovh.inz.core.domain.AggregationResult;

import ovh.inz.core.domain.VerifyEmailCommand;
import ovh.inz.core.port.in.AggregateEmailVerificationResultPort;
import ovh.inz.core.port.out.AbstractApiVerificationPort;
import ovh.inz.core.port.out.HogsVerificationPort;
import ovh.inz.core.port.out.SeedEmailLookupPort;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class VerifyEmailUseCaseTest {

    @Mock
    private AggregateEmailVerificationResultPort port;


    @InjectMocks
    VerifyEmailUseCase useCase;

    @Test
    public void useCaseCallsAggregatorPort(){
        VerifyEmailCommand command = mock(VerifyEmailCommand.class);
        AggregationResult expectedResult = mock(AggregationResult.class);

        when(port.getAggregateEmailVerificationResult(command)).thenReturn(expectedResult);

        AggregationResult actualResult = useCase.verify(command);

        assertEquals(expectedResult, actualResult);

        verify(port).getAggregateEmailVerificationResult(command);
    }

}
