package pl.ug.mbrzoskowski.lab3_zad2.service;

import pl.ug.mbrzoskowski.lab3_zad2.domain.Person;

import java.util.List;
import java.util.Map;

public interface PersonManagerInterface {

        Person addPerson(Person person);
        Map<String, Person> getAllPersons();
        boolean putPerson(Person person, String id);
        boolean deletePerson(String id);
        Map.Entry<String, Person> findByName(String first_name);


}
