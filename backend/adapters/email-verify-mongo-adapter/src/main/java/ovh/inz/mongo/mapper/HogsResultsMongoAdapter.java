package ovh.inz.mongo.mapper;

import org.springframework.stereotype.Component;
import ovh.inz.core.domain.Company;
import ovh.inz.core.domain.HogsResult;
import ovh.inz.core.domain.Rating;
import ovh.inz.mongo.model.hogsRatings.HogsResultsDocument;

import java.util.Objects;

@Component
public class HogsResultsMongoAdapter {
    public HogsResult toDomain(HogsResultsDocument document){
       var ratings = document.getRatings()
               .stream()
               .map(this::mapToDomainRating)
               .filter(Objects::nonNull)
               .toList();
       var companies = document.getCompanies()
               .stream()
               .map(this::mapToDomainCompany)
               .toList();
       return new HogsResult(ratings, companies);
    }


    public HogsResultsDocument toHogsRatingDoc(HogsResult hogsResult, String email){
            var ratings = hogsResult.getRatings().stream()
                    .map(this::mapToDocRating)
                    .toList();
            var companies = hogsResult.getCompanies()
                    .stream()
                    .map(this::mapToDocComapany)
                    .toList();
            return new HogsResultsDocument(
                    null,
                    email,
                    ratings,
                    companies
            );
    }
    private Rating mapToDomainRating(HogsResultsDocument.HogsRating rating) {

        Rating.RatingType type;
        try {
            type = Rating.RatingType.valueOf(rating.ratingType());
        } catch (IllegalArgumentException e) {
            return null;
        }

        return new Rating(
                type,
                rating.rating(),
                rating.comment()
        );
    }

    private HogsResultsDocument.Company mapToDocComapany(Company company) {
        return new HogsResultsDocument.Company(
                company.id(),
                company.name(),
                company.tin(),
                company.Country()
        );
    }
    private Company mapToDomainCompany(HogsResultsDocument.Company company) {
        return new Company(
                company.id(),
                company.name(),
                company.tin(),
                company.country()
        );
    }
    private HogsResultsDocument.HogsRating mapToDocRating(Rating rating){
        return new HogsResultsDocument.HogsRating(
              rating.ratingType().name(),
              rating.rating(),
              rating.comment()
        );
    }
}
