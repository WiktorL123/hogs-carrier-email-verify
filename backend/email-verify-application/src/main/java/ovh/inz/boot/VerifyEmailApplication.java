package ovh.inz.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication(scanBasePackages = "ovh.inz")
@EnableMongoRepositories(basePackages = "ovh.inz.mongo.repository")
public class VerifyEmailApplication {
    public static void main(String[] args){
        SpringApplication.run(VerifyEmailApplication.class, args);
    }
}
