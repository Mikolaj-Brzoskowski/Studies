package pl.ug.mbrzoskowski.lab3_zad2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ImportResource;
import pl.ug.mbrzoskowski.lab3_zad2.domain.Person;
import pl.ug.mbrzoskowski.lab3_zad2.service.PersonManagerService;

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;

import static pl.ug.mbrzoskowski.lab3_zad2.domain.ParseCSV.parseCSV;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@ImportResource("classpath:beans.xml")
public class Main {

	@Autowired
	private static ApplicationContext context;

	public static void main(String[] args) throws IOException {
		context = SpringApplication.run(Main.class, args);
		Map<String, Person> map = parseCSV();
		System.out.println(map);
		Map<String,Person> beans = context.getBeansOfType(Person.class);
		beans.forEach((k,v)->{
			System.out.println(k + " - "+v);
		});
		PersonManagerService personManagerService = context.getBean(PersonManagerService.class);
		System.out.println(personManagerService.getDirector().getFirst_name());
		System.exit(0);
	}

}
