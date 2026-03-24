package ovh.inz.mongo.mapper;

import org.springframework.stereotype.Component;
import ovh.inz.core.domain.AbstractApiResult;
import ovh.inz.mongo.model.abstractApiResult.AbstractApiResultDocument;

@Component
public class AbstractApiResultMongoMapper {
   public AbstractApiResult mapToDomain(AbstractApiResultDocument doc){
        return new AbstractApiResult(
                emailDeliverability(doc),
                emailQuality(doc),
                emailRisk(doc),
                emailBreaches(doc)
        );
    }

    private AbstractApiResult.EmailDeliverability emailDeliverability(AbstractApiResultDocument doc){
       return new AbstractApiResult.EmailDeliverability(AbstractApiResult.DeliverabilityStatus.valueOf(doc.getDeliverabilityStatus()));
    }
    private AbstractApiResult.EmailQuality emailQuality(AbstractApiResultDocument doc){
       return new AbstractApiResult.EmailQuality(
               doc.getScore(),
               doc.isFreeEmail(),
               doc.isUsernameSuspicious()
       );
    }
    private AbstractApiResult.EmailRisk emailRisk(AbstractApiResultDocument doc){
       return new AbstractApiResult.EmailRisk(
               AbstractApiResult.RiskStatus.valueOf(doc.getAddressRiskStatus()),
               AbstractApiResult.RiskStatus.valueOf(doc.getDomainRiskStatus())
       );
    }
    private AbstractApiResult.EmailBreaches emailBreaches(AbstractApiResultDocument doc){
       return new AbstractApiResult.EmailBreaches(doc.getTotalBreaches());
    }



    public AbstractApiResultDocument mapToDocument(AbstractApiResult result, String email){
       return  new AbstractApiResultDocument(
               null,
               email,
               result.emailDeliverability().status().name(),
               result.emailQuality().score(),
               result.emailQuality().freeEmail(),
               result.emailQuality().usernameSuspicious(),
               result.emailRisk().addressRiskStatus().name(),
               result.emailRisk().domainRiskStatus().name(),
               result.emailBreaches().totalBreaches()
       );
    }
}
