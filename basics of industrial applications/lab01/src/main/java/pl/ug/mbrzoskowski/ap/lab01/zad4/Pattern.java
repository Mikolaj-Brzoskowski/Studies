package pl.ug.mbrzoskowski.ap.lab01.zad4;

import java.util.Scanner;

public class Pattern {
       static public StringBuilder patternMaker(){
            Scanner myObj = new Scanner(System.in);  // Create a Scanner object
            System.out.println("Enter number");
            while (!myObj.hasNextInt()) {
                System.out.println("Input is not a number.");
                System.out.println("Enter number");
                myObj.nextLine();
            }
            int number = myObj.nextInt();  // Read user input
            StringBuilder output = new StringBuilder(number);
            for (int i = 1; i < number + 1; i++) {
                output.append("x".repeat(i)).append("\n");
            }
            for (int i = number; i > 0; i--) {
                output.append("x".repeat(i)).append("\n");
            }
            for (int i = 0; i < number; i++) {
                output.append(" ".repeat(i)).append("x".repeat(number - i)).append("\n");
            }
            for (int i = number-1; i >= 0; i--) {
                output.append(" ".repeat(i)).append("x".repeat(number - i)).append("\n");
            }
            return output;
        }
}
