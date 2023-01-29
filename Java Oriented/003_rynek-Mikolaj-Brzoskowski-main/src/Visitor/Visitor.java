package Visitor;

import Classes.Buyers;
import Classes.Sellers;

public interface Visitor {
    public void visit(Sellers seller);
    public void visit(Buyers buyer);
}
