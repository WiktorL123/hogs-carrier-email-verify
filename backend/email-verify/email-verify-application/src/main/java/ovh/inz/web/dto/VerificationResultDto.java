package ovh.inz.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
public class VerificationResultDto {
    private String email;
    private List<RatingDto> ratings;
    private EmailQualityDto emailQuality;
}
