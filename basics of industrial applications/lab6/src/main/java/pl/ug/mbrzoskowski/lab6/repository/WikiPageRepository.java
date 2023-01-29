package pl.ug.mbrzoskowski.lab6.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.ug.mbrzoskowski.lab6.domain.WikipediaPage;

import java.util.List;

@Repository
public interface WikiPageRepository extends CrudRepository<WikipediaPage, Long>{
    @Query(nativeQuery = true, value = "Select * from WikipediaPage where game=?")
    WikipediaPage findByGame(String game);
    @Query(nativeQuery = true, value = "Select * from WikipediaPage")
    List<WikipediaPage> getAllWikiPages();
}