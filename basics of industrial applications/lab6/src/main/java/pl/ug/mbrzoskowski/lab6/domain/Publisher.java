package pl.ug.mbrzoskowski.lab6.domain;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;

@Entity
public class Publisher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany(mappedBy="publisher", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Collection<VideoGame> games = new HashSet();
    private String publisher_name;
    private int publisher_creation_year;

    public Publisher(String publisher_name, int publisher_creation_year) {
        this.publisher_name = publisher_name;
        this.publisher_creation_year = publisher_creation_year;
    }

    public Publisher(){
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

    public String getPublisher_name() {
        return publisher_name;
    }

    public void setPublisher_name(String publisher_name) {
        this.publisher_name = publisher_name;
    }

    public int getPublisher_creation_year() {
        return publisher_creation_year;
    }

    public void setPublisher_creation_year(int publisher_creation_year) {
        this.publisher_creation_year = publisher_creation_year;
    }
}
