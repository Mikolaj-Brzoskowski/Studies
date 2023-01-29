import scala.annotation.tailrec

def sumuj(l: List[Option[Double]]): Option[Double] =
{
    @tailrec def sumHelper(l: List[Option[Double]], acc: Option[Double]): Option[Double] = 
    {
        l match {
            case h :: t =>
                if(h.getOrElse(0.0) > 0)
                    sumHelper(t, Option(acc.getOrElse(0.0) + h.getOrElse(0.0)))
                else
                    sumHelper(t, acc)
            case _ => acc
        }
    }
    sumHelper(l, None)
}

println(sumuj(List(Some(2.0), Some(4.0), Some(-3.0), None, Some(-3.0), None, Some(1.0))))