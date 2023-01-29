import akka.actor.{ActorSystem, Actor, Props}
import scala.concurrent.duration._
/*
  W konfiguracji projektu wykorzystana została wtyczka
  sbt-revolver. W związku z tym uruchamiamy program poleceniem

    reStart

  a zatrzymujemy pisząc (mimo przesuwających się komunikatów)

     reStop

  i naciskając klawisz ENTER. Jeśli czynności powyższe
  już wykonywaliśmy to możemy też przywołać poprzednie
  polecenia używając strzałek góra/dół na klawiaturze.
*/

// Przykład wykorzystania Planisty (Scheduler)
object Jabberwocky {

  case class Init(z1: ActorRef, z2: ActorRef)
  case class Strzelaj(op: ActorRef)
  case class Obrazenia(n: Int)
  case object Rozkaz
  case object GetReady
  case object Rozkaz

  object TickActor {
    val Tick = "tick"
  }
  class TickActor extends Actor {
    import TickActor._
    def receive = {
      case Tick => println("Tick")
        Scheluder ! Rozkaz
    }
  }
  class Scheluder extends Actor {
    def receive: Receive = {
      case Init(zamek1, zamek2) =>
        zamek1 ! GetReady
        zamek2 ! GetReady
        context.become(zlecenie(zamek1,zamek2))
    }
    def zlecenie(zamek1: ActorRef, zamek2: ActorRef): Receive = {
      case Rozkaz => 
        zamek1 ! Strzelaj(zamek2)
        zamek2 ! Strzelaj(zamek1)
    }
  }
  class Zamek extends Actor {
    def receive: Receive = {
      case GetReady => context.become(fighting(100,300))
    }
    def fighting(active: Int, reserved: Int): Receive = {
      case Strzelaj(opponent) => 
        //rand
        opponent ! Obrazenia()
      case Obrazenia(n) =>
        active -= n
        if (active <= 0) self ! PoisonPill
        else {                                //uzupełnianie od razu
          if (n > reserved){
            active += reserved
            reserved = 0
          }
          else {
            reserved -= n
            active += n 
          }
        }
        context.become(fighting(active, reserved))
    }
  }

  def main(args: Array[String]): Unit = {
    val system = ActorSystem("system")
    import system.dispatcher

    val tickActor = system.actorOf(Props[TickActor](), "defender")
    val scheluder = system.actorOf(Props[Scheluder](), "scheluder")
    val zamek1 = system.actorOf(Props[Zamek](), "Zamek1")
    val zamek2 = system.actorOf(Props[Zamek](), "Zamek2")

    val ticker = system.scheduler.scheduleWithFixedDelay(
      Duration.Zero,
      100.milliseconds,
      tickActor,
      TickActor.Tick
    )

    scheluder ! Init(zamek1, zamek2)

    // system.terminate()

  }
}
