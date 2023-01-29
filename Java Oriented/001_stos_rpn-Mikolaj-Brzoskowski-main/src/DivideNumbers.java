public class DivideNumbers implements Chain{

        private Chain nextInChain;
    
        @Override
        public void setNextChain(Chain setNextChain) {
            this.nextInChain = setNextChain;
        }
    
        @Override
        public float calculate(float firstNumber, float secondNumber, String operation) {
            if (operation.equals("/")) {
                return (secondNumber / firstNumber);
            }
            else {
                throw new IllegalArgumentException("Not allowed character: " + operation + " in equation");
            }
        }
    
}
