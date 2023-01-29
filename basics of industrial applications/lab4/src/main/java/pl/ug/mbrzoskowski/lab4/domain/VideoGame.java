package pl.ug.mbrzoskowski.lab4.domain;

public class VideoGame {

    private String id;
    private String title;
    private int release_year;
    private Platform platform;

//    public VideoGame(String title, int release_year, Platform platform) {
//        this.title = title;
//        this.release_year = release_year;
//        this.platform = platform;
//    }

    public VideoGame(String id, String title, int release_year, Platform platform) {
        this.id = id;
        this.title = title;
        this.release_year = release_year;
        this.platform = platform;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public Platform getPlatform() {
        return platform;
    }

    public void setPlatform(Platform platform) {
        this.platform = platform;
    }

    @Override
    public String toString() {
        return "VideoGame{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", release_year=" + release_year +
                ", platform=" + platform +
                '}';
    }
}
