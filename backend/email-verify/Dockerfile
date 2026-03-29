FROM maven:3.9.6-eclipse-temurin-21 AS deps
WORKDIR /app

COPY pom.xml .

COPY email-verify-core/pom.xml email-verify-core/
COPY email-verify-application/pom.xml email-verify-application/

COPY adapters/email-verify-mongo-adapter/pom.xml adapters/email-verify-mongo-adapter/
COPY adapters/email-verify-abstract-api-adapter/pom.xml adapters/email-verify-abstract-api-adapter/
COPY adapters/email-verify-hogs-adapter/pom.xml adapters/email-verify-hogs-adapter/
COPY adapters/email-verify-redis-adapter/pom.xml adapters/email-verify-redis-adapter/

RUN mvn -B -DskipTests dependency:go-offline -pl email-verify-application -am


FROM deps AS build
WORKDIR /app

COPY email-verify-core/src email-verify-core/src
COPY email-verify-application/src email-verify-application/src

COPY adapters/email-verify-mongo-adapter/src adapters/email-verify-mongo-adapter/src
COPY adapters/email-verify-abstract-api-adapter/src adapters/email-verify-abstract-api-adapter/src
COPY adapters/email-verify-hogs-adapter/src adapters/email-verify-hogs-adapter/src
COPY adapters/email-verify-redis-adapter/src adapters/email-verify-redis-adapter/src


RUN mvn -B -DskipTests clean package -pl email-verify-application -am


FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

COPY --from=build /app/email-verify-application/target/*.jar app.jar

EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
