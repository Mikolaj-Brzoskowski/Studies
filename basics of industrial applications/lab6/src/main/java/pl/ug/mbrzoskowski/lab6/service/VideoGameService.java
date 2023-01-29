package pl.ug.mbrzoskowski.lab6.service;

import org.springframework.stereotype.Service;
import pl.ug.mbrzoskowski.lab6.domain.Platform;
import pl.ug.mbrzoskowski.lab6.domain.Publisher;
import pl.ug.mbrzoskowski.lab6.domain.VideoGame;
import pl.ug.mbrzoskowski.lab6.repository.PublisherRepository;
import pl.ug.mbrzoskowski.lab6.repository.VideoGameRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VideoGameService {

    final VideoGameRepository videoGameRepository;
    final PublisherRepository publisherRepository;

    public VideoGameService(VideoGameRepository videoGameRepository, PublisherRepository publisherRepository) {
        this.videoGameRepository = videoGameRepository;
        this.publisherRepository = publisherRepository;
    }

    public Iterable<VideoGame> findAllVideoGames() {
        return videoGameRepository.getAllVideoGames();
    }
    public Optional<VideoGame> findByID(Long id) { return videoGameRepository.findById(id); }
    public Iterable<VideoGame> findByTitle(String title) { return videoGameRepository.findByTitle(title); }
    public VideoGame saveVideoGame(VideoGame videogame) { return videoGameRepository.save(videogame); }
    public Optional<VideoGame> deleteVideoGameByID(Long id) {
        Optional<VideoGame> videoGameFound = videoGameRepository.findById(id);
        videoGameFound.ifPresent(videogame -> {
           videoGameRepository.deleteById(id);
        });
        return videoGameFound;
    }
    public Optional<VideoGame> updateVideoGame(Long id, VideoGame game) {
        Optional<VideoGame> oldGameFound = videoGameRepository.findById(id);
        oldGameFound.ifPresent(videogame -> {
            videoGameRepository.save(game);
        });
        Optional<VideoGame> updatedVideoGame = videoGameRepository.findById(id);
        return updatedVideoGame;
    }

    public VideoGame addVideoGame(VideoGame game){
        return videoGameRepository.save(game);
    }

    public void learning(){
        Publisher squareEnix = new Publisher("Square Enix", 2003);
        Publisher nintendo = new Publisher("Nintendo", 1889);
        Platform pc = new Platform("PC", 1991);
        Platform ps5 = new Platform("PS5", 2020);
        List<Platform> platforms = new ArrayList<>();
        platforms.add(pc);
        platforms.add(ps5);

        VideoGame game1 = new VideoGame("NieR: Automata", 2017);
        VideoGame game2 = new VideoGame("Forspoken", 2023);
        VideoGame game3 = new VideoGame("Doom", 2016);
        VideoGame game4 = new VideoGame("Final Fantasy XV", 2020);

        game1.setPublisher(squareEnix);
        game2.setPublisher(squareEnix);
        game2.setPlatforms(platforms);
        game4.setPublisher(nintendo);

        videoGameRepository.save(game1);
        videoGameRepository.save(game2);
        videoGameRepository.save(game3);
        videoGameRepository.save(game4);

        videoGameRepository.findByPublisher(squareEnix).forEach(System.out::println);
        videoGameRepository.findByReleaseYear(2023).forEach(System.out::println);
        videoGameRepository.findByPublisherOrTitle(squareEnix, "Doom").forEach(System.out::println);
        videoGameRepository.findByPublisherAndPlatform(squareEnix, pc).forEach(System.out::println);
        videoGameRepository.getAllVideoGames().forEach(System.out::println);

        for (VideoGame videoGame : videoGameRepository.findAll()) {
            System.out.println(videoGame.getPublisher().getPublisher_name());
            System.out.println(videoGame.getTitle());
        }

        for (VideoGame videoGame : videoGameRepository.getAllVideoGames()) {
            System.out.println(videoGame.getPublisher().getPublisher_name());
            System.out.println(videoGame.getTitle());
        }
    }

}
