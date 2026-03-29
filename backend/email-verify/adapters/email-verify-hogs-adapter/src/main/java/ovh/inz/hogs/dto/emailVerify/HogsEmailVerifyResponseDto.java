package ovh.inz.hogs.dto.emailVerify;

import com.fasterxml.jackson.annotation.JsonProperty;

public record HogsEmailVerifyResponseDto(
        boolean status,
        @JsonProperty("data")
        HogsEmailVerifyDataDto data) {
}
