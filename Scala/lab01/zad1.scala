import scala.math._
import scala.io.StdIn.{readLine, readInt}
import scala.collection.mutable.ArrayBuffer

var numer = readInt
var array = ArrayBuffer[String]()
for (i <- 1 to numer){
    var linia: String = readLine
    array += linia
}
var posortowana = array.sorted.sortBy(_.length)
println("\nPosortowana lista:")
for (i <- 1 to numer){
    println(posortowana(i-1))
}