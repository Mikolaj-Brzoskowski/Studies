package pl.ug.mbrzoskowski.lab2;

public class Stats {

    public double mean;
    public double variance;
    public double deviation;
    public Stats(double mean, double variance, double deviation){
        this.mean = mean;
        this.variance = variance;
        this.deviation = deviation;
    }
    public double getMean() {
        return mean;
    }

    public void setMean(double mean) {
        this.mean = mean;
    }

    public double getVariance() {
        return variance;
    }

    public void setVariance(double variance) {
        this.variance = variance;
    }

    public double getDeviation() {
        return deviation;
    }

    public void setDeviation(double deviation) {
        this.deviation = deviation;
    }

}
