import org.junit.Test;
import org.junit.Before;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;


public class StackTest {
    
    private Stack stack;

    @Before
    public void setUp() {
        stack = new Stack(10);
    }

    @Test
    public void checkStackCreations() {
        assertNotEquals("Stack null", null, stack);
    }

    @Test
    public void checkPushAndPeek() {
        stack.push("5");
        String peeked = stack.peek();
        assertEquals("5", peeked);
    }

    @Test
    public void checkPushMultipleAndPeek() {
        stack.push("5");
        stack.push("7");
        stack.push("9");
        String peeked = stack.peek();
        assertEquals("9", peeked);
    }

    @Test
    public void checkPop(){
        stack.push("5");
        stack.push("1");
        stack.push("3");
        stack.pop();
        String peeked = stack.peek();
        assertEquals("1", peeked);
    }

    @Test
    public void checkPopReturn(){
        stack.push("5");
        stack.push("2");
        stack.push("7");
        String peeked = stack.pop();
        assertEquals("7", peeked);
    }

    @Test(expected = IllegalStateException.class)
    public void checkPopEmptiness() {
        stack.pop();
    }

    @Test(expected = IllegalStateException.class)
    public void checkPeekEmptiness() {
        stack.peek();
    }

    @Test
    public void checkEmptiness() {
        assertEquals(true, stack.isEmpty());
    }

    @Test
    public void checkEmptiness2() {
        stack.push("10");
        assertEquals(false, stack.isEmpty());
    }

    @Test
    public void checkPeekTwoTimes() {
        stack.push("5");
        stack.push("2");
        stack.push("7");
        stack.peek();
        String peeked = stack.peek();
        assertEquals("7", peeked);
    }

}