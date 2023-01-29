val code = Seq(1,3,2,2,4,5,3,2) // 1,2,2,3,3,4,5
val move = Seq(2,1,2,4,2,3,2,3) // 1,2,2,3,3,4

def score(code: Seq[Int])(move: Seq[Int]): (Int, Int) = {
    val teSame = code.zip(move).filter(x => x._1 == x._2).size
    val (inneTab, inne2Tab) = code.zip(move).filter(x => x._1 != x._2).unzip
    val inne = code.sorted.zip(inne2Tab.sorted).filter(x => x._1 == x._2).size - teSame
    return(teSame, inne)
}

println(score(code)(move))