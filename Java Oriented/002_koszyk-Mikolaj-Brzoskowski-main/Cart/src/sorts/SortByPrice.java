package sorts;
import java.util.Comparator;

import components.Product;

public class SortByPrice implements Comparator<Product>{

    @Override
    public int compare(Product o1, Product o2) {
        if ((o1 != null && o2 != null) ) {
        return o2.discountValue.compareTo(o1.discountValue);
        }
        return 0;
    }
    
}
