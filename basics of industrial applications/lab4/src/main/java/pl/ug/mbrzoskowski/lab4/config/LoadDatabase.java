package pl.ug.mbrzoskowski.lab4.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import pl.ug.mbrzoskowski.lab4.domain.Platform;
import pl.ug.mbrzoskowski.lab4.domain.VideoGame;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class LoadDatabase {
    private static final Logger logger = LoggerFactory.getLogger(LoadDatabase.class);
    static Map<String, VideoGame> repository = new HashMap<>();

    static int counter = -1;

    static {
        repository.put("1", new VideoGame("1", "Overwatch", 2016, Platform.PC));
        repository.put("2", new VideoGame("2", "Team Fortress 2", 2007, Platform.PC));
        repository.put("3", new VideoGame("3", "Borderlands 3", 2019, Platform.PS5));
        repository.put("4", new VideoGame("4", "Candy Crush", 2012, Platform.ANDROID));
    }

    @Bean
    VideoGame LoadDatabase(){
        counter++;
        return repository.get(Integer.toString(counter));
    }
}
