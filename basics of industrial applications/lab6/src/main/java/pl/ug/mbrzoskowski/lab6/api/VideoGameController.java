package pl.ug.mbrzoskowski.lab6.api;

import org.springframework.web.bind.annotation.*;
import pl.ug.mbrzoskowski.lab6.domain.VideoGame;
import pl.ug.mbrzoskowski.lab6.service.VideoGameService;

import java.util.List;
import java.util.Optional;

@RestController
public class VideoGameController {
    final VideoGameService videoGameService;

    public VideoGameController(VideoGameService videoGameService) {
        this.videoGameService = videoGameService;
    }

    @GetMapping("/api/games/all")
    Iterable<VideoGame> getAllGames() {return videoGameService.findAllVideoGames();}

    @GetMapping("/api/games/{id}")
    Optional<VideoGame> getGameByID(@PathVariable Long id) {return videoGameService.findByID(id);}

    @GetMapping("/api/games/{title}")
    Iterable<VideoGame> getGameByTitle(@PathVariable String title) {return videoGameService.findByTitle(title);}

    @PostMapping("/api/games")
    VideoGame postGame(@RequestBody VideoGame videogame) {return videoGameService.saveVideoGame(videogame);}

    @DeleteMapping("/api/games/{id}")
    Optional<VideoGame> deleteGame(@PathVariable Long id) {return videoGameService.deleteVideoGameByID(id);}

    @PutMapping("/api/games/{id}")
    Optional<VideoGame> updateGame(@PathVariable Long id, @RequestBody VideoGame videogame) {return videoGameService.updateVideoGame(id, videogame);}


}
