import akka.actor._

object Zad2 extends App {

  case class Wstaw2(n: Int)
  case class Usuń(n: Int)
  case class Pusto(n: Int)

  class Element extends Actor {

    def receive: Receive = {
      case Wstaw2(n) => 
        context.become(korzen(n))
    }

    def korzen(wartość: Int): Receive = {
      case Wstaw2(n) => {
        if (n == wartość) {
          val potomek = system.actorOf(Props[Element])
          context.become(zPotomkami(wartość, Set(potomek)))
        }
      }
      case Usuń(n) => { 
        self ! PoisonPill
        nadzorca ! Pusto(n)
      }
    }

    def zPotomkami(wartość: Int, potomkowie: Set[ActorRef]): Receive = {
      case Wstaw2(n) => {
        val potomek = system.actorOf(Props[Element])
        val lista = potomkowie + potomek
        println(lista)
        context.become(zPotomkami(wartość, lista))
      }
      case Usuń(n) => {
      if (potomkowie.size != 1) {
        potomkowie.head ! PoisonPill
        context.become(zPotomkami(wartość, potomkowie.tail))
      }
      else {
        potomkowie.head ! PoisonPill
        context.become(korzen(n))
      }
    }
    }
    
  }

  class Nadzorca extends Actor {
    def receive: Receive = {
      case Wstaw2(n) => {
      val rodzic = system.actorOf(Props[Element], s"rodzic${n}")
      rodzic ! Wstaw2(n)
      println(Set(n))
      context.become(stan(Set(n)))
      }
    }

    def stan(znane: Set[Int]): Receive = {
      case Wstaw2(n) => { 
        if (znane.contains(n)){
          context.actorSelection(s"akka://system/user/rodzic${n}")  ! Wstaw2(n)
          context.become(stan(znane))
      }
      else {
        val rodzic = system.actorOf(Props[Element], s"rodzic${n}")
        rodzic ! Wstaw2(n)
        val lista = znane + n
        println(lista)
        context.become(stan(lista))
      }
    }
      case Usuń(n) =>
        context.actorSelection(s"akka://system/user/rodzic${n}") ! Usuń(n)
      case Pusto(n) => {
        val lista = znane - n
        context.become(stan(lista))
      }
    }
  }

    val system = akka.actor.ActorSystem("system")
    val nadzorca = system.actorOf(Props[Nadzorca], "nadzorca")
    nadzorca ! Wstaw2(10)
    nadzorca ! Wstaw2(10)
    nadzorca ! Wstaw2(10)
    nadzorca ! Wstaw2(10)
    nadzorca ! Wstaw2(10)
    nadzorca ! Wstaw2(10)
    nadzorca ! Usuń(10)
    nadzorca ! Usuń(10)
    nadzorca ! Usuń(10)
    nadzorca ! Usuń(10)
    nadzorca ! Usuń(10)
    nadzorca ! Wstaw2(10)
}
