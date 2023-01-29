package pl.ug.mbrzoskowski.lab4.controller.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import pl.ug.mbrzoskowski.lab4.domain.Platform;
import pl.ug.mbrzoskowski.lab4.domain.VideoGame;
import pl.ug.mbrzoskowski.lab4.service.GameManager;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Controller
public class WebController {

    private final GameManager manager;

    public WebController(@Autowired GameManager manager) {
        this.manager = manager;
    }

    @GetMapping(value = "/web/videogames")
    public String videogames(Model model) {
        model.addAttribute("allGamesFromDB", manager.getGames().values());
        return "videogames-all";
    }

    @GetMapping("/web/videogames/form")
    public String videogameForm(Model model) {
        List<Platform> platforms = new ArrayList<>(List.of(Platform.values()));
        model.addAttribute("platforms", platforms);
        model.addAttribute("gameToAdd", new VideoGame(UUID.randomUUID().toString(), "unknown", 0000, null));
        return "videogame-form";
    }

    @PostMapping("/web/videogames")
    public String addNewVideogame(@ModelAttribute VideoGame gameToAdd, Model model) {
        gameToAdd.setId(UUID.randomUUID().toString());
        manager.addGame(gameToAdd);
        model.addAttribute("allGamesFromDB", manager.getGames().values());
        return "videogames-all";
    }

    @GetMapping("/web/videogames/delete/{id}")
    public String deleteGame(@PathVariable("id") String id, Model model) {
        if (manager.deleteGame(id)) {
            model.addAttribute("successMessage", "Usunięcie gry powiodło się");
            return "success";
        }
        else {
            model.addAttribute("errorMessage", "Usunięcie gry nie powiodło się");
            return "error";
        }
    }

    @GetMapping("/web/videogames/edit/{id}")
    public String editGame(@PathVariable("id") String id, Model model){
        VideoGame gameToEdit = manager.getGameByID(id);
        model.addAttribute("gameToEdit", gameToEdit);
        List<Platform> platforms = new ArrayList<>(List.of(Platform.values()));
        model.addAttribute("platforms", platforms);
        return "videogame-form-edit";
    }

    @PostMapping("/web/videogames/edit")
    public String editVideoGame(@ModelAttribute VideoGame gameToEdit, Model model){
        if (manager.putGame(gameToEdit)) {
            model.addAttribute("successMessage", "Edytowanie gry powiodło się");
            return "success";
        }
        else {
            model.addAttribute("errorMessage", "Edytowanie gry nie powiodło się");
            return "error";
        }
    }
}
