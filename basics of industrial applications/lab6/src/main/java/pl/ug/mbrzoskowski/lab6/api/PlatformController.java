package pl.ug.mbrzoskowski.lab6.api;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.ug.mbrzoskowski.lab6.domain.Platform;
import pl.ug.mbrzoskowski.lab6.service.PlatformService;

@RestController
public class PlatformController {

    final PlatformService platformService;

    public PlatformController(PlatformService platformService) {
        this.platformService = platformService;
    }

    @GetMapping("/api/platforms")
    Iterable<Platform> allPlatforms() {return platformService.findAllPlatforms();}


}
