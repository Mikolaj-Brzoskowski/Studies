package commands;
import components.Cart;

public class DiscountThreeForTwo implements Command{
    
    Cart cart;

    public DiscountThreeForTwo(Cart cart){
        this.cart = cart;
    }

    @Override
    public void execute() {
        cart.ThreeForTwo();
    }

    @Override
    public void undo() {
        cart.ClearDiscount();
    }
}