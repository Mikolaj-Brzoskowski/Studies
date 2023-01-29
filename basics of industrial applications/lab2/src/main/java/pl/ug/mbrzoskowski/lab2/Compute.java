package pl.ug.mbrzoskowski.lab2;

import org.apache.commons.math3.stat.descriptive.DescriptiveStatistics;

import java.util.Scanner;

public class Compute {
    private static DescriptiveStatistics descriptiveStatistics = new DescriptiveStatistics();
    public static Stats getStatistics() {
        Scanner myObj = new Scanner(System.in);
        System.out.println("Enter how many numbers you want to compute");
        int how_many = Integer.parseInt(myObj.nextLine());
        System.out.println("Enter numbers");
        for (int i = 0; i < how_many; i++) {
            Scanner myObj2 = new Scanner(System.in);
            double number = Double.parseDouble(myObj2.nextLine());
            descriptiveStatistics.addValue(number);
        }
        Stats statistics = new Stats(
                descriptiveStatistics.getMean(),
                descriptiveStatistics.getVariance(),
                descriptiveStatistics.getStandardDeviation()
        );
        return statistics;
    }
}
