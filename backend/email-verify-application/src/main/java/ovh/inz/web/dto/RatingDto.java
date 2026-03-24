package ovh.inz.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RatingDto {
    private RatingType ratingType;
    private int rating;
    private String comment;
}
