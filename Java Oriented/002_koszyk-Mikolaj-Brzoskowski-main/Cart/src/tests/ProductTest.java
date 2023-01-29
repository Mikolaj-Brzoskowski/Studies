package tests;
import org.junit.Test;

import components.Product;

import org.junit.Before;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

public class ProductTest {
    
    private Product product;

    @Before
    public void setUp() {
        this.product = new Product("Baton", 1.59);
    }

    @Test
    public void checkProductCreation() {
        assertNotEquals("Stack null", null, product);
    }

    @Test
    public void checkName() {
        assertEquals("Baton", product.name);
    }

    @Test
    public void checkGetValue() {
        assertEquals(Double.valueOf(1.59), product.value);
    }

    @Test
    public void checkGetDiscountedValue() {
        assertEquals(Double.valueOf(1.59), product.discountValue);
    }

}
