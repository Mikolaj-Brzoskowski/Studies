import scala.annotation.tailrec

@tailrec def tasuj(l1: List[Int], l2: List[Int], acc: List[Int] = List() ): List[Int] = {
    (l1, l2) match {
        case (h1 :: t1, h2 :: t2) => 
            if (h1 < h2) {
                if (acc.isEmpty || h1 != acc.last) tasuj(t1, l2, acc :+ h1)
                else tasuj(t1, l2, acc)
            }
            else if (h2 < h1) {
                if (acc.isEmpty || h2 != acc.last ) tasuj(l1, t2, acc :+ h2)
                else tasuj(l1, t2, acc)
            }
            else {
                if (acc.isEmpty || h1 != acc.last ) tasuj(t1, t2, acc :+ h1)
                else tasuj(t1, t2, acc)
            }
        case (h1 :: t1, _) => 
            if (acc.isEmpty || h1 != acc.last) tasuj(t1, l2, acc :+ h1)
            else tasuj(t1,l2, acc)
        case (_, h2 :: t2) => 
            if (acc.isEmpty || h2 != acc.last) tasuj(l1, t2, acc :+ h2)
            else tasuj(l1, t2, acc)
        case (_,_) => return acc
    };
};

println(tasuj(List(2, 4, 3, 5), List(1, 2, 2, 3, 3, 1, 5)));