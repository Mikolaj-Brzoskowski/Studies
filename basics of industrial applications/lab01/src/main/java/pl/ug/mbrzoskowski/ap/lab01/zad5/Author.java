package pl.ug.mbrzoskowski.ap.lab01.zad5;

public class Author {
    private String name;
    private String email;
    private GenderEnum.Gender gender;

    public Author(String name, String email, GenderEnum.Gender gender) {
        this.name = name;
        this.email = email;
        this.gender = gender;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public GenderEnum.Gender getGender() {
        return this.gender;
    }

    @Override
    public String toString() {
        return (new StringBuilder()).append("Author[name=").append(name).append(",email=").append(email).append(",gender=").append(gender + "]").toString();
    }

    public static void main(String[] args) {
        Author janek = new Author("Jan", "kowalski@o2.pl", GenderEnum.Gender.MALE);
        System.out.println(janek.getName());
        System.out.println(janek.getGender());
        System.out.println(janek.toString());
    }

}
