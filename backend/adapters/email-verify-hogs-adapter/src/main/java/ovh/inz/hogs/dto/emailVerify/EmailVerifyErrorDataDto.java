package ovh.inz.hogs.dto.emailVerify;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.Nullable;

public record EmailVerifyErrorDataDto(
        String message,
        @JsonProperty("code")
        @Nullable String code) {

}
