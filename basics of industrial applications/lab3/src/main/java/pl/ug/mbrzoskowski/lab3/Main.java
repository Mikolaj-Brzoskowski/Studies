package pl.ug.mbrzoskowski.lab3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import pl.ug.mbrzoskowski.lab3.domain.Person;
import pl.ug.mbrzoskowski.lab3.service.ParseCSV;

import java.io.IOException;
import java.util.Map;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class Main {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(Main.class, args);
		ParseCSV parser = new ParseCSV();
		Map<String, Person> persons = parser.parseCSV();
		System.out.println(persons);
		System.exit(0);
	}

}
