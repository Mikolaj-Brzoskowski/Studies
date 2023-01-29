package commands;

import components.Cart;

public class DiscountFivePerc implements Command{
    Cart cart;

    public DiscountFivePerc(Cart cart){
        this.cart = cart;
    }

    @Override
    public void execute() {
        cart.FivePerc();
    }

    @Override
    public void undo() {
        cart.ClearDiscount();
        
    }

}
