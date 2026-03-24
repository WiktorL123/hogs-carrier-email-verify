package ovh.inz.application.e2e;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

import ovh.inz.boot.VerifyEmailApplication;
import ovh.inz.web.dto.EmailDto;

@SpringBootTest(
        classes = VerifyEmailApplication.class,
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@Testcontainers
@ActiveProfiles("test")
class EmailVerificationE2ETest {



    @Container
    static MongoDBContainer mongo =
            new MongoDBContainer("mongo:7");

    @Container
    static GenericContainer<?> redis =
            new GenericContainer<>("redis:7")
                    .withExposedPorts(6379);

    @Container
    static GenericContainer<?> hogs =
            new GenericContainer<>("wiremock/wiremock:latest")
                    .withExposedPorts(8080);

    @Container
    static GenericContainer<?> abstractApi =
            new GenericContainer<>("wiremock/wiremock:latest")
                    .withExposedPorts(8080);



    @DynamicPropertySource
    static void registerProps(DynamicPropertyRegistry registry) {

        registry.add("spring.data.mongodb.uri", mongo::getReplicaSetUrl);

        registry.add("spring.redis.host", redis::getHost);
        registry.add("spring.redis.port", () -> redis.getMappedPort(6379));

        registry.add(
                "hogs.api.base.url",
                () -> "http://" + hogs.getHost() + ":" + hogs.getMappedPort(8080)
        );

        registry.add(
                "abstractapi.base.url",
                () -> "http://" + abstractApi.getHost() + ":" + abstractApi.getMappedPort(8080)
        );

        registry.add("cache.email.ttl", () -> "60s");
        registry.add("cache.email.key.prefix", () -> "test_email");
    }

    @Autowired
    TestRestTemplate rest;


    @BeforeAll
    static void seedCacheEmails() throws Exception {

        String seedJson = """
        [{
          email: "seed@trusted.pl",
          mode: "email",
          ratings: {
            freights_count: { rating: 3, comment: "popularny" },
            first_freight: { rating: 3, comment: "stary klient" },
            companies_count: { rating: 1, comment: "" }
          }
        }]
        """;

        mongo.execInContainer(
                "mongosh",
                "--quiet",
                "--eval",
                """
                db = db.getSiblingDB('test');
                db.cache_emails.insertMany(%s);
                """.formatted(seedJson)
        );
    }

    @BeforeEach
    void resetWiremock() {
        configureFor(hogs.getHost(), hogs.getMappedPort(8080));
        resetAllRequests();

        configureFor(abstractApi.getHost(), abstractApi.getMappedPort(8080));
        resetAllRequests();
    }



    private void stubAbstractVerify(String email) {
        configureFor(abstractApi.getHost(), abstractApi.getMappedPort(8080));
        stubFor(get(urlPathEqualTo("/"))
                .withQueryParam("email", equalTo(email))
                .willReturn(okJson("""
                    {
                      "email_address": "%s",
                      "email_deliverability": { "status": "deliverable" },
                      "email_quality": {
                        "score": 0.9,
                        "is_free_email": false,
                        "is_username_suspicious": false
                      },
                      "email_risk": {
                        "address_risk_status": "low",
                        "domain_risk_status": "low"
                      },
                      "email_breaches": { "total_breaches": 0 }
                    }
                """.formatted(email))));
    }





    @Test
    void seedEmail_andAbstractCached_shouldNotCallAnyExternalApis() throws Exception {

        String email = "seed+abstract@trusted.pl";

        // seed READ ONLY
        mongo.execInContainer(
                "mongosh",
                "--quiet",
                "--eval",
                """
                db = db.getSiblingDB('test');
                db.cache_emails.insertOne({
                  email: "%s",
                  mode: "email",
                  ratings: {
                    freights_count: { rating: 2, comment: "" },
                    first_freight: { rating: 1, comment: "" },
                    companies_count: { rating: 1, comment: "" }
                  }
                });
                """.formatted(email)
        );

        // abstract cached
        mongo.execInContainer(
                "mongosh",
                "--quiet",
                "--eval",
                """
                db.abstract_api_results.insertOne({
                  email: "%s",
                  deliverability_status: "deliverable",
                  score: 0.5,
                  free_email: false,
                  username_suspicious: false,
                  address_risk_status: "low",
                  domain_risk_status: "low",
                  total_breaches: 0
                });
                """.formatted(email)
        );

        rest.postForEntity("/verify-email", new EmailDto(email), String.class);

        configureFor(hogs.getHost(), hogs.getMappedPort(8080));
        verify(0, anyRequestedFor(anyUrl()));

        configureFor(abstractApi.getHost(), abstractApi.getMappedPort(8080));
        verify(0, anyRequestedFor(anyUrl()));
    }



    @Test
    void seedEmail_shouldCallAbstract_andCacheResult() {

        String email = "seed@trusted.pl";
        stubAbstractVerify(email);

        var resp = rest.postForEntity(
                "/verify-email",
                new EmailDto(email),
                String.class
        );

        assert resp.getStatusCode() == HttpStatus.OK;

        configureFor(abstractApi.getHost(), abstractApi.getMappedPort(8080));
        verify(1, getRequestedFor(urlPathEqualTo("/"))
                .withQueryParam("email", equalTo(email)));

        configureFor(hogs.getHost(), hogs.getMappedPort(8080));
        verify(0, anyRequestedFor(anyUrl()));
    }



    @Test
    void hogsCached_andAbstractCached_shouldNotCallAnyApis() throws Exception {

        String email = "cached@both.pl";

        mongo.execInContainer(
                "mongosh",
                "--quiet",
                "--eval",
                """
                db = db.getSiblingDB('test');
    
                db.hogs_ratings.insertOne({
                  email: "%s",
                  ratings: [
                    { ratingType: "freightsCount", rating: 1, comment: "" }
                  ],
                  companies: []
                });
    
                db.abstract_api_results.insertOne({
                  email: "%s",
                  deliverability_status: "deliverable",
                  score: 0.7,
                  free_email: false,
                  username_suspicious: false,
                  address_risk_status: "low",
                  domain_risk_status: "low",
                  total_breaches: 0
                });
                """.formatted(email, email)
        );

        rest.postForEntity("/verify-email", new EmailDto(email), String.class);

        configureFor(hogs.getHost(), hogs.getMappedPort(8080));
        verify(0, anyRequestedFor(anyUrl()));

        configureFor(abstractApi.getHost(), abstractApi.getMappedPort(8080));
        verify(0, anyRequestedFor(anyUrl()));
    }



    @Test
    void hogsCached_andAbstractMissing_shouldCallAbstractOnly() throws Exception {

        String email = "cached@hogs-only.pl";

        mongo.execInContainer(
                "mongosh",
                "--quiet",
                "--eval",
                """
                db = db.getSiblingDB('test');
                db.hogs_ratings.insertOne({
                  email: "%s",
                  ratings: [
                    { ratingType: "freightsCount", rating: 1, comment: "" }
                  ],
                  companies: []
                });
                """.formatted(email)
        );

        stubAbstractVerify(email);

        rest.postForEntity("/verify-email", new EmailDto(email), String.class);

        configureFor(abstractApi.getHost(), abstractApi.getMappedPort(8080));
        verify(1, getRequestedFor(urlPathEqualTo("/"))
                .withQueryParam("email", equalTo(email)));

        configureFor(hogs.getHost(), hogs.getMappedPort(8080));
        verify(0, anyRequestedFor(anyUrl()));
    }

}
