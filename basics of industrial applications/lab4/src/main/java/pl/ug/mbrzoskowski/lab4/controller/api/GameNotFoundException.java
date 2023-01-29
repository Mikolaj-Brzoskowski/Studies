package pl.ug.mbrzoskowski.lab4.controller.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "No such Person in database")
public class GameNotFoundException extends RuntimeException {
    GameNotFoundException(String id) {
        super("Could not find employee " + id);
    }
}
