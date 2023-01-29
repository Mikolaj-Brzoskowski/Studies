import scala.annotation.tailrec

@tailrec def maks(l1: List[Double], l2: List[Double], acc: List[Double] = List(), n: Int = 0): List[Double] = {
     (l1, l2) match{
        case (l1,l2) if (l1.length > n && l2.length > n ) => maks(l1, l2, acc:+((l1(n)).max(l2(n))), n+1)
        case (l1,l2) if (l1.length > n && l2.length <= n ) => maks(l1, l2, acc:+l1(n), n+1)
        case (l1,l2) if (l1.length <= n && l2.length > n ) => maks(l1, l2, acc:+l2(n), n+1)
        case (l1,l2) if (l1.length <= n && l2.length <= n) => return acc
        case (_, _) => return acc 
     }  
}

println(maks(List(2.0, -1.6, 3.2, 5.4, -8.4), List(3.3, -3.1, 3.2, -4.1, -0.4, 5.5)))