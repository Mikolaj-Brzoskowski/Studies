package pl.ug.mbrzoskowski.webflux;

import java.time.LocalDateTime;

public class ActivePlayersEvent {

    private int playersCount;
    private LocalDateTime time;

    public ActivePlayersEvent(int playersCount, LocalDateTime time) {
        this.playersCount = playersCount;
        this.time = time;
    }

    public ActivePlayersEvent() {
    }

    public int getPlayersCount() {
        return playersCount;
    }

    public void setPlayersCount(int playersCount) {
        this.playersCount = playersCount;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "ActivePlayersEvent{" +
                "playersCount=" + playersCount +
                ", time=" + time +
                '}';
    }
}
