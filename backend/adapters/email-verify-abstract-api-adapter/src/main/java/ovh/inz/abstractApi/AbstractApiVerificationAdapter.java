package ovh.inz.abstractApi;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import ovh.inz.core.domain.AbstractApiResult;
import ovh.inz.core.port.out.AbstractApiVerificationPort;
import ovh.inz.dto.anstractApi.AbstractApiResponseDto;
import ovh.inz.mapper.AbstractApiDomainMapper;

@Component
public class AbstractApiVerificationAdapter implements AbstractApiVerificationPort {

    private final String apiKey;
    private final RestClient abstractApiClient;
    private final AbstractApiDomainMapper mapper;

    public AbstractApiVerificationAdapter(
            @Qualifier("abstractApiClient")RestClient abstractApiClient,
            @Value("${abstractapi.api.key}") String apiKey,
            AbstractApiDomainMapper mapper){
        this.abstractApiClient = abstractApiClient;
        this.apiKey = apiKey;
        this.mapper = mapper;
    }



    @Override
    public AbstractApiResult verify(String email) {

        AbstractApiResponseDto response = sendRequest(email);
        return mapper.apiToDomain(response);
    }

    private AbstractApiResponseDto sendRequest(String email){
        var resp = abstractApiClient.get()
                .uri(uriBuilder -> uriBuilder
                            .queryParam("email", email)
                            .queryParam("api_key", apiKey)
                            .build()
                )
                .retrieve()
                .body(AbstractApiResponseDto.class);
        System.out.println(resp);
        return resp;

    }
}
