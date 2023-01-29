import scala.annotation.tailrec

def usun[A](l: List[A], el: A): List[A] =
{
    @tailrec def usunHelp[A](l: List[A], el: A, acc: List[A]): List[A] ={
        l match {
            case h :: t =>
                if (h == el) usunHelp(t, el, acc)
                else usunHelp(t, el, acc :+ h)
            case List() => acc
        }
    }
    usunHelp(l, el, List())
}

println(usun(List(1,2,3,4,5,6,1,2,3,4,5,6), 4))