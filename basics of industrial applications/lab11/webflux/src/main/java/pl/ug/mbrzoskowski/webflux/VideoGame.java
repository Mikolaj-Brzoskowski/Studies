package pl.ug.mbrzoskowski.webflux;

public class VideoGame {
    private String title;
    private int release_year;

    public VideoGame(String title, int release_year) {
        this.title = title;
        this.release_year = release_year;
    }

    public VideoGame() {
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

    @Override
    public String toString() {
        return "VideoGame{" +
                "title='" + title + '\'' +
                ", release_year=" + release_year +
                '}';
    }

}
