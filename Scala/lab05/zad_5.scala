import scala.annotation.tailrec

@tailrec def compute[A, B](l: List[A], init: B)(op: (A, B) => B): B =
  {
    l match
    {
      case head::tail => compute(tail, op(head,init))(op)
      case List() => init
    }
  }

  println(compute(List(1, 2, 3, 4), 0)(_ + _))
  println(compute(List(1, 2, 3, 4), 1)(_ * _))
  println(compute(List("kota", " ", "ma", " ", "Ala"), "")(_ + _))