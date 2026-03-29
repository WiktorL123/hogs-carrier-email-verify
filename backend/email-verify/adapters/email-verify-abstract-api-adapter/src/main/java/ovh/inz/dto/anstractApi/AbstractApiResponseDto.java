package ovh.inz.dto.anstractApi;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record AbstractApiResponseDto(
        String emailAddress,
        EmailDeliverabilityDto emailDeliverability,
        EmailSenderDto emailSender,
        EmailDomainDto emailDomain,
        EmailQualityDto emailQuality,
        EmailRiskDto emailRisk,
        EmailBreachesDto emailBreaches

) {
}
