package pl.ug.mbrzoskowski.lab2;

public class Main {
    public static void main(String[] args) {
        Compute compute = new Compute();
        Stats statistics = compute.getStatistics();
        System.out.println(statistics.getMean());
        System.out.println(statistics.getVariance());
        System.out.println(statistics.getDeviation());
    }
}