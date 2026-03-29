package ovh.inz.hogs.dto.emailVerify;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.List;

public record HogsEmailVerifyDataDto(
//        @JsonProperty("FreightOrderCount")
//        FreightOrderCount freightOrderCount)

        EmailDto email,
        DomainDto domain,
        @JsonProperty("companies")
        List<CompanyDto> companies
        ){
}
