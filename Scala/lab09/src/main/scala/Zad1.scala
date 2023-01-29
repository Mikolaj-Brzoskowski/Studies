package Lab10
import akka.actor.{ActorSystem, Actor, ActorRef, Props}

object Zad1 extends App{

  case class Wynik(liczba1: Double, liczba2: Double)
  case object Zmien  

 class Pracownik extends Actor  {
    def dodawanie(w:Wynik): Unit = { println("Dodawanie: "+(w.liczba1+w.liczba2))}
    def mnozenie(w:Wynik): Unit = { println("Mnożenie: "+(w.liczba1*w.liczba2))}

    def receive: Receive =    {
      case w:Wynik => dodawanie(w)
      case Zmien => context.become(receive_dodawanie, false)
    }

    def receive_dodawanie: Receive =    {
      case w:Wynik => mnozenie(w)
      case Zmien => context.unbecome()
    }

  }

  val system = ActorSystem("dodawaniemnozenieActorSystem")
  val dodajacyActor = system.actorOf(Props[Pracownik](), "dodajacy")

  dodajacyActor ! Wynik(3,3)
  dodajacyActor ! Zmien  
  dodajacyActor ! Wynik(3,3)
  dodajacyActor ! Zmien  
  dodajacyActor ! Wynik(3,3)

}

