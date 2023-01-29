import scala.annotation.tailrec

@tailrec def divide[A](l: List[A], acc1: List[A] = List(), acc2: List[A] = List(), idx_type: String = "even"): (List[A], List[A]) = {
    l match{
        case h :: t =>
            if (idx_type == "even") divide(t, acc1 :+ h, acc2, "odd")
            else divide(t, acc1, acc2 :+ h, "even")
        case _ => return (acc1, acc2)
    }
}

println(divide(List(1, 3, 5, 6, 7)))