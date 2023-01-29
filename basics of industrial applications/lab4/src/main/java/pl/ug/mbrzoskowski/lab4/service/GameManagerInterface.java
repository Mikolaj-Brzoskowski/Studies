package pl.ug.mbrzoskowski.lab4.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.json.JSONObject;
import pl.ug.mbrzoskowski.lab4.domain.VideoGame;

import java.util.Map;
import java.util.UUID;

public interface GameManagerInterface {

    Map<String, VideoGame> getGames();
    VideoGame getGameByID(String id);
    VideoGame addGame(VideoGame game);
    boolean putGame(VideoGame game);
    boolean deleteGame(String id);
}
