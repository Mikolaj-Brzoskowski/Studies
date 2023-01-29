package components;
public class Product{

    public String productCode;
    public String name;
    public Double value;
    public Double discountValue;
    
    public Product(String name, Double value) {
        this.productCode = GenerateRandom();
        this.name = name;
        this.value = value;
        this.discountValue = value;
    }

    public static String GenerateRandom() {
        Long min = 10000000000L;
        Long max = 99999999999L;
        long generatedLong = min + (long) (Math.random() * (max - min));
        String code=String.valueOf(generatedLong);
        return code;
      }
}
