package Visitor;

import java.text.DecimalFormat;

import Classes.Buyers;
import Classes.Product;
import Classes.Sellers;

public class DataVisitor implements Visitor {

    public DataVisitor(){}

    @Override
    public void visit(Sellers seller) {
        seller.productRealPrice = ((seller.product.getProductMakingCost() + seller.profit) * seller.currentInflation);
        seller.events.notifyObservers("realPriceChange", seller.productRealPrice);
        seller.events.notifyObservers("bankMonitoring", seller.soldInTurn);
    }

    @Override
    public void visit(Buyers buyer) {
        
    }
    
}
