package ovh.inz.dto.anstractApi;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.time.LocalDate;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record EmailDomainDto(
        String domain,
        Integer domainAge,
        Boolean isLiveSite,
        String registrar,
        String registrarUrl,
        LocalDate dateRegistered,
        LocalDate dateLastRenewed,
        LocalDate dateExpires,
        Boolean isRiskyTld
) {
}
