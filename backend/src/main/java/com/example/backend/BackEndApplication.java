package com.example.backend;

import com.example.backend.Controller.Controller;
import com.example.backend.Model.Person;
import com.example.backend.Service.PersonService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;

import java.util.List;

@SpringBootApplication
//@EnableAutoConfiguration
@ComponentScan({"com.example.backend.Repo", "com.example.backend.Service", "com.example.backend.Controller","config"})
public class BackEndApplication {

	public static void main(String[] args) {
		ApplicationContext applicationContext = SpringApplication.run(BackEndApplication.class, args);
		Controller controller = applicationContext.getBean(Controller.class);
		List<Person> persons = controller.getAllEntities();
		persons.forEach(System.out::println);
	}
}