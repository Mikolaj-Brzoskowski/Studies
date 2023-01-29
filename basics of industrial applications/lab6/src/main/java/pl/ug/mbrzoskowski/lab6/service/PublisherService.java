package pl.ug.mbrzoskowski.lab6.service;

import org.springframework.stereotype.Service;
import pl.ug.mbrzoskowski.lab6.domain.Publisher;
import pl.ug.mbrzoskowski.lab6.domain.VideoGame;
import pl.ug.mbrzoskowski.lab6.repository.PublisherRepository;
import pl.ug.mbrzoskowski.lab6.repository.VideoGameRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PublisherService {

    final VideoGameRepository videoGameRepository;

    final PublisherRepository publisherRepository;

    public PublisherService(VideoGameRepository videoGameRepository, PublisherRepository publisherRepository) {
        this.videoGameRepository = videoGameRepository;
        this.publisherRepository = publisherRepository;
    }

    public Iterable<Publisher> findAllPublishers(){
        return publisherRepository.findAll();
    }
    public void learning() {
        VideoGame game1 = new VideoGame("NieR: Automata", 2017);
        VideoGame game2 = new VideoGame("Forspoken", 2023);
        VideoGame game3 = new VideoGame("Tomb Raider", 2013);
        VideoGame game4 = new VideoGame("Final Fantasy XV", 2020);

        List<VideoGame> games = new ArrayList<>();
        games.add(game1);
        games.add(game2);
        games.add(game3);
        games.add(game4);

        Publisher squareEnix = new Publisher("Square Enix", 2003);
        squareEnix.setGames(games);

        Publisher publisherRetrieved = publisherRepository.save(squareEnix);

        Optional<Publisher> publisherOpt = publisherRepository.findById(publisherRetrieved.getId());

        publisherOpt.ifPresent(publisher -> {
            System.out.println(publisher.getGames().size());
        });

        Publisher bandaiNamco = new Publisher("Bandai Namco", 2006);

        publisherRepository.save(bandaiNamco);

        publisherRepository.findByYearOfCreation(2006).forEach(System.out::println);
    }
}
