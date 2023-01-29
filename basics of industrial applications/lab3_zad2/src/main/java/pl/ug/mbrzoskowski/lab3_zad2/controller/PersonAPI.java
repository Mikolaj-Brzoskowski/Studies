package pl.ug.mbrzoskowski.lab3_zad2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.ug.mbrzoskowski.lab3_zad2.domain.Person;
import pl.ug.mbrzoskowski.lab3_zad2.service.PersonManager;

import javax.naming.NameNotFoundException;
import java.util.List;
import java.util.Map;

@RestController
public class PersonAPI {

    private final PersonManager personManager;

    public PersonAPI(@Autowired PersonManager personManager) {
        this.personManager = personManager;
    }

    @PostMapping("/api/person")
    Person addPerson(@RequestBody Person person) {
        return personManager.addPerson(person);
    }

    @PutMapping("/api/person")
    public boolean modifyPerson(@RequestBody Person person, @PathVariable("id") String id) {return personManager.putPerson(person, id);}

    @GetMapping("/api/person")
    Map<String, Person> getAll() {
        return personManager.getAllPersons();
    }

    @GetMapping("/api/person/{first_name}")
    Map.Entry<String, Person> findPerson(@PathVariable("first_name") String first_name) throws PersonNotFoundException {
        Map.Entry<String, Person> foundPerson = personManager.findByName(first_name);
        if (foundPerson == null) {
            throw new PersonNotFoundException();
        }

        return foundPerson;
    }

    @DeleteMapping("/api/person/{id}")
    public boolean deletePerson(@PathVariable("id") String id){
      return personManager.deletePerson(id);
    }


}
