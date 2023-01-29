package pl.ug.mbrzoskowski.ap.lab01.zad2;

public class Armstrong {

    static boolean armstrong(int number) {
        String stringed_number = String.valueOf(number);
        int length = stringed_number.length();
        int sum = 0;
        for (int i = 0; i < length; i++){
            sum += Math.pow(Character.getNumericValue(stringed_number.charAt(i)), length) ;
        }
        return sum == number;
    }
}
