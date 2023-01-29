import Classes.Buyers;
import Classes.Product;
import Classes.Sellers;
import Visitor.DataVisitor;
import Visitor.Visitable;

public class Market {
    public static void main(String[] args) {
        DataVisitor dataVisitor = new DataVisitor();
        Sellers kartofle_seller = new Sellers(1.25, new Product("Ziemniaki", 0.99, 1000));
        Buyers kartofle_buyers = new Buyers(1000.00);
        int turns = 100;


        for (int i = 0; i < turns; i++) {
    
            dataVisitor.visit(kartofle_seller);
            dataVisitor.visit(kartofle_buyers);
        }
    }

}