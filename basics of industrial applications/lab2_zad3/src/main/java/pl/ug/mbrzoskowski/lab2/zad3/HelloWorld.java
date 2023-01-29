package pl.ug.mbrzoskowski.lab2.zad3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HelloWorld {

	public static void main(String[] args) {
		SpringApplication.run(HelloWorld.class, args);
		Greeter greeter = new Greeter();
		System.out.println(greeter.sayHello());
	}

}
