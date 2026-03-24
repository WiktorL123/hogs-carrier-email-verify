package ovh.inz.dto.anstractApi;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.math.BigDecimal;


@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record EmailQualityDto(
        BigDecimal score,
        Boolean isFreeEmail,
        Boolean isUsernameSuspicious,
        Boolean isDisposable,
        Boolean isCatchall,
        Boolean isSubaddress,
        Boolean isRole,
        Boolean isDmarcEnforced,
        Boolean isSpfStrict,
        Integer minimumAge
) {
}
