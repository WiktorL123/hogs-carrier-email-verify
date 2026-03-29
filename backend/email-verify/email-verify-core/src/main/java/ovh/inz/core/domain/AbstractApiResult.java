package ovh.inz.core.domain;

import java.math.BigDecimal;

public record AbstractApiResult(
        EmailDeliverability emailDeliverability,
        EmailQuality emailQuality,
        EmailRisk emailRisk,
        EmailBreaches emailBreaches
) {

    public record EmailDeliverability(DeliverabilityStatus status) {}

    public enum DeliverabilityStatus {
        deliverable,
        undeliverable,
        unknown
    }

    public enum RiskStatus {
        low,
        medium,
        high
    }

    public record EmailQuality(
            BigDecimal score,
            boolean freeEmail,
            boolean usernameSuspicious
    ) {}

    public record EmailRisk(
            RiskStatus addressRiskStatus,
            RiskStatus domainRiskStatus
    ) {}

    public record EmailBreaches(
            int totalBreaches
    ) {}
}

