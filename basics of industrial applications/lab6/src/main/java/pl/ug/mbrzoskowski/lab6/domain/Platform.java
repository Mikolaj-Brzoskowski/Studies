package pl.ug.mbrzoskowski.lab6.domain;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class Platform {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToMany(mappedBy="platforms")
    private Collection<VideoGame> games;
    private String platform_name;
    private int platform_release_year;

    public Platform(String platform_name, int platform_release_year) {
        this.platform_name = platform_name;
        this.platform_release_year = platform_release_year;
    }

    private Platform() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Collection<VideoGame> getGames() {
        return games;
    }

    public void setGames(Collection<VideoGame> games) {
        this.games = games;
    }

    public String getPlatform_name() {
        return platform_name;
    }

    public void setPlatform_name(String platform_name) {
        this.platform_name = platform_name;
    }

    public int getPlatform_release_year() {
        return platform_release_year;
    }

    public void setPlatform_release_year(int platform_release_year) {
        this.platform_release_year = platform_release_year;
    }
}
