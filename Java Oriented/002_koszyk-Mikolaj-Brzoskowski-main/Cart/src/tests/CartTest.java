package tests;
import org.junit.Test;

import commands.DiscountFivePerc;
import commands.DiscountFreeCup;
import commands.DiscountThirtyPercOnProduct;
import commands.DiscountThreeForTwo;
import components.Cart;
import components.Invoker;
import components.Product;
import sorts.SortByName;
import sorts.SortByPrice;
import sorts.SortDefault;

import org.junit.Before;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import java.util.Arrays;

public class CartTest {
    
    private Cart basket;
    private Product baton = new Product("Baton", 3.49);
    private Product piwo = new Product("Piwo", 3.49);
    private Product zegarek = new Product("Zegarek", 189.29);
    private Product kosiarka = new Product("Kosiarka", 249.99);

    @Before
    public void setUp() {
        basket = new Cart(10);
        basket.push(piwo);
        basket.push(baton);
        basket.push(zegarek);
        basket.push(kosiarka);
    }

    @Test
    public void checkAddItem() {
        basket.push(new Product("Monitor", 1199.00));
        assertEquals(5, basket.arrayElementsCount);
    }

    @Test
    public void checkRemoveItem() {
        Product PC = new Product("PC", 2499.00);
        Product laptop = new Product("Laptop", 3499.00);
        basket.push(PC);
        basket.push(laptop);
        basket.deleteItem(PC);
        assertEquals(5, basket.arrayElementsCount);
    }

    @Test
    public void checkCartCreation() {
        assertNotEquals("Stack null", null, basket);
    }

    @Test
    public void checkEmptyCart() {
        Cart cart2 = new Cart(10);
        assertEquals(true, cart2.isEmpty());
    }

    @Test
    public void checkApplyDiscount5Perc() {
        DiscountFivePerc d5p = new DiscountFivePerc(basket);
        Invoker invoker = new Invoker(d5p);
        invoker.applyDiscount();
        assertEquals(Double.valueOf(423.96), basket.getDiscountedValueSum());
    }

    @Test
    public void checkApply3For2() {
        DiscountThreeForTwo threefortwo = new DiscountThreeForTwo(basket);
        Invoker invoker = new Invoker(threefortwo);
        invoker.applyDiscount();
        assertEquals(Double.valueOf(442.77), basket.getDiscountedValueSum());
    }

    @Test
    public void checkApplyDiscountFreeCup() {
        DiscountFreeCup threefortwo = new DiscountFreeCup(basket);
        Invoker invoker = new Invoker(threefortwo);
        invoker.applyDiscount();
        assertEquals(5, basket.arrayElementsCount);
        assertEquals(Double.valueOf(446.26), basket.getDiscountedValueSum());
    }

    @Test
    public void checkApplyDiscount30PercOnClock() {
        DiscountThirtyPercOnProduct thirty = new DiscountThirtyPercOnProduct(basket, zegarek);
        Invoker invoker = new Invoker(thirty);
        invoker.applyDiscount();
        assertEquals(Double.valueOf(389.47), basket.getDiscountedValueSum());
    }

    @Test
    public void checkSortDefault() {
        Product[] array1 = {baton, piwo, zegarek, kosiarka};
        Product[] array2 = {kosiarka, zegarek, baton, piwo};
        Arrays.sort(array1, new SortDefault());
        assertArrayEquals(array1, array2);
    }

    @Test
    public void checkSortPrice() {
        Product[] array1 = {piwo, baton, zegarek, kosiarka};
        Product[] array2 =  {kosiarka, zegarek, piwo, baton};
        Arrays.sort(array1, new SortByPrice());
        assertArrayEquals(array1, array2);
    }

    @Test
    public void checkSortName() {
        Product[] array1 = {baton, piwo, zegarek, kosiarka};
        Product[] array2 = {baton, kosiarka, piwo, zegarek};
        Arrays.sort(array1, new SortByName());
        assertArrayEquals(array1, array2);
    }

    @Test
    public void checkClearDiscount30PercOnClock() {
        DiscountThirtyPercOnProduct thirty = new DiscountThirtyPercOnProduct(basket, zegarek);
        Invoker invoker = new Invoker(thirty);
        invoker.applyDiscount();
        invoker.clearDiscount();
        assertEquals(Double.valueOf(446.26), basket.getDiscountedValueSum());
    }

    @Test
    public void checkClearDiscountFreeCup() {
        DiscountFreeCup threefortwo = new DiscountFreeCup(basket);
        Invoker invoker = new Invoker(threefortwo);
        invoker.applyDiscount();
        invoker.clearDiscount();
        assertEquals(4, basket.arrayElementsCount);
        assertEquals(Double.valueOf(446.26), basket.getDiscountedValueSum());
    }

    @Test
    public void checkClearDiscount5Perc() {
        DiscountFivePerc d5p = new DiscountFivePerc(basket);
        Invoker invoker = new Invoker(d5p);
        invoker.applyDiscount();
        invoker.clearDiscount();
        assertEquals(Double.valueOf(446.26), basket.getDiscountedValueSum());
    }

    @Test
    public void checkClear3For2() {
        DiscountThreeForTwo threefortwo = new DiscountThreeForTwo(basket);
        Invoker invoker = new Invoker(threefortwo);
        invoker.applyDiscount();
        invoker.clearDiscount();
        assertEquals(Double.valueOf(446.26), basket.getDiscountedValueSum());
    }

    @Test
    public void checkGetExpensiveProducts() {
        Product PC = new Product("PC", 2499.00);
        Product laptop = new Product("Laptop", 3499.00);
        basket.push(PC);
        basket.push(laptop);
        Product[] array1 = {laptop, PC, kosiarka};
        Cart result = basket.getExpensiveProducts(3);
        assertArrayEquals(result.cart, array1);
    }
    
    @Test
    public void checkGetCheapestProducts() {
        Product PC = new Product("PC", 2499.00);
        Product laptop = new Product("Laptop", 3499.00);
        basket.push(PC);
        basket.push(laptop);
        Product[] array1 = {baton,piwo};
        Cart result = basket.getCheapestProducts(2);
        assertArrayEquals(result.cart, array1);
    }

}
