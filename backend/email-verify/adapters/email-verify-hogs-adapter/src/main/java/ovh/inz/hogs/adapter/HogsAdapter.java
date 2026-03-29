package ovh.inz.hogs.adapter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import ovh.inz.core.domain.Company;
import ovh.inz.core.domain.HogsResult;
import ovh.inz.core.domain.Rating;
import ovh.inz.core.port.out.HogsVerificationPort;
import ovh.inz.core.port.out.TokenCachePort;
import ovh.inz.hogs.dto.emailVerify.*;
import ovh.inz.hogs.dto.login.LoginDto;
import ovh.inz.hogs.dto.login.LoginResponseDto;
import ovh.inz.hogs.error.HogsAdapterException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@Component
public class HogsAdapter implements HogsVerificationPort {
    private final TokenCachePort redis;
    private final RestClient hogsRestClient;
    private final String botLogin;
    private final String botPassword;
    private final String arsHash;

    public HogsAdapter(
            TokenCachePort redis,
            @Qualifier("hogsRestClient") RestClient hogsRestClient,
            @Value("${hogs.api.bot.login}") String login,
            @Value("${hogs.api.bot.password}") String password,
            @Value("${hogs.api.arsHash}") String arsHash
    ) {
        this.redis = redis;
        this.hogsRestClient = hogsRestClient;
        this.botLogin = login;
        this.botPassword = password;
        this.arsHash = arsHash;
    }

    @Override
    public HogsResult verify(String email) {
        try {
            String token = logInIfTokenExpired();
            HogsEmailVerifyResponseDto emailInfo = verifyWithHogs(email, token);
            return mapHogsToDomain(emailInfo.data().email(), emailInfo.data().companies());

        } catch (Exception ex) {
            log.error("HOGS API Failed for email: {}. Returning EMPTY result. Reason: {}", email, ex.getMessage());

            return new HogsResult(Collections.emptyList(), Collections.emptyList());
        }
    }

    private HogsResult mapHogsToDomain(EmailDto emailDto, List<CompanyDto> companiesDto) {
        List<Rating> ratings = new ArrayList<>();
        List<Company> companies = companiesDto.stream()
                .map(this::mapCompany)
                .toList();
        addRating(ratings, Rating.RatingType.firstFreight, emailDto.firstFreight());
        addRating(ratings, Rating.RatingType.companiesCount, emailDto.companiesCount());
        addRating(ratings, Rating.RatingType.freightsCount, emailDto.freightsCount());
        return new HogsResult(ratings, companies);
    }

    private void addRating(List<Rating> ratings, Rating.RatingType type, RatingDto source) {
        if (source == null) return;

        if (source.rating() != 0) {
            ratings.add(new Rating(type, source.rating(), source.comment()));
        }

        System.out.println("Ratings: " + ratings);
    }

    private Company mapCompany(CompanyDto dto) {
        return new Company(
                dto.id(),
                dto.name(),
                dto.tin(),
                dto.country()
        );
    }

    private HogsEmailVerifyResponseDto verifyWithHogs(String email, String token) {
        String authHeaderValue = "Bearer " + token;

        HogsEmailVerifyResponseDto response = hogsRestClient.get()
                .uri(builder -> builder
                        .path("/v1/ars/email-data")
                        .queryParam("email", email)
                        .build())
                .header("Authorization", authHeaderValue)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, (req, res) -> {
                    if (res.getStatusCode().isSameCodeAs(HttpStatus.UNAUTHORIZED)) {
                        throw new HogsAdapterException("Unauthorized", res.getStatusCode().value(), res.getStatusText());
                    }
                })
                .onStatus(HttpStatusCode::is5xxServerError, (req, res) -> {
                    throw new HogsAdapterException("HOGS SERVER ERROR", res.getStatusCode().value(), res.getStatusText());
                })
                .body(HogsEmailVerifyResponseDto.class);

        if (response == null || !response.status()) {
            throw new HogsAdapterException("HOGS email-verify logic error (status false)");
        }
        return response;
    }

    private String logInIfTokenExpired() {
        return redis.getToken("bearer").orElseGet(() -> {
            String newToken = logIn();
            saveSession(newToken);
            return newToken;
        });
    }

    private void saveSession(String token) {
        redis.saveToken("bearer", token);
    }

    private String logIn() {
        log.info("Logging in to HOGS...");

        LoginResponseDto response = hogsRestClient.post()
                .uri("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .header("arsHash", arsHash)
                .body(new LoginDto(botLogin, botPassword))
                .retrieve()
                .body(LoginResponseDto.class);

        if (response == null || !response.status() || response.data() == null || response.data().token() == null) {
            throw new HogsAdapterException("HOGS login error");
        }

        return response.data().token();
    }
}