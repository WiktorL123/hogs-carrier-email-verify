package ovh.inz.core.port.out;


import java.util.Optional;

public interface TokenCachePort {
    Optional<String> getToken(String key);
    void saveToken(String key, String token);
}
