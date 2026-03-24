package ovh.inz.dto.anstractApi;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import java.time.LocalDate;
import java.util.List;
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record EmailBreachesDto(
        Integer totalBreaches,
        LocalDate dateFirstBreached,
        LocalDate dateLastBreached,
        List<BreachedDomainDto>  breachedDomains

) {
}
