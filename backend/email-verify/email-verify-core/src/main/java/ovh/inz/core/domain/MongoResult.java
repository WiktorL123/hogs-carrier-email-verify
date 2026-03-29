package ovh.inz.core.domain;

import java.util.List;

public record MongoResult(
        String email,
        List<Rating> ratings) { }
