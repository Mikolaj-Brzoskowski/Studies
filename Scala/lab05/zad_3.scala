
def insertInto[A](l: List[A], el: A)(leq: (A, A) => Boolean): List[A] = {
    def insertHelper(l: List[A], acc: List[A] = List()): List[A] = {
        l match {
            case h :: t => {
                if (leq(el, h)) return (acc :+ el) ::: l
                else insertHelper(t, acc :+ h)
            }
            case List() => {
                return acc :+ el
            }
        }
    }
    insertHelper(l)
}

println(insertInto(List(1,2,4,6),3)(_ < _))

//List(1, 2, 3, 4, 6)