package pl.ug.mbrzoskowski.lab3_zad2.domain;

public class Person {

    private String id;

    private String first_name;

    private String last_name;

    private String email;

    private String company_name;

    public Person() {
    }

    public Person(String first_name, String last_name, String email, String company_name) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.company_name = company_name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCompany_name() {
        return company_name;
    }

    public void setCompany_name(String company_name) {
        this.company_name = company_name;
    }

    @Override
    public String toString() {
        return "Person{" +
                "first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", email='" + email + '\'' +
                ", company_name='" + company_name + '\'' +
                '}';
    }

}
