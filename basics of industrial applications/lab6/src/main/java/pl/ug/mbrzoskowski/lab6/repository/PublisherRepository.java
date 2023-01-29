package pl.ug.mbrzoskowski.lab6.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.ug.mbrzoskowski.lab6.domain.Platform;
import pl.ug.mbrzoskowski.lab6.domain.Publisher;

import java.util.List;

@Repository
public interface PublisherRepository extends CrudRepository<Publisher, Long>{

    @Query("Select p from Publisher p where game in p.games")
    Publisher findByGame(String game);

    @Query(nativeQuery = true, value = "Select * from Publisher where publisher_creation_year=?")
    List<Publisher> findByYearOfCreation(int publisher_creation_year);
    @Query(nativeQuery = true, value = "Select * from Publisher")
    List<Publisher> getAllPublishers();
}