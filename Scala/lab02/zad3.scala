 def filter_pierwsza(n:Int): Boolean = {
     znajdź_pierwsza(n, i=2)
 }
 
 def znajdź_pierwsza(n:Int, i:Int = 2): Boolean = {
    if (n < 2) return false
    if (n == 2) return true
    if (n % i == 0) return false
    if (i*i > n) return true

    return znajdź_pierwsza(n, i+1)
}
 
 def ZnajdzRozklad(n:Int, i:Int = 0): Unit =
{
    val pierwsze = (2 to n).filter(filter_pierwsza)
    if(filter_pierwsza(n - pierwsze(i)))
    {
        println(s"Dla $n znaleziono parę: ${n-pierwsze(i)} i ${pierwsze(i)}")
    }
    else ZnajdzRozklad(n, i+1)
}

val n = io.StdIn.readInt()
(4 to n by 2).map(num => ZnajdzRozklad(num))