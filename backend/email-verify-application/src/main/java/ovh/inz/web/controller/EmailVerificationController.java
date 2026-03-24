package ovh.inz.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ovh.inz.core.domain.AbstractApiResult;
import ovh.inz.core.domain.MongoResult;
import ovh.inz.core.domain.VerifyEmailCommand;
import ovh.inz.core.port.in.VerifyEmailUseCasePort;
import ovh.inz.web.dto.VerificationResultDto;
import ovh.inz.web.dto.EmailDto;
import ovh.inz.web.dto.RatingDto;
import ovh.inz.web.mapper.WebDomainMapper;
import ovh.inz.core.domain.AggregationResult;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class EmailVerificationController {

    private final WebDomainMapper mapper;
    private final VerifyEmailUseCasePort port;


    @PostMapping("/verify-email")
    public VerificationResultDto verifyEmail(@RequestBody EmailDto email){
        AggregationResult result = port.verify(new VerifyEmailCommand(email.getEmail()));

        MongoResult ratingsDomain = result.mongoRatings();
        AbstractApiResult apiResult = result.emailQuality();
        List<RatingDto> ratings = mapper.mapToDtoRatings(ratingsDomain);

        String emailDomain = result.mongoRatings().email();

        return  mapper.toAggregationDto(emailDomain, ratings,  apiResult);

    }
}
