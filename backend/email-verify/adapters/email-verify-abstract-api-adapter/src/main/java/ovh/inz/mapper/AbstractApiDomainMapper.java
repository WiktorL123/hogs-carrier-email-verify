package ovh.inz.mapper;

import org.springframework.stereotype.Component;
import ovh.inz.core.domain.AbstractApiResult;
import ovh.inz.dto.anstractApi.*;

@Component
public class AbstractApiDomainMapper {
    public AbstractApiResult apiToDomain(AbstractApiResponseDto response) {
        AbstractApiResult.EmailDeliverability domainDeliverability = mapDeliverability(response.emailDeliverability());
        AbstractApiResult.EmailQuality domainQuality = mapEmailQuality(response.emailQuality());
        AbstractApiResult.EmailRisk domainRisk = mapEmailRisk(response.emailRisk());
        AbstractApiResult.EmailBreaches domainBreaches = mapEmailBreaches(response.emailBreaches());
        return new AbstractApiResult(domainDeliverability, domainQuality, domainRisk, domainBreaches);
    }

    private AbstractApiResult.EmailBreaches mapEmailBreaches(EmailBreachesDto emailBreachesDto) {
        return new AbstractApiResult.EmailBreaches(emailBreachesDto.totalBreaches());
    }

    private AbstractApiResult.EmailRisk mapEmailRisk(EmailRiskDto emailRiskDto) {

       return new AbstractApiResult.EmailRisk(
               mapRiskStatus(emailRiskDto.addressRiskStatus()),
               mapRiskStatus(emailRiskDto.domainRiskStatus())
       );
    }

    private AbstractApiResult.RiskStatus mapRiskStatus(RiskStatus status){
        return switch (status){
            case low -> AbstractApiResult.RiskStatus.low;
            case medium -> AbstractApiResult.RiskStatus.medium;
            case high -> AbstractApiResult.RiskStatus.high;
        };
    }
    private AbstractApiResult.DeliverabilityStatus mapDeliverabilityStatus(DeliverabilityStatus deliverabilityStatus){
        return switch (deliverabilityStatus){
            case deliverable -> AbstractApiResult.DeliverabilityStatus.deliverable;
            case undeliverable -> AbstractApiResult.DeliverabilityStatus.undeliverable;
            case unknown ->  AbstractApiResult.DeliverabilityStatus.unknown;
        };
    }

    private AbstractApiResult.EmailQuality mapEmailQuality(EmailQualityDto emailQualityDto) {
        return  new AbstractApiResult.EmailQuality(emailQualityDto.score(), emailQualityDto.isFreeEmail(), emailQualityDto.isUsernameSuspicious());
    }

    private AbstractApiResult.EmailDeliverability mapDeliverability(EmailDeliverabilityDto emailDeliverabilityDto) {

        return new AbstractApiResult.EmailDeliverability(
                mapDeliverabilityStatus(emailDeliverabilityDto.status()));
    }
}
