import scala.annotation.tailrec

@tailrec def reverseTailrec(s: String, acc: String = ""): String = {
    if (s.isEmpty) return acc
    else reverseTailrec(s.tail, s.head + acc)
}

println(reverseTailrec("Alamakota"))


 