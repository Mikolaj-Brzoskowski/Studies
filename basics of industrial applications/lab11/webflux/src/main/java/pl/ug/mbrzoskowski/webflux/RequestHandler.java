package pl.ug.mbrzoskowski.webflux;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
public class RequestHandler {
    private final ActivePlayersService activePlayersService;
    public RequestHandler(ActivePlayersService activePlayersService) {
        this.activePlayersService = activePlayersService;
    }

    public Mono<ServerResponse> playersStream(ServerRequest request){

        return ServerResponse
                .ok()
                .contentType(MediaType.TEXT_EVENT_STREAM)
                .body(activePlayersService.playersStream(), ActivePlayersEvent.class);
    }
}
