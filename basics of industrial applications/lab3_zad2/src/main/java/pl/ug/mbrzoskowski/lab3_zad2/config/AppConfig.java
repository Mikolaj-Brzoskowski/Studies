package pl.ug.mbrzoskowski.lab3_zad2.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import pl.ug.mbrzoskowski.lab3_zad2.domain.Person;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static pl.ug.mbrzoskowski.lab3_zad2.domain.ParseCSV.parseCSV;

@Configuration
public class AppConfig {

    @Bean
    @Qualifier("prezes")
    @Scope("singleton")
    public Person createBoss(){
        System.out.println("Tworze prezesa w configu");
        return new Person("Chrystal","Havoc","chavocr@yahoo.com","Mymm");
    }

    @Bean
    @Qualifier("wiceprezes")
    @Scope("singleton")
    public Person createViceboss(){
        System.out.println("Tworze wiceprezesa w configu");
        return new Person("Halley","Gadaud","hgadaud9@sohu.com","Oyope");
    }

    @Bean
    @Qualifier("sekretarka")
    @Scope("singleton")
    public Person createSecretary(){
        System.out.println("Tworze sekretarke w configu");
        return new Person("Kirbie","Wrettum","kwrettumj@slideshare.net","Browsetype");
    }

    @Bean
    @Scope("singleton")
    @Qualifier("Person")
    public ArrayList<Person> createBean() throws IOException {
        ArrayList<Person> personList = new ArrayList<Person>();
        parseCSV().values().forEach(tab -> personList.add(tab));
        return personList;
    }

}
