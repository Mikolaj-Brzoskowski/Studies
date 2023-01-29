object Zad3 {

  def main(args: Array[String]): Unit = {
    val linie = io.Source
      .fromResource("ogniem-i-mieczem.txt")
      .getLines.toList

    val litery = linie
      .flatMap(_.toLowerCase())
      .filter(_.isLetter)
      .toSeq
      .groupBy(identity)
      .mapValues(_.size)
      .toList
      .sorted

    //println(litery)
    histogram(50, litery)
  }
  
  def histogram(maks: Int, lista: List[(Char, Int)]): Unit = {
    lista.foreach( x => {
      if (maks <= x._2) println( x._1 + ":" + ("*" * maks))
      else println(x._1 + ":" + ("*" * x._2))
    })
  }

}

// Zadanie 3. Korzystając z mechanizmów udostępnianych przez kolekcje oraz fragmentu powieści "Ogniem i mieczem" Henryka Sienkiewicza, skonstruuj "histogram" 
//pokazujący częstotliwość występowanie w tekście poszczególnych liter. Małe i wielkie litery traktuj jako identyczne. 
//Pomiń występujące w tekście znaki interpunkcyjne (kropki, przecinki, myślniki, cudzysłowy itp), a także znaki nie będące literami. 

 
// Rozwiązanie przedstaw w postaci funkcji 

// def histogram(max: Int): Unit 
 

// która przyjmuje argument max oznacza maksymalną szerokość histogramu (jeżeli liter jest więcej histogram nie powinien przekroczyć max). 
// Przykład: 


// a:*************************************** 
// ą:********** 
// b:***************** 
// c:************** 
// ć:******* 
// ... 
 