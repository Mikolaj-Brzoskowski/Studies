package pl.ug.mbrzoskowski.lab4.service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.Gson;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import pl.ug.mbrzoskowski.lab4.domain.VideoGame;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class GameManager implements GameManagerInterface {

    Map<String, VideoGame> videoGames_db = Collections.synchronizedMap(new HashMap<String, VideoGame>());

    @Override
    public Map<String, VideoGame> getGames() {
        return videoGames_db;
    }

    @Override
    public VideoGame getGameByID(String id) {
        VideoGame gameToFind = null;
        for (Map.Entry<String,VideoGame> game : videoGames_db.entrySet()) {
            if (game.getKey().equals(id)) {
                gameToFind = game.getValue();
            }
        }
        return gameToFind;
    }

    @Override
    public VideoGame addGame(VideoGame game) {
        VideoGame gameToAdd = new VideoGame(game.getId(), game.getTitle(), game.getRelease_year(), game.getPlatform());
        videoGames_db.put(game.getId(), gameToAdd);
        return gameToAdd;
    }

    @Override
    public boolean putGame(VideoGame game) {
        boolean gameExists = false;
        for (VideoGame gameInDB : videoGames_db.values()) {
            if (gameInDB.getId().equals(game.getId())) {
                gameExists = true;
            }
        }
        if (gameExists) {
            videoGames_db.put(game.getId(), game);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteGame(String id) {
        VideoGame gameToDel = null;
        for (Map.Entry<String, VideoGame> game : videoGames_db.entrySet()) {
            if (game.getValue().getId().equals(id)) {
                videoGames_db.remove(id);
                return true;
            }
        }
        return false;
    }
}
