package ovh.inz.mongo.model.cacheDoc;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class Rating {
    private int rating;
    private String comment;

}
