package ovh.inz.mongo.model.abstractApiResult;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@Document(collection = "abstract_api_results")
public class AbstractApiResultDocument {
    @Id
    private String id;

    private String email;

    @Field(name = "deliverability_status")
    private String deliverabilityStatus;

    private BigDecimal score;

    @Field(name = "free_email")
    private boolean freeEmail;

    @Field(name = "username_suspicious")
    private boolean usernameSuspicious;
    @Field(name = "address_risk_status")
    private String addressRiskStatus;
    @Field(name = "domain_risk_status")
    private String domainRiskStatus;
    @Field(name = "total_breaches")
    private int totalBreaches;
}
