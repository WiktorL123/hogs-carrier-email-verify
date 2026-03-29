package ovh.inz.mongo.model.hogsRatings;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "hogs_ratings")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HogsResultsDocument {

    @Id
    private String id;

    @Field("email")
    private String email;

    @Field("ratings")
    private List<HogsRating> ratings;

    @Field("companies")
    private List<Company> companies;


    public record Company(int id,
                           String name,
                           String tin,
                           String country){}
    public record HogsRating(
            String ratingType,
            int rating,
            String comment
    ) {}
}
