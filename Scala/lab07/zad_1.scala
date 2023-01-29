val seq = Seq(1,2,1,1,5)
def indices[A](seq: Seq[A], el: A): Set[Int] = {
    return (seq.zipWithIndex.filter(_._1 == el).map(_._2).toSet)
}

println(indices(seq, 1))