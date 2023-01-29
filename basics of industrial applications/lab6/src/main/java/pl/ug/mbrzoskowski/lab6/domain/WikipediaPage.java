package pl.ug.mbrzoskowski.lab6.domain;

import javax.persistence.*;

@Entity
public class WikipediaPage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(mappedBy="page")
    private VideoGame game;
    private String URL;

    public WikipediaPage(VideoGame game, String URL) {
        this.game = game;
        this.URL = URL;
    }

    public WikipediaPage(){
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getURL() {
        return URL;
    }

    public void setURL(String URL) {
        this.URL = URL;
    }

    public VideoGame getGame() {
        return game;
    }

    public void setGame(VideoGame game) {
        this.game = game;
    }
}
