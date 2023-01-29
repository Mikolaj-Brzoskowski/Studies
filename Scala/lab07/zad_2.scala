val seq2 = Seq(1,2,3,4,5)
def swap[A](seq: Seq[A]): Seq[A] = {
return (seq.grouped(2).map(el => el.reverse).flatten.toSeq)
}

println(swap(seq2))