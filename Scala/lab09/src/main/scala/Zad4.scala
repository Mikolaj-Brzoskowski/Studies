
object Zad4 {
    import akka.actor._
    case class Start(max: Int)
    case class Number(n: Int, max: Int)

    class Nadzorca extends Actor {
        def receive: Receive = {
            case Start(m) =>
                if (m >= 2) {
                    context.become(Roznica(List.range(2, m), math.sqrt(m+1).toInt))
                    for (n <- 2 to math.sqrt(m+1).toInt) { 
                        val pracownik = context.actorOf(Props[Pracownik]())
                        pracownik ! Number(n, m) 
                    }
                }
        }
        def Roznica(acc: List[Int], idx: Int): Receive = {
            case l:List[Int]=> {
                if (idx == 2) println(acc.diff(l))
            context.become(Roznica(acc.diff(l), idx-1))
            }
        }
    }

    class Pracownik extends Actor {
        def receive: Receive = {
            case Number(n, max) => context.sender() ! List.range(2, max).filter(x => x%n == 0 && x != n)
            case msg =>
                println(msg)
        }
    }

    def main(args: Array[String]): Unit = {
        val system = ActorSystem("Eratostenes")
        val Nadzorca = system.actorOf(Props[Nadzorca](), "Nadzorca")
        Nadzorca ! Start(100)
    }
}