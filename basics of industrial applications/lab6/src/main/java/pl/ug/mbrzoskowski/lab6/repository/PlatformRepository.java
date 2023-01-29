package pl.ug.mbrzoskowski.lab6.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.ug.mbrzoskowski.lab6.domain.Platform;
import pl.ug.mbrzoskowski.lab6.domain.Publisher;

import java.util.List;

@Repository
public interface PlatformRepository extends CrudRepository<Platform, Long>{

    @Query(nativeQuery = true, value = "Select * from Platform")
    List<Platform> getAllPlatforms();

    @Query("Select p from Platform p where game in p.games")
    List<Platform> findByGame(String game);
}
