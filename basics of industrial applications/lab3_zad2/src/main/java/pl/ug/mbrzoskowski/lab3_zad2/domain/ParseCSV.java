package pl.ug.mbrzoskowski.lab3_zad2.domain;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.*;
import pl.ug.mbrzoskowski.lab3_zad2.domain.Person;

import java.io.*;
import java.net.URL;
import java.util.*;

public class ParseCSV {

    public static List<List<String>> result = new ArrayList<>();

    public static Map<String, Person> parseCSV() throws IOException {
        Map<String, Person> persons = new HashMap<>();
        InputStream input = new URL("https://stepik.org/media/attachments/lesson/266646/MOCK_DATA.csv").openStream();
        try (CSVReader reader = new CSVReader(new InputStreamReader(input))) {
            List<String[]> r = reader.readAll();
            r.stream().skip(1).forEach(person -> persons.put(person[0], createPerson(person)
            ));
        } catch (IOException e) {
            throw e;
        } catch (CsvException e) {
            throw new RuntimeException(e);
        }
        return persons;
    }

    private static Person createPerson(String[] metadata) {

        String first_name = metadata[1];
        String last_name = metadata[2];
        String email = metadata[3];
        String company_name = metadata[4];

        return new Person(first_name, last_name, email, company_name);
    }

}
