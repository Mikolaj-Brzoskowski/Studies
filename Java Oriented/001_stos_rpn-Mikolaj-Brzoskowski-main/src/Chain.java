public interface Chain {
    
    public void setNextChain(Chain setNextChain);

    public float calculate(float firstNumber, float secondNumber, String operation);
}
