package Lab10
import akka.actor.{ActorSystem, Actor, ActorRef, Props}
import scala.collection.mutable.ListBuffer
import javax.sound.midi.Receiver

object Zad3 {

  case class Start(n: Int)
  case class Pileczka(tab: List[ActorRef], idx: Int)
  
  class Nadzorca extends Actor{

    def receive: Receive = {
    case Start(n: Int) => {
        val pracownicy: List[ActorRef] = (for (x <- 1 to n) yield {
            val gracz: ActorRef = context.actorOf(Props[Pracownik]())
            println("Stworzyłem gracza: ", x)
            gracz
        }).toList
        pracownicy(0) ! Pileczka(pracownicy, 1)
      }
    }
  }

  class Pracownik extends Actor {

    def receive: Receive = {
      case Pileczka(tab, idx) =>
      if (idx == tab.length) {println("Gracz", 0, "otrzymuje piłeczkę")
                              tab(0) ! Pileczka(tab, 1)
      }
      else {
        println("Gracz", idx, "otrzymuje piłeczkę")
        tab(idx) ! Pileczka(tab, idx + 1)
      }
    }
  }
  
  def main(args: Array[String]): Unit = {
    val system = ActorSystem("sys")
    val nadzorca = system.actorOf(Props[Nadzorca](), "Nadzorca")

    nadzorca ! Start(100)
  }

}
