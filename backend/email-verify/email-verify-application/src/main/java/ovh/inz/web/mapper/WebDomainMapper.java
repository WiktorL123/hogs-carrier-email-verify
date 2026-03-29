package ovh.inz.web.mapper;

import org.springframework.stereotype.Component;
import ovh.inz.core.domain.AbstractApiResult;
import ovh.inz.core.domain.MongoResult;
import ovh.inz.web.dto.VerificationResultDto;
import ovh.inz.web.dto.EmailQualityDto;
import ovh.inz.web.dto.RatingDto;
import ovh.inz.web.dto.RatingType;

import java.util.List;

@Component
public class WebDomainMapper {
    public List<RatingDto> mapToDtoRatings(MongoResult ratingsDomain) {
       return ratingsDomain.ratings()
                .stream()
                .map(rating ->{
                    RatingType currentRating = RatingType.valueOf(rating.ratingType().name());
                    return new RatingDto(currentRating, rating.rating(), rating.comment());
                })
               .toList();
    }
    public EmailQualityDto mapQuality(AbstractApiResult qualityDomain) {
        return new EmailQualityDto(
            qualityDomain.emailDeliverability().status().name(),
            qualityDomain.emailQuality().score(),
            qualityDomain.emailQuality().freeEmail(),
            qualityDomain.emailQuality().usernameSuspicious(),
            qualityDomain.emailRisk().domainRiskStatus().name(),
            qualityDomain.emailRisk().addressRiskStatus().name(),
            qualityDomain.emailBreaches().totalBreaches()
        );
    }
    public VerificationResultDto toAggregationDto(String emailDomain, List<RatingDto> ratings, AbstractApiResult abstractApiDomain) {

        return new VerificationResultDto(emailDomain, ratings, mapQuality(abstractApiDomain));
    }
}
