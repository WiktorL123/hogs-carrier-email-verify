package ovh.inz.dto.anstractApi;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)

public record EmailSenderDto(
        String firstName,
        String lastName,
        String emailProviderName,
        String organizationName,
        String organizationType
) {
}
