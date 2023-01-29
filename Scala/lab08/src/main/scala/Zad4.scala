object Zad4 {

  case class Województwo(nazwa: String, min: Int)
  // max ID gminy z województwa w: w.min + 19999
  case class Wynik(
    ID: Int,
    KOALICJA_OBYWATELSKA: Int,
    LEWICA_RAZEM: Int,
    POLEXIT: Int,
    JEDNOŚĆ_NARODU: Int,
    PIS: Int,
    EUROPA_CHRISTI: Int,
    WIOSNA: Int,
    KONFEDERACJA: Int,
    KUKIZ15: Int,
    POLSKA_FAIR_PLAY: Int
  )

  def main(args: Array[String]): Unit = {
    val województwa = List(
      Województwo("dolnośląskie",20000),
      Województwo("kujawsko-pomorskie",40000),
      Województwo("lubelskie",60000),
      Województwo("lubuskie",80000),
      Województwo("łódzkie",100000),
      Województwo("małopolskie",120000),
      Województwo("mazowieckie",140000),
      Województwo("opolskie",160000),
      Województwo("podkarpackie",180000),
      Województwo("podlaskie",200000),
      Województwo("pomorskie",220000),
      Województwo("śląskie",240000),
      Województwo("świętokrzyskie",260000),
      Województwo("warmińsko-mazurskie",280000),
      Województwo("wielkopolskie",300000),
      Województwo("zachodniopomorskie",320000)
    )

    def sumList(first: Wynik, second: Wynik): Wynik = {
      Wynik(first.ID,
      first.KOALICJA_OBYWATELSKA + second.KOALICJA_OBYWATELSKA,
      first.LEWICA_RAZEM + second.LEWICA_RAZEM,
      first.POLEXIT + second.POLEXIT,
      first.JEDNOŚĆ_NARODU + second.JEDNOŚĆ_NARODU,
      first.PIS + second.PIS,
      first.EUROPA_CHRISTI + second.EUROPA_CHRISTI,
      first.WIOSNA + second.WIOSNA,
      first.KONFEDERACJA + second.KONFEDERACJA,
      first.KUKIZ15 + second.KUKIZ15,
      first.POLSKA_FAIR_PLAY + second.POLSKA_FAIR_PLAY)
    }

    def sumClass(suma: Wynik): Int = {
      suma.KOALICJA_OBYWATELSKA + 
      suma.LEWICA_RAZEM + 
      suma.POLEXIT + 
      suma.JEDNOŚĆ_NARODU + 
      suma.PIS + 
      suma.EUROPA_CHRISTI + 
      suma.WIOSNA + 
      suma.KONFEDERACJA + 
      suma.KUKIZ15 + 
      suma.POLSKA_FAIR_PLAY 
    }

    val wyniki = io.Source
      .fromResource("wyniki.csv")
      .getLines
      .toList
      .map(l => {
        l.split(",").toList.map(_.toInt) match {
          case List(a,b,c,d,e,f,g,h,i,j,k) => Wynik(a,b,c,d,e,f,g,h,i,j,k)
        }
      })

    def groupedWynik(w: Województwo): Wynik = {
    return (wyniki.filter(x => w.min to (w.min+19999) contains x.ID).reduce(sumList))
    }

    var min = 100
    var nazwa = ""

    województwa.foreach(w => {
        val sumaWoj = groupedWynik(w)
        val KO = sumaWoj.KOALICJA_OBYWATELSKA * 100
        val Pis = sumaWoj.PIS * 100
        val sumaWartosci = sumClass(sumaWoj)
        val roznica: Int = ((KO/sumaWartosci - Pis/sumaWartosci).abs)
        if (min > roznica){
          min = roznica
          nazwa = w.nazwa
        }
        })

        println(nazwa + ":" + min + "%")
  }
}


 
//Zadanie 4. Używając kolekcji i operacji na nich oraz danych z wyników wyborów zawartych w pliku wybory.csv znajdź województwo, 
//w którym różnica procentowa głosów oddanych na Koalicję Obywatelską oraz na PiS była minimalna. Otrzymane wyniki wyświetl na konsoli – zarówno dane województw(a), jak i wartości procentowe.
//Zauważ, że elementy o wartości "minimalnej/maksymalnej" nie muszą być unikatowe. 
//Do reprezentowania danych o województwach i gminach użyj zdefiniowanych w pliku Zad4.scala "klas wzorcowych" (case class) Województwo i Wynik. 