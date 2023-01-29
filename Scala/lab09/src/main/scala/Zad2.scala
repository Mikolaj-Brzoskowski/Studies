package Lab10
import akka.actor.{ActorSystem, Actor, ActorRef, Props}

object Zad2 {

  case object Pileczka

  class Gracz extends Actor{

    def receive: Receive = {
      case (op: ActorRef) => println("Dostałem aktora")
                             context.become(odbij(op))
    }

    def odbij(op: ActorRef): Receive = {
        case Pileczka => println(self.path.name + "odebrał piłeczkę")
                         op ! Pileczka
    }

  }

  def main(args: Array[String]): Unit = {

    val system = ActorSystem("sys")
    val gracz1 = system.actorOf(Props[Gracz](), "gracz1")
    val gracz2 = system.actorOf(Props[Gracz](), "gracz2")
    val gracz3 = system.actorOf(Props[Gracz](), "gracz3")

    gracz1 ! gracz2
    gracz2 ! gracz3
    gracz3 ! gracz1

    gracz3 ! Pileczka

  }

}