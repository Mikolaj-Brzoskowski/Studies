public class Rpn {

    private Stack stack;

    Chain chainCalc1 = new AddNumbers();
    Chain chainCalc2 = new SubstractNumbers();
    Chain chainCalc3 = new MultiplyNumbers();
    Chain chainCalc4 = new DivideNumbers();

    public Rpn(Stack stack) {
        this.stack = stack;
        chainCalc1.setNextChain(chainCalc2);
        chainCalc2.setNextChain(chainCalc3);
        chainCalc3.setNextChain(chainCalc4);
    }

    public String Calculate(String equation) {
        String[] splittedEquation = equation.split(" ");
        if (checkEquationCorrectness(splittedEquation)){
            for (String character : splittedEquation) {
                if (isNumber(character)) {
                    stack.push(character);
                }
                else if (isOperation(character) && stack.elements[1] != null) {
                    float firstNumber = Float.parseFloat(stack.pop());
                    float secondNumber = Float.parseFloat(stack.pop());
                    String operation = character;
                    String result = String.valueOf(chainCalc1.calculate(firstNumber, secondNumber, operation));
                    stack.push(result);
                }
                else{
                    throw new IllegalArgumentException("Not allowed character: " + character + " in equation");
                }
            }
        }
        else{
            throw new IllegalArgumentException("Illegall equation");
        }
        return returnResult(stack);
    }

    public boolean checkEquationCorrectness(String[] arr){
        if (arr.length >= 3){
            return true;
        }
        else if (arr.length == 1){
            return isNumber(arr[0]);
        }
        else {
            return false;
        }
    }

    public String returnResult(Stack stack){
        if (stack.elements[1] == null){
            return stack.pop();
        }
        else{
            throw new IllegalArgumentException("Illegall equation");
        }
    }

    public boolean isNumber(String character) {
        try {
            Integer.parseInt(character);
            return true;
        }
        catch(NumberFormatException ex){
            return false;
        }
    }
    
    public boolean isOperation(String character) {
        return character.equals("+") || character.equals("-") 
        || character.equals("*") || character.equals("/");
    }



}
