package Classes;

import Observers.Manager;
import Observers.Observer;
import Visitor.Visitable;
import Visitor.Visitor;

public class Sellers implements Observer, Visitable{
    public double currentInflation;
    public double profit;
    public Product product;
    private double money;
    public double productRealPrice;
    public Manager events;
    public int soldInTurn;

    public Sellers(double profit, Product product) {
        this.profit = profit;
        this.product = product;
        this.money = 0;
        this.productRealPrice = ((product.getProductMakingCost() + profit) * currentInflation);
        this.events = new Manager("realPriceChange", "bankMonitoring");
        this.soldInTurn = 0;
    }

    public double getCost() {
        return ((product.getProductMakingCost() + profit) * currentInflation);
    }

    public double getProfit() {
        return profit;
    }

    public void sellProduct() {
        product.productQuantity =- 1;
    }

    @Override
    public void update(String event, double inflation) {
        if (event == "inflationChange"){
            this.currentInflation = inflation;
        }  
    }

    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
    
}
