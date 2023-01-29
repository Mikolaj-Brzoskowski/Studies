package Classes;

import Observers.Observer;
import Visitor.Visitable;
import Visitor.Visitor;

public class Buyers implements Observer, Visitable{
    private double currentInflation;
    private double probabilityOfBuying;
    private double money;
    private double productRealPrice;

    public Buyers(double money){
        this.money = money;
        this.probabilityOfBuying = 0.50;
    }

    @Override
    public void update(String event, double data) {
        switch(event){
            case "inflationChange":
                this.currentInflation = data;
                break;
            case "realPriceChange":
                this.productRealPrice = data;
                break;
        }
        
    }

    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }

    public void setProbability(double probabilityOfBuying) {
        this.probabilityOfBuying = probabilityOfBuying;
    }
}
