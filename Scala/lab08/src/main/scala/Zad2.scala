object Zad2 {

  def main(args: Array[String]): Unit = {
    val linie = io.Source.fromFile("E:/Mikolaj/Documents/Projekty/Scala/lab08/src/main/resources/nazwiska.txt").getLines.toList
    var goscie = 
        linie
          .map(line => line.split(" "))
          .map(x => (x(0), x(1) ) )
          .groupBy(x => x._1.distinct.length)
          .maxBy(x => x._1)
          ._2
          .groupBy(x => x._2.length)
          .minBy(x => x._1)
          ._2

    println(goscie)
  }
}


//Korzystając z mechanizmów udostępnianych przez kolekcje oraz danych z pliku nazwiska.txt, spośród osób, których imiona składają się
// z maksymalnie dużej liczby różnych liter wyszukaj te, których nazwiska mają minimalną długość. 
