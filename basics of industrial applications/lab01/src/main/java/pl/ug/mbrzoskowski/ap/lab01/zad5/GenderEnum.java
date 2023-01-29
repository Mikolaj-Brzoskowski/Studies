package pl.ug.mbrzoskowski.ap.lab01.zad5;

public class GenderEnum {
    public enum Gender {
        NOT_KNOWN("Not known"),
        MALE("Male"),
        FEMALE("Female"),
        NOT_APPLICABLE("Not applicable");
        private final String key;
        Gender(String key) {
            this.key = key;
        }
    }
}
