package pl.ug.mbrzoskowski.lab4;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import pl.ug.mbrzoskowski.lab4.domain.Platform;
import pl.ug.mbrzoskowski.lab4.domain.VideoGame;
import pl.ug.mbrzoskowski.lab4.service.GameManager;
import pl.ug.mbrzoskowski.lab4.service.GameManagerInterface;

@SpringBootApplication
public class Main {

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

	@Bean
	public CommandLineRunner appSetup(@Autowired GameManagerInterface gamemanager){
		return args -> {
			System.out.println("CommandLineRunner started...");
			gamemanager.addGame(new VideoGame("1", "Overwatch", 2016, Platform.PC));
			gamemanager.addGame(new VideoGame("2", "Team Fortress 2", 2007, Platform.PC));
			gamemanager.addGame(new VideoGame("3", "Borderlands 3", 2019, Platform.PS5));
			gamemanager.addGame(new VideoGame("4", "Candy Crush", 2012, Platform.ANDROID));
		};
	}


}

