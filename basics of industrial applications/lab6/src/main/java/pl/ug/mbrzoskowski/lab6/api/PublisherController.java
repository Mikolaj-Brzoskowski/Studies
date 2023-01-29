package pl.ug.mbrzoskowski.lab6.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.ug.mbrzoskowski.lab6.domain.Publisher;
import pl.ug.mbrzoskowski.lab6.service.PublisherService;

@RestController
public class PublisherController {

    final
    PublisherService publisherService;

    public PublisherController(PublisherService videoGame) {
        this.publisherService = videoGame;
    }

    @GetMapping("/api/publisher")
    Iterable<Publisher> allPublishers() {return publisherService.findAllPublishers();}


}
