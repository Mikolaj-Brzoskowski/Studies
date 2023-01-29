import scala.io.Source

object Zad1 {

  def main(args: Array[String]): Unit = {
    val linie = Source.fromFile("E:/Mikolaj/Documents/Projekty/Scala/lab08/src/main/resources/liczby.txt").getLines.toList

    def Niemalejący(s: String): Boolean = {
      s.sliding(2).forall(x => if (x.length != 1) x(0) <= x(1) else true)
    }

    def NieparzystaSuma(s: String): Boolean = {
      s.foldLeft(0)((a: Int, b: Char) => a+b.asDigit)%2 == 1
    }

    println(linie.filter(s => Niemalejący(s) && NieparzystaSuma(s)))
    
  }

}