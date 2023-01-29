import scala.math._

var first = "4457"
var second = "6876"
val len_1st = first.length()
val len_2nd = second.length()

var wynik = ""
var reszta = 0

if (len_1st > len_2nd){
    val dif = len_1st-len_2nd
    for (i <- (1 to dif)) {
        second = "0" + second
    }
}
else if (len_2nd > len_1st) {
    val dif = len_2nd - len_1st
    for (i <- (1 to dif)) {
        first = "0" + first
    }
}

for (i <- (0 to len_2nd-1).reverse) {
    val x = first(i).toInt - '0'
    val y = second(i).toInt - '0'
    //println(x,y)
    if ((x+y+reszta)>9) {
        wynik = ((x+y+reszta) % 10).toString + wynik
        reszta = 1
    }
    else {
        wynik = (x+y+reszta).toString + wynik
        reszta = 0
    }
}
if (reszta == 1 ){
    wynik = reszta.toString + wynik
}

println(wynik)