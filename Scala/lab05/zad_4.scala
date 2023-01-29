import scala.annotation.tailrec

def compress[A](l: List[A]): List[(A, Int)] = {
     @tailrec def compressHelper(l: List[A], acc: List[(A, Int)] = List(), acc2: Int = 1): List[(A, Int)] = {
        l match {
            case h :: List() => {
                return compressHelper(List(), acc :+ (h, acc2), 0)
            }
            case h :: t => {
                if (h == t(0)) compressHelper(t, acc, acc2 + 1)
                else compressHelper(t, acc :+ (h, acc2), 1)
            }
            case List() => {
               return acc
            }
        }
    }
    compressHelper(l)
} 


println(compress(List('a', 'a', 'b', 'c', 'c', 'c', 'a', 'a', 'b', 'd')))