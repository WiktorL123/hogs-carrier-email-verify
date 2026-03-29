package ovh.inz.dto.anstractApi;

import java.time.LocalDate;

public record BreachedDomainDto(
        String domain,
        LocalDate breachDate
) {
}
