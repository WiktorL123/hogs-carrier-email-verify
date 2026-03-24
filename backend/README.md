# Email Verify

Instrukcja do lokalnego uruchomienia `email-verify`.

## Wymagania

- Java 21
- Maven 3.9+
- (Opcjonalnie) Docker do lokalnego MongoDB/Redis

## Lokalne uruchomienie

Serwis ma domyślny port `8081` i profil `local`.

Do uruchonmienia niezbędne jest uzupełnienie odpowiednich danych:

spring.data.mongodb.uri=
#spring.data.mongodb.uri=
management.endpoint.health.show-details=always
spring.data.redis.host=localhost
spring.data.redis.port=6379
spring.data.redis.password=pass
spring.data.redis.database=0
cache.email.ttl=100s
cache.email.key.prefix=cache_email

hogs.api.base.url=

hogs.api.bot.login=
hogs.api.bot.password=
hogs.api.arsHash=

abstractapi.api.key=
abstractapi.base.url=

logging.level.org.springframework.data.redis=DEBUG
logging.level.org.springframework.data.redis.core=TRACE
logging.level.io.lettuce.core=DEBUG

### 1) Uruchom MongoDB i Redis lokalnie

Najprościej przez Dockera:

```bash
docker run --name email-verify-mongo -p 27017:27017 -d mongo:7
docker run --name email-verify-redis -p 6379:6379 -d redis:7
```

> Jeśli masz Mongo/Redis już lokalnie, pomiń Docker.

### 2) Uruchom aplikację na profilu `local`

Z katalogu `email-verify/`:

```bash
mvn -pl email-verify-application spring-boot:run -Dspring-boot.run.profiles=local
```


Plik z ustawieniami znajdziesz tutaj:
`email-verify-application/src/main/resources/application-local.properties`

### 3) Sprawdzenie działania

Przykładowe wywołanie:

```bash
curl -X POST http://localhost:8081/verify-email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

---

## (Opcjonalnie) Zatrzymanie kontenerów

```bash
docker stop email-verify-mongo email-verify-redis
```
