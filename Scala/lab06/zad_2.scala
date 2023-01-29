def deStutter[A](seq: Seq[A]): Seq[A] =
    {
        seq.foldLeft(Seq(seq(0)))((acc:Seq[A], n:A) => if(acc.last != n) acc :+ n else acc)
    }

println(deStutter(Seq(1,1,2,4,4,4,1,3)))