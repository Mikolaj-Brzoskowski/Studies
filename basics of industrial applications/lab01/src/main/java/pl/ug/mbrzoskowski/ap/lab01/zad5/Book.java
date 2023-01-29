package pl.ug.mbrzoskowski.ap.lab01.zad5;

public class Book {

    public String name;
    public double price;
    public Author author;
    public int qty;

    public Book(String name, double price, Author author, int qty){
        this.name = name;
        this.price = price;
        this.author = author;
        this.qty = qty;
    }

    public String getName() {
        return name;
    }

    public Author getAuthor() {
        return author;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    @Override
    public String toString() {
        return "Book{" +
                "name='" + name + '\'' +
                ", price=" + price +
                ", author=" + author +
                ", qty=" + qty +
                '}';
    }

    public static void main(String[] args) {
        Author JKR = new Author("J.K.Rowling", "kowalski@o2.pl", GenderEnum.Gender.FEMALE);
        Book HP = new Book("Harry Potter", 4.59, JKR, 13);
        System.out.println(HP.getAuthor());
        System.out.println(HP.getName());
        System.out.println(HP.getQty());
        System.out.println(HP.getPrice());


    }
}
