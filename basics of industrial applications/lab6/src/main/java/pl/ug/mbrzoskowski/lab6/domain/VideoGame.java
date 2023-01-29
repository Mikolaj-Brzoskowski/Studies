package pl.ug.mbrzoskowski.lab6.domain;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class VideoGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private int release_year;

    @ManyToOne
    private Publisher publisher;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private WikipediaPage page;

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Platform> platforms;

    public VideoGame(String title, int release_year) {
        this.title = title;
        this.release_year = release_year;
    }

    public VideoGame() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getRelease_year() {
        return release_year;
    }

    public void setRelease_year(int release_year) {
        this.release_year = release_year;
    }

    public Collection<Platform> getPlatforms() {
        return platforms;
    }

    public void setPlatforms(Collection<Platform> platforms) {
        this.platforms = platforms;
    }


    public Publisher getPublisher() {
        return publisher;
    }

    public void setPublisher(Publisher publisher) {
        this.publisher = publisher;
    }


    public WikipediaPage getPage() {
        return page;
    }

    public void setPage(WikipediaPage page) {
        this.page = page;
    }
}

