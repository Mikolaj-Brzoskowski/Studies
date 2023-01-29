import java.util.Arrays;

public class Stack {
    private int arrayElementsCount;
    public String[] elements;

    public Stack(int size) {
        elements = new String[size];
        arrayElementsCount = 0;
    }

    public void push(String element) {
        if (arrayElementsCount == elements.length) {
            int newSize = elements.length * 2;
            elements = Arrays.copyOf(elements, newSize);
        }
        elements[arrayElementsCount++] = element;
    }

    public boolean isEmpty() {
        return arrayElementsCount == 0;
    }

    public String pop() {
        if (this.isEmpty()) {
            throw new IllegalStateException("Stack is empty");
        }
        String result = elements[--arrayElementsCount];
        elements[arrayElementsCount] = null;
        return result;
    }

    public String peek() {
        if (this.isEmpty()) {
            throw new IllegalStateException("Stack is empty");
        }
        return elements[arrayElementsCount-1];
    }
    
}
