val seq = Seq("a","b","a","c","a")
def freq[A](seq: Seq[A]): Set[(A, Int)] = {
    seq.groupBy(identity).view.mapValues(_.size).toSet
}

println(freq(seq))