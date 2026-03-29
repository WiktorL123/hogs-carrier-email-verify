package ovh.inz.mongo.model.cacheDoc;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
public class CompanyRatings {
    @Field("invoices_late")
    private Rating invoicesLate;

}
