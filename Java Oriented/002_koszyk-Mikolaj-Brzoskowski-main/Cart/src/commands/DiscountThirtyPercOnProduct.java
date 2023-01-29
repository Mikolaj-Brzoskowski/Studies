package commands;
import components.Cart;
import components.Product;

public class DiscountThirtyPercOnProduct  implements Command{

    Cart cart;
    Product product;

    public DiscountThirtyPercOnProduct(Cart cart, Product product) {
        this.cart = cart;
        this.product = product;
    }

    @Override
    public void execute() {
        cart.ThirtyPercOnProduct(product);
    }

    @Override
    public void undo() {
        cart.ClearDiscount();
        
    }
    
}
