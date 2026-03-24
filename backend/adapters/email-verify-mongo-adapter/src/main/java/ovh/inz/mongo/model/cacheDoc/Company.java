package ovh.inz.mongo.model.cacheDoc;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Field;
@Getter
@Setter
public class Company {
    private Integer id;
    private String name;
    private String tin;
    private String country;

    @Field("country_id")
    private Integer countryId;

    @Field("invoices_late")
    private String invoicesLate;
    @Field("ratings")
    private CompanyRatings ratings;
}