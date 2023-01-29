package pl.ug.mbrzoskowski.lab3_zad2.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import pl.ug.mbrzoskowski.lab3_zad2.domain.Person;


@Component
public class PersonManagerService {

    private final Person director;
    private final Person vicedirector;
    private final Person secretary;

    public PersonManagerService(@Autowired @Qualifier("prezes") Person director,
                                @Autowired @Qualifier("wiceprezes") Person vicedirector,
                                @Autowired @Qualifier("sekretarka") Person secretary)
    {
        this.director = director;
        this.vicedirector = vicedirector;
        this.secretary = secretary;
    }

    public Person getDirector() {
        return director;
    }

    public Person getVicedirector() {
        return vicedirector;
    }

    public Person getSecretary() {
        return secretary;
    }
}
