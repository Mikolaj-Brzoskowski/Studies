package components;
import java.util.Arrays;

import sorts.SortByPrice;
import sorts.SortDefault;

public class Cart implements DiscountsInterface{

    public int arrayElementsCount;
    public Product[] cart;
    int size;

    public Cart(int size) {
        cart = new Product[size];
        arrayElementsCount = 0;
    }

    public void push(Product product) {
        if (arrayElementsCount == cart.length) {
            int newSize = cart.length * 2;
            cart = Arrays.copyOf(cart, newSize);
        }
        for (int i = 0; i < cart.length; i++) {
            if ( cart[i] == null ) {
                cart[i] = product;
                arrayElementsCount++;
                break;
            }
        }
        Arrays.sort(cart, new SortDefault());
    }

    public void deleteItem(Product product) {
        if (this.isEmpty()) {
            throw new IllegalStateException("Stack is empty");
        }
        for (int i = 0; i < cart.length; i++) {
            if ( cart[i] == product ) {
                cart[i] = null;
                arrayElementsCount--;
                break;
            }
        }
        Arrays.sort(cart, new SortDefault());
    }

    public boolean isEmpty() {
        return arrayElementsCount == 0;
    }

    public Double getValueSum() {
        Double valueSum = 0.00;
        for (Product p : cart) {
            if ( p != null ) {
                Double productValue = p.value;
                valueSum += productValue;
            }
        }
        Double result = (int)(Math.round(valueSum * 100))/100.0;
        return result;
    }

    public Double getDiscountedValueSum() {
        Double valueSum = 0.00;
        for (Product p : cart) {
            if ( p != null ) {
            Double productValue = p.discountValue;
            valueSum += productValue;
            }
        }
        Double result = (int)(Math.round(valueSum * 100))/100.0;
        return result;
    }

    public Cart getExpensiveProducts(int n) {
        Arrays.sort(cart, new SortByPrice());
        int counter = 0;
        Cart result = new Cart(n);
        for (Product p : cart) {
            if ( p != null && counter < n) {
                result.push(p);
                counter++;
            }
        }
        Arrays.sort(cart, new SortDefault());
        return result;
    }

    public Cart getCheapestProducts(int n) {
        Arrays.sort(cart, new SortByPrice());
        int counter = 0;
        Cart result = new Cart(n);
        for (Product p : cart) {
            if ( p != null ) {
                counter++;
                if (counter > arrayElementsCount - n) {
                    result.push(p);
                }
            }
        }
        Arrays.sort(cart, new SortDefault());
        return result;
    }
    

    @Override
    public void FivePerc() {
        if ( getValueSum() > 300.00 ) {
            for (Product p : cart) {
                if ( p != null ) {
                Double number1 = 0.95 * p.value;
                Double number2 = (int)(Math.round(number1 * 100))/100.0;
                p.discountValue = number2;
                System.out.println("5% discount applied to cart");
                }
            }
        }
    }

    @Override
    public void ThreeForTwo() {
        if (cart.length > 2) {
            Arrays.sort(cart, new SortByPrice());
            cart[arrayElementsCount - 1].discountValue = 0.00;
            Arrays.sort(cart, new SortDefault());
            System.out.println("Cheapest item for free applied");
        }
    }

    @Override
    public void FreeCup() {
        if ( getValueSum() > 200.00 ) {
            this.push(new Product("Kubek Javamarkt", 0.00));
            System.out.println("Free cup added to cart");
        }
    }

    @Override
    public void ThirtyPercOnProduct(Product product) {
        for (Product p : cart) {
            if ( p != null && p.name == product.name ) {
                    Double number1 = 0.70 * p.value;
                    Double number2 = (int)(Math.round(number1 * 100))/100.0;
                    p.discountValue = number2;
                    System.out.println("30% discount on" + product.name + "applied");
            }
        }
        
    }

    @Override
    public void ClearDiscount() {
        Arrays.sort(cart, new SortByPrice());
        for (Product p : cart) {
            if ( p != null){
                p.discountValue = p.value;
                if (p.discountValue == 0.00){
                    this.deleteItem(p);
                }
            }
        }
    }

    
}