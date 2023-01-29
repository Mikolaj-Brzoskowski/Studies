val seq = Seq(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
def subseq[A](seq: Seq[A], bIdx: Int, eIdx: Int): Seq[A] =
  {
    seq.take(eIdx+1).drop(bIdx)
  }
println(subseq(seq, 3, 7))