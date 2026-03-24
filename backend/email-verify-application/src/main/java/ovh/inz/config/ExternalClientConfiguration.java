package ovh.inz.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;

@Configuration
public class ExternalClientConfiguration {

    @Bean("hogsRestClient")
    RestClient HogsRestClient(@Value("${hogs.api.base.url}") String baseUrl){

        return createClient(baseUrl);
    }
    @Bean("abstractApiClient")
    RestClient AbstractApiRestClient( @Value("${abstractapi.base.url}") String baseUrl) {
        return createClient(baseUrl);
    }


    private RestClient createClient(String baseUrl){
        return RestClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }
}
