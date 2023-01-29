package commands;

import components.Cart;

public class DiscountFreeCup  implements Command{

    Cart cart;

    public DiscountFreeCup(Cart cart) {
        this.cart = cart;
    }

    @Override
    public void execute() {
        cart.FreeCup();
    }

    @Override
    public void undo() {
        cart.ClearDiscount();
    }
    
}
