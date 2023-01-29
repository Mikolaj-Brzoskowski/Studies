val seq = Seq(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
def deleteKty[A](seq: Seq[A], k: Int): Seq[A] = {
    seq.zipWithIndex.filter(x => (x._2 + 1) % k != 0).map(l => l._1)
};

println(deleteKty(seq, 3));