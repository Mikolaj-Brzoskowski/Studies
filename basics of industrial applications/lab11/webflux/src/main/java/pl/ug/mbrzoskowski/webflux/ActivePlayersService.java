package pl.ug.mbrzoskowski.webflux;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Random;
import java.util.stream.Stream;

@Service
public class ActivePlayersService {

    int counter = 0;
    public int makeCounter() {
        Random random = new Random();
        int adder =  adder = random.nextInt(30) - 10;
        while (adder + counter <= 0){
            adder = random.nextInt(30) - 10;
        }
        counter += adder;
        return counter;
    }
    public Flux<ActivePlayersEvent> playersStream(){

        Flux<Long> interval = Flux.interval(Duration.ofSeconds(3));

        Flux<ActivePlayersEvent> generator = Flux
                .fromStream(Stream.generate(
                        () -> new ActivePlayersEvent(
                                makeCounter(),
                                LocalDateTime.now())
                ));

        return Flux.zip(generator, interval, (g,i) -> g);
    }

}
