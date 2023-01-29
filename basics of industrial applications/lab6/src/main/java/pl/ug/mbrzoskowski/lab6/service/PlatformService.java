package pl.ug.mbrzoskowski.lab6.service;


import org.springframework.stereotype.Service;
import pl.ug.mbrzoskowski.lab6.domain.Platform;
import pl.ug.mbrzoskowski.lab6.domain.Publisher;
import pl.ug.mbrzoskowski.lab6.domain.VideoGame;
import pl.ug.mbrzoskowski.lab6.repository.PlatformRepository;
import pl.ug.mbrzoskowski.lab6.repository.PublisherRepository;
import pl.ug.mbrzoskowski.lab6.repository.VideoGameRepository;

import java.util.ArrayList;
import java.util.List;


@Service
public class PlatformService {

    final PlatformRepository platformRepository;

    final PublisherRepository publisherRepository;
    final VideoGameRepository videoGameRepository;

    public PlatformService(PlatformRepository platformRepository, PublisherRepository publisherRepository, VideoGameRepository videoGameRepository) {
        this.platformRepository = platformRepository;
        this.publisherRepository = publisherRepository;
        this.videoGameRepository = videoGameRepository;
    }

    public Iterable<Platform> findAllPlatforms() {
        return platformRepository.findAll();
    }

    public void learning() {

        Platform platform = new Platform("PC", 1981);
        Platform platform2 = new Platform("PlayStation 5", 2020);
        Platform platform3 = new Platform("XBOX Series X", 2020);
        Platform platform4 = new Platform("Nintendo Switch", 2017);

        platformRepository.save(platform);
        platformRepository.save(platform2);
        platformRepository.save(platform3);
        platformRepository.save(platform4);

        List<Platform> platforms = platformRepository.getAllPlatforms();
        System.out.println(platforms);

        List<Platform> consoles = new ArrayList<>();

        consoles.add(platform2);
        consoles.add(platform3);

        VideoGame game = new VideoGame("Just Dance 2021" ,2021);
        game.setPlatforms(consoles);

        VideoGame persistedGame = videoGameRepository.save(game);

        videoGameRepository.deleteById(persistedGame.getId());

        platforms = platformRepository.findByGame("Just Dance 2021");
        System.out.println(platforms);

    }

}

