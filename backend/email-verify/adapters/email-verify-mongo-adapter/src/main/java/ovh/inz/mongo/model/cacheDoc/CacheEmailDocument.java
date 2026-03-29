package ovh.inz.mongo.model.cacheDoc;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "cache_emails")
public class CacheEmailDocument {
    @Id
    String id;
    @Indexed
    private String email;
    private String mode;
    private Map<String, Company> companies;
    @Field("ratings")
    private EmailRatings ratings;

}