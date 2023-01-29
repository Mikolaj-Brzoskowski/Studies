package sorts;
import java.util.Comparator;

import components.Product;

public class SortByName implements Comparator<Product>{

    @Override
    public int compare(Product o1, Product o2) {
        if ((o1 != null && o2 != null) ) {
        return o1.name.compareTo(o2.name);
        }
        return 0;
    }
    
}
