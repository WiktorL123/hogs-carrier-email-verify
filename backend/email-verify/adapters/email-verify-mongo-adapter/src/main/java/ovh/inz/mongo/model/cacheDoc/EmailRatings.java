package ovh.inz.mongo.model.cacheDoc;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@AllArgsConstructor
public class EmailRatings {
        @Field("freights_count")
        private Rating freightsCount;
        @Field("first_freight")
        private Rating firstFreight;
        @Field("companies_count")
        private Rating companiesCount;
}
