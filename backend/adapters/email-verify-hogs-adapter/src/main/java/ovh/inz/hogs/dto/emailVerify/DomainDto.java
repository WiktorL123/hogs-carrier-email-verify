package ovh.inz.hogs.dto.emailVerify;

import com.fasterxml.jackson.annotation.JsonProperty;

public record DomainDto(
//        @JsonProperty("companies_count")
//        CompaniesCountDto companiesCount,

        @JsonProperty("first_freight")
        FirstFreightDto firstFreight,

        @JsonProperty("freights_count")
        FreightsCountDto freightsCount
) {
}
