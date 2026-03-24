package ovh.inz.application.useCase;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ovh.inz.core.domain.*;
import ovh.inz.core.port.out.*;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AggregateEmailVerificationResultUseCaseTest {

    @Mock
    private SeedEmailLookupPort seedEmailLookupPort;

    @Mock
    private HogsVerificationPort hogsVerificationPort;

    @Mock
    private AbstractApiVerificationPort abstractApiPort;

    @Mock
    private AbstractApiResultsPort abstractApiResultsPort;

    @Mock
    private HogsRatingsPort hogsRatingsPort;

    @InjectMocks
    private AggregateEmailVerificationResultUseCase service;

    @Test
    void whenEmailInSeed_andAbstractCached_shouldUseMongoResult_andNotCallApis() {
        String email = "seed@email.com";
        VerifyEmailCommand command = new VerifyEmailCommand(email);

        MongoResult mongoResult = new MongoResult(email, List.of());
        AbstractApiResult cachedAbstract = mock(AbstractApiResult.class);

        when(seedEmailLookupPort.findByEmail(email))
                .thenReturn(Optional.of(mongoResult));
        when(abstractApiResultsPort.find(email))
                .thenReturn(Optional.of(cachedAbstract));

        AggregationResult result =
                service.getAggregateEmailVerificationResult(command);

        assertSame(mongoResult, result.mongoRatings());
        assertSame(cachedAbstract, result.emailQuality());

        verify(seedEmailLookupPort).findByEmail(email);
        verify(abstractApiResultsPort).find(email);

        verifyNoInteractions(hogsVerificationPort);
        verifyNoInteractions(abstractApiPort);
        verify(hogsRatingsPort, never()).save(any(), anyString());
        verify(abstractApiResultsPort, never()).save(any(), anyString());
    }

    @Test
    void whenEmailInSeed_andAbstractNotCached_shouldCallAbstractApi_andSave() {
        String email = "seed@email.com";
        VerifyEmailCommand command = new VerifyEmailCommand(email);

        MongoResult mongoResult = new MongoResult(email, List.of());
        AbstractApiResult freshAbstract = mock(AbstractApiResult.class);

        when(seedEmailLookupPort.findByEmail(email))
                .thenReturn(Optional.of(mongoResult));
        when(abstractApiResultsPort.find(email))
                .thenReturn(Optional.empty());
        when(abstractApiPort.verify(email))
                .thenReturn(freshAbstract);

        AggregationResult result =
                service.getAggregateEmailVerificationResult(command);

        assertSame(mongoResult, result.mongoRatings());
        assertSame(freshAbstract, result.emailQuality());

        verify(abstractApiPort).verify(email);
        verify(abstractApiResultsPort).save(freshAbstract, email);

        verifyNoInteractions(hogsVerificationPort);
        verify(hogsRatingsPort, never()).save(any(), anyString());
    }

    @Test
    void whenEmailNotInSeed_andHogsCached_andAbstractCached_shouldUseCachesOnly() {
        String email = "cached@hogs.com";
        VerifyEmailCommand command = new VerifyEmailCommand(email);

        Rating rating =
                new Rating(Rating.RatingType.freightsCount, 1, "");
        HogsResult cachedHogs =
                new HogsResult(List.of(rating), List.of());

        AbstractApiResult cachedAbstract = mock(AbstractApiResult.class);

        when(seedEmailLookupPort.findByEmail(email))
                .thenReturn(Optional.empty());
        when(hogsRatingsPort.find(email))
                .thenReturn(Optional.of(cachedHogs));
        when(abstractApiResultsPort.find(email))
                .thenReturn(Optional.of(cachedAbstract));

        AggregationResult result =
                service.getAggregateEmailVerificationResult(command);

        assertEquals(1, result.mongoRatings().ratings().size());
        assertSame(cachedAbstract, result.emailQuality());

        verify(hogsRatingsPort).find(email);
        verify(abstractApiResultsPort).find(email);

        verifyNoInteractions(hogsVerificationPort);
        verifyNoInteractions(abstractApiPort);
        verify(hogsRatingsPort, never()).save(any(), anyString());
        verify(abstractApiResultsPort, never()).save(any(), anyString());
    }

    @Test
    void whenEmailNotInSeed_andHogsCached_andAbstractNotCached_shouldCallAbstractApiOnly() {
        String email = "cached@hogs.com";
        VerifyEmailCommand command = new VerifyEmailCommand(email);

        Rating rating =
                new Rating(Rating.RatingType.freightsCount, 1, "");
        HogsResult cachedHogs =
                new HogsResult(List.of(rating), List.of());

        AbstractApiResult freshAbstract = mock(AbstractApiResult.class);

        when(seedEmailLookupPort.findByEmail(email))
                .thenReturn(Optional.empty());
        when(hogsRatingsPort.find(email))
                .thenReturn(Optional.of(cachedHogs));
        when(abstractApiResultsPort.find(email))
                .thenReturn(Optional.empty());
        when(abstractApiPort.verify(email))
                .thenReturn(freshAbstract);

        AggregationResult result =
                service.getAggregateEmailVerificationResult(command);

        assertEquals(1, result.mongoRatings().ratings().size());
        assertSame(freshAbstract, result.emailQuality());

        verify(abstractApiPort).verify(email);
        verify(abstractApiResultsPort).save(freshAbstract, email);

        verifyNoInteractions(hogsVerificationPort);
        verify(hogsRatingsPort, never()).save(any(), anyString());
    }

    @Test
    void whenEmailNotInSeed_andHogsNotCached_andAbstractCached_shouldCallHogsOnly() {
        String email = "new@email.com";
        VerifyEmailCommand command = new VerifyEmailCommand(email);

        Rating rating =
                new Rating(Rating.RatingType.freightsCount, 1, "");
        HogsResult hogsResult =
                new HogsResult(List.of(rating), List.of());

        AbstractApiResult cachedAbstract = mock(AbstractApiResult.class);

        when(seedEmailLookupPort.findByEmail(email))
                .thenReturn(Optional.empty());
        when(hogsRatingsPort.find(email))
                .thenReturn(Optional.empty());
        when(hogsVerificationPort.verify(email))
                .thenReturn(hogsResult);
        when(abstractApiResultsPort.find(email))
                .thenReturn(Optional.of(cachedAbstract));

        AggregationResult result =
                service.getAggregateEmailVerificationResult(command);

        assertEquals(1, result.mongoRatings().ratings().size());
        assertSame(cachedAbstract, result.emailQuality());

        verify(hogsVerificationPort).verify(email);
        verify(hogsRatingsPort).save(hogsResult, email);

        verifyNoInteractions(abstractApiPort);
    }

    @Test
    void whenEmailNotInSeed_andHogsNotCached_andAbstractNotCached_shouldCallBothApis_andSaveBoth() {
        String email = "new@email.com";
        VerifyEmailCommand command = new VerifyEmailCommand(email);

        Rating rating =
                new Rating(Rating.RatingType.freightsCount, 1, "");
        HogsResult hogsResult =
                new HogsResult(List.of(rating), List.of());

        AbstractApiResult abstractApiResult = mock(AbstractApiResult.class);

        when(seedEmailLookupPort.findByEmail(email))
                .thenReturn(Optional.empty());
        when(hogsRatingsPort.find(email))
                .thenReturn(Optional.empty());
        when(hogsVerificationPort.verify(email))
                .thenReturn(hogsResult);
        when(abstractApiResultsPort.find(email))
                .thenReturn(Optional.empty());
        when(abstractApiPort.verify(email))
                .thenReturn(abstractApiResult);

        AggregationResult result =
                service.getAggregateEmailVerificationResult(command);

        assertEquals(1, result.mongoRatings().ratings().size());
        assertSame(abstractApiResult, result.emailQuality());

        verify(hogsVerificationPort).verify(email);
        verify(hogsRatingsPort).save(hogsResult, email);
        verify(abstractApiPort).verify(email);
        verify(abstractApiResultsPort).save(abstractApiResult, email);
    }
}
