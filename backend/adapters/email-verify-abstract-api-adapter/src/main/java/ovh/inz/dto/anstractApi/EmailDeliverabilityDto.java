package ovh.inz.dto.anstractApi;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import java.util.List;
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record EmailDeliverabilityDto(
        DeliverabilityStatus status,
        String statusDetail,
        Boolean isFormatValid,
        Boolean isSmtpValid,
        Boolean isMxValid,
        List<String> mxRecords
) {
}
