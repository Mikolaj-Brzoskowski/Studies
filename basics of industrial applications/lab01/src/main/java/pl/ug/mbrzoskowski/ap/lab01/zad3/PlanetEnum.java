package pl.ug.mbrzoskowski.ap.lab01.zad3;

public class PlanetEnum {
    public enum Planet{
        ZIEMIA (1),
        MERKURY (0.2408467),
        WENUS (0.61519726),
        MARS (1.8808158),
        JOWISZ (11.862615),
        SATURN (29.447498),
        URAN (84.016846),
        NEPTUN (164.79132);
        private final double years;
        Planet(double years) {
            this.years = years;
        }
        static double planet_calculator(Planet planet, long human_seconds) {
            double human_years = 0;
            double one_year_to_seconds = planet.years * 365.25 * 24 * 60 * 60;
            human_years = human_seconds / one_year_to_seconds;
            return Math.round(human_years * 100.0) / 100.0;
        }
    }
}
