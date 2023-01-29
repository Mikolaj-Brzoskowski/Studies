package tests;

import components.Cart;
import components.Product;

public class MainApp {

    public static Cart basket;
    public static Product baton = new Product("Baton", 3.49);
    public static Product piwo = new Product("Piwo", 3.49);
    public static Product zegarek = new Product("Zegarek", 189.29);
    public static Product kosiarka = new Product("Kosiarka", 249.99);
    
    public static void main(String[] args) {
        basket = new Cart(10);
        basket.push(piwo);
        basket.push(baton);
        basket.push(zegarek);
        basket.push(kosiarka);
    }
}
