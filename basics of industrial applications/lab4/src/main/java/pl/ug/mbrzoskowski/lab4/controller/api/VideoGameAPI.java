package pl.ug.mbrzoskowski.lab4.controller.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.ug.mbrzoskowski.lab4.domain.VideoGame;
import pl.ug.mbrzoskowski.lab4.service.GameManager;

import java.net.URI;
import java.util.Map;

@RestController
public class VideoGameAPI {

    private final GameManager gameManager;

    public VideoGameAPI(@Autowired GameManager gameManager) {
        this.gameManager = gameManager;
    }

    @GetMapping(value="/api/videogames", produces = "application/json")
    ResponseEntity<Map<String, VideoGame>> getAllGames() throws JsonProcessingException {
        Map<String, VideoGame> response = gameManager.getGames();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping(value="/api/videogames/{id}", produces = "application/json")
    ResponseEntity<VideoGame> getGameByID(@PathVariable String id) throws JsonProcessingException {
        VideoGame response = gameManager.getGameByID(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value="/api/videogames", produces = "application/json")
    ResponseEntity addGame(@RequestBody VideoGame game) throws JsonProcessingException {
        VideoGame response = gameManager.addGame(game);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(response.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping(value="/api/videogames", produces = "application/json")
    ResponseEntity<String> putGame(@RequestBody VideoGame game) {
        boolean response = gameManager.putGame(game);
        if (response) {
            return new ResponseEntity<>(String.valueOf(response), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(String.valueOf(response), HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping(value="/api/videogames/{id}", produces = "application/json")
    ResponseEntity<String> deleteGame(@PathVariable String id) {
        boolean response = gameManager.deleteGame(id);
        if (response) {
            return new ResponseEntity<>(String.valueOf(response), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(String.valueOf(response), HttpStatus.NOT_FOUND);
        }
    }

}
