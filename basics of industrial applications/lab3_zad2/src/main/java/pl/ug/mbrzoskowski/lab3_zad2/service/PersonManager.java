package pl.ug.mbrzoskowski.lab3_zad2.service;

import pl.ug.mbrzoskowski.lab3_zad2.domain.Person;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

import static pl.ug.mbrzoskowski.lab3_zad2.domain.ParseCSV.parseCSV;

public class PersonManager implements PersonManagerInterface{
    Map<String, Person> db = parseCSV();

    public PersonManager() throws IOException {
    }

    @Override
    public Person addPerson(Person person) {
        Person personToAdd = person;
        db.put(UUID.randomUUID().toString(), person);
        return personToAdd;
    }

    @Override
    public boolean putPerson(Person person, String id){
        for (Map.Entry<String, Person> pair : db.entrySet()) {
            if (pair.getKey().equals(id)) {
                db.put(id, person);
                return true;
            }
        }
        return false;
    }


    @Override
    public Map.Entry<String, Person> findByName(String first_name){
        Map.Entry<String, Person> personToFind = null;

        for (Map.Entry<String, Person> pair : db.entrySet()) {
            if (pair.getValue().getFirst_name().equals(first_name)) {
                personToFind = pair;
            }
        }

        return personToFind;
    }

    @Override
    public Map<String, Person> getAllPersons() {
        return db;
    }

    @Override
    public boolean deletePerson(String id) {

        Map.Entry<String, Person> personToDelete = null;

        for (Map.Entry<String, Person> pair : db.entrySet()) {
            if (pair.getKey().equals(id)) {
                personToDelete = pair;
            }
        }

        if (personToDelete != null) {
            db.remove(personToDelete);
            return true;
        }
        return false;
    }

}
