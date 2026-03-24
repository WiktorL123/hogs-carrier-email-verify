package ovh.inz.application.useCase;

import lombok.RequiredArgsConstructor;
import ovh.inz.core.domain.*;
import ovh.inz.core.port.in.AggregateEmailVerificationResultPort;
import ovh.inz.core.port.out.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class AggregateEmailVerificationResultUseCase implements AggregateEmailVerificationResultPort {
    //seed zaufanych uzytkownikow
    private final SeedEmailLookupPort seedEmailLookupPort;
    //weryfikacja endpint HOGS api
    private final HogsVerificationPort hogsVerificationPort;
    //weryfikacja sbtract api
    private final AbstractApiVerificationPort abstractApiPort;
    //mongo dla wynikow abstract
    private final AbstractApiResultsPort abstractApiResultsPort;
    //mongo dla wynikow endpointu HOGS
    private final HogsRatingsPort hogsRatingsPort;

   @Override
    public AggregationResult getAggregateEmailVerificationResult(VerifyEmailCommand command) {
       Optional<MongoResult> cachedMongoResults = findMongoResult(command.email());
       if (cachedMongoResults.isPresent()){
           System.out.println("calling if in abstract api result for email: \n" + command.email() + "that IS not present in MAIN CAHCE " );
           AbstractApiResult apiResult = getAbstractApiResult(command.email());
           return new AggregationResult(cachedMongoResults.get(), apiResult);
       }
       else {
           Optional<HogsResult> hogsResultOpt = hogsRatingsPort.find(command.email());
           if (hogsResultOpt.isPresent()) {
               System.out.println("email: " + command.email() + " is NOT present in main cache");
               HogsResult hogsResult = hogsResultOpt.get();
               List<Rating> ratings = hogsResult.getRatings();
               System.out.println("calling if in abstract api result for email: \n" + command.email() + "that IS present in hogs ver results");

               AbstractApiResult apiResult = getAbstractApiResult(command.email());
               return new AggregationResult(
                       new MongoResult(
                               command.email(),
                               ratings
                       ),
                       apiResult
               );
           }
           else {
               HogsResult hogsResult = hogsVerificationPort.verify(command.email());
               System.out.println("calling if in abstract api result for email: \n" + command.email() + "that is NOT present in hogs ver results, saving..");
               AbstractApiResult apiResult = getAbstractApiResult(command.email());
               var hogsRatings = hogsResult.getRatings();

               hogsRatingsPort.save(hogsResult, command.email());
               return new AggregationResult(
                       new MongoResult(
                               command.email(),
                               hogsRatings
                       ),
                       apiResult
               );
           }
       }
    }

    private AbstractApiResult getAbstractApiResult(String email) {
        Optional<AbstractApiResult> cachedResult = abstractApiResultsPort.find(email);
        if (cachedResult.isPresent()) {
            System.out.println("email:" + email + " is present in db of abstract api");
            return cachedResult.get();
        }
        AbstractApiResult apiResult = abstractApiPort.verify(email);
        System.out.println("email:" + email + " is not present in db of abstract api, saving....");
        abstractApiResultsPort.save(apiResult, email);
        return apiResult;

    }

    private Optional<MongoResult> findMongoResult(String email) {
        return seedEmailLookupPort.findByEmail(email);
    }
}
