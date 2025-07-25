package com.onlineLearning.Online.Quiz.Learning;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.onlineLearning")
@EntityScan(basePackages = {"com.onlineLearning.Entity", "com.onlineLearning.RefreshToken"})
@EnableJpaRepositories(basePackages = "com.onlineLearning.Repository")
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
