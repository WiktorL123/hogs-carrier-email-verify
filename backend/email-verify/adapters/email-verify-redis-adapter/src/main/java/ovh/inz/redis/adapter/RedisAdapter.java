package ovh.inz.redis.adapter;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import ovh.inz.core.port.out.TokenCachePort;

import java.time.Duration;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class RedisAdapter implements TokenCachePort {

    private final StringRedisTemplate redis;
    @Value("${cache.email.ttl}")
    private Duration ttl;
    @Value("${cache.email.key.prefix}")
    private String tokenPrefix;
    @Override
    public Optional<String> getToken(String key) {
        String redisKey = tokenPrefix + ":" + key;
        String token = redis.opsForValue().get(redisKey);
        return Optional.ofNullable(token);
    }

    @Override
    public void saveToken(String key, String token) {
        String redisKey = tokenPrefix + ":" + key;
        redis.opsForValue().set(redisKey, token, ttl);
    }
}
