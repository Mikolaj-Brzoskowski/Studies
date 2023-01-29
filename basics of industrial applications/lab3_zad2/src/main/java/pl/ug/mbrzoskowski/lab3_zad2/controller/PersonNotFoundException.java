package pl.ug.mbrzoskowski.lab3_zad2.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "No such Person id DB")
public class PersonNotFoundException extends RuntimeException {
}
