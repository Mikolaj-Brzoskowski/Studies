package pl.ug.mbrzoskowski.lab6.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.ug.mbrzoskowski.lab6.domain.Platform;
import pl.ug.mbrzoskowski.lab6.domain.Publisher;
import pl.ug.mbrzoskowski.lab6.domain.VideoGame;

import java.util.List;
import java.util.Optional;

@Repository
public interface VideoGameRepository extends CrudRepository<VideoGame, Long> {

    @Query(nativeQuery = true, value = "Select * from VideoGame where publisher=?1")
    List<VideoGame> findByPublisher(Publisher publisher);
    @Query(nativeQuery = true, value = "Select * from VideoGame where release_year=?1")
    List<VideoGame> findByReleaseYear(int release_year);
    @Query("Select v from VideoGame v where v.publisher=?1 or v.title=?2")
    List<VideoGame> findByPublisherOrTitle(Publisher publisher, String title);
    @Query("Select v from VideoGame v where v.title=?1")
    List<VideoGame> findByTitle(String title);
    @Query("Select v from VideoGame v where v.publisher=?1 and platform in v.platforms")
    List<VideoGame> findByPublisherAndPlatform(Publisher publisher, Platform platform);
    @Query("Select g from VideoGame g join fetch g.publisher")
    List<VideoGame> getAllVideoGames();
    @Query("Update VideoGame v set v.title = :title WHERE v.id = :id")
    void updateTitle(@Param("id") Long id, @Param("title") String title);

}
