package lab11

import akka.actor.{ActorSystem, Actor, ActorRef, Props}

case class Init(liczba: Int)
case class Zlecenie(tekst: List[String])
case class Wykonaj(linia: String, tekst: List[String])
case class Wynik(lista: List[(String, Int)], tekst: List[String])

class Nadzorca extends Actor {

  def receive: Receive = {
    case Init(n: Int) => {
    val pracownicy: List[ActorRef] = (for (x <- 1 to n) yield  {
      val pracownik = context.actorOf(Props[Pracownik]())
      pracownik
    }).toList
    context.become(przyjmijZlecenia(pracownicy, List(), 0))
    }
  }

  def przyjmijZlecenia(actors: List[ActorRef], result: List[(String,  Int)], idx: Int): Receive = {
    
    case Zlecenie(l: List[String]) => {
      if (idx < actors.length){
        actors(idx) ! Wykonaj(l(idx), l)
      }
      else {
        println(result.groupBy(_._1).map{ case (slowo, value) => slowo -> (value.map(_._2)).sum})
        
      }
    }
    case Wynik(wynik, tekst) => 
    val tab: List[(String, Int)] = wynik ::: result
    context.become(przyjmijZlecenia(actors, tab, idx+1))
    self ! Zlecenie(tekst) 
  }

}

class Pracownik extends Actor {
  def receive: Receive = {
    case Wykonaj(l, tekst) => {
      val wynik = l.split(" ").map(x => x.toLowerCase.filterNot(Set('.', ',', '-')(_))).groupBy(identity).mapValues(_.size).toList
      context.sender() ! Wynik(wynik, tekst)
    } 
  }
}

object Main {

  def dane(): List[String] = {
    scala.io.Source.fromResource("ogniem_i_mieczem.txt").getLines.toList
  }

  def main(args: Array[String]): Unit = {
    val system = ActorSystem("HaloAkka")
    val nadzorca = system.actorOf(Props[Nadzorca](), "nadzorca")
    nadzorca ! Init(10)
    nadzorca ! Zlecenie(dane)
  }

}
