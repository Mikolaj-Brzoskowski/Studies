package Classes;


public class Product{
    private String productName;
    private double productMakingCost;
    public int productQuantity;

    public Product(String productName, double productMakingCost, int productQuantity){
        this.productName = productName;
        this.productMakingCost = productMakingCost;
        this.productQuantity = productQuantity;
    }

    public double getProductMakingCost() {
        return productMakingCost;
    }

    public void setProductMakingCost(double productMakingCost) {
        this.productMakingCost = productMakingCost;
    }

}
