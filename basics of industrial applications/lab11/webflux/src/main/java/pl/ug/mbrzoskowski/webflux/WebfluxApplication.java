package pl.ug.mbrzoskowski.webflux;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.stream.Stream;

@SpringBootApplication
public class WebfluxApplication {

	Logger logger = LoggerFactory.getLogger(WebfluxApplication.class);
	private static final VideoGame[] arrayOfGames = {
			new VideoGame("Red Dead Redemption", 2010),
			new VideoGame("Genshin Impact", 2020),
			new VideoGame("Doki Doki Literature Club", 2017),
			new VideoGame("League of Legends", 2009),
			new VideoGame("Among Us", 2018),
			new VideoGame("World of Warcraft", 2004)
	};

	public static void main(String[] args) {
		SpringApplication.run(WebfluxApplication.class, args);
	}

	@Bean
	ApplicationRunner runner() {
		return args -> WebClient.create("http://localhost:8080/").get()
				.uri("playercount")
				.retrieve()
				.bodyToFlux(ActivePlayersEvent.class)
				.subscribe(data -> logger.info(data.toString()));
	}


	@Bean
	ApplicationRunner learning() {
		return args ->
		{
			Stream.of(arrayOfGames)
					.peek(game -> game.setRelease_year(game.getRelease_year() + 1))
					.filter(game -> game.getRelease_year() >= 2010)
					.forEach(game -> logger.info("Java (non reactive) Stream: " + game));


			Flux.interval(Duration.ofSeconds(2))
					.take(10)
					.filter(number -> number % 6 == 0)
					.map(n -> n * 5)
					.subscribe(data -> logger.info("Reactive Stream: " + data.toString()));

		};
		}

}
