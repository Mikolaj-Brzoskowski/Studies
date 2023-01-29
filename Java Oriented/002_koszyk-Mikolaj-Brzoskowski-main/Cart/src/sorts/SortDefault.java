package sorts;
import java.util.Comparator;

import components.Product;

public class SortDefault implements Comparator<Product>{

    @Override
    public int compare(Product o1, Product o2) {
        if ((o1 != null && o2 != null) ) {
        int i = o2.discountValue.compareTo(o1.discountValue);
        if (i != 0) return i;

        return o1.name.compareTo(o2.name);
        }
        return 0;
    }
    
}
