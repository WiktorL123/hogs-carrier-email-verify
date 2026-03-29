package ovh.inz.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmailQualityDto {
    String deliverabilityStatus;
    BigDecimal score;
    boolean freeEmail;
    boolean usernameSuspicious;
    String addressRiskStatus;
    String domainRiskStatus;
    int totalBreaches;
}
