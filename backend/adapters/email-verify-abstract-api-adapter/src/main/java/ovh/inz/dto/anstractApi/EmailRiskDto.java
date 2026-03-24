package ovh.inz.dto.anstractApi;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record EmailRiskDto(
        RiskStatus addressRiskStatus,
        RiskStatus domainRiskStatus
) {
}
