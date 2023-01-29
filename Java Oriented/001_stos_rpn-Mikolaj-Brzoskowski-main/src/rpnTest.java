import org.junit.Test;
import org.junit.Before;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

public class rpnTest {
    
    private Rpn rpn;
    private Stack stack;

    @Before
    public void setUp() {
        stack = new Stack(10);
        rpn = new Rpn(stack);
    }

    @Test
    public void checkStackCreations() {
        assertNotEquals("Stack null", null, stack);
    }

    @Test
    public void checkSingleDigit() {
        String result = rpn.Calculate("1");
        assertEquals("1", result);
    }

    @Test(expected = IllegalArgumentException.class)
    public void checkOnlyOperator() {
        rpn.Calculate("+");
    }

    @Test(expected = IllegalArgumentException.class)
    public void checkNotEnoughNumvers() {
        rpn.Calculate("4 *");
    }

    @Test
    public void checkExpression() {
        String result = rpn.Calculate("2 7 + 3 / 14 3 - 4 * + 2 /");
        assertEquals("23.5", result);
    }
    
    @Test
    public void addingTest() {
        String result = rpn.Calculate("12 3 +");
        assertEquals("15.0", result);
    }

    @Test
    public void substractingTest() {
        String result = rpn.Calculate("3 4 -");
        assertEquals("-1.0", result);
    }

    @Test
    public void multiplyTest() {
        String result = rpn.Calculate("10 5 *");
        assertEquals("50.0", result);
    }

    @Test
    public void divideTest() {
        String result = rpn.Calculate("12 5 /");
        assertEquals("2.4", result);
    }

    @Test(expected = IllegalArgumentException.class)
    public void checkTooMuchNumbers() {
        rpn.Calculate("4 3 5 6 +");
    }

    @Test(expected = IllegalArgumentException.class)
    public void checkTooMuchOperations() {
        rpn.Calculate("4 3 * +");
    }

}
