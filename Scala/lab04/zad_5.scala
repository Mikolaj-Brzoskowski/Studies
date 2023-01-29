def Koniunkcja[A](p1: A => Boolean, p2: A => Boolean): A => Boolean = {
    a => p1(a) && p2(a)
}

def Alternatywa[A](p1: A => Boolean, p2: A => Boolean): A => Boolean = {
    a => p1(a) || p2(a)
}

def Negacja[A](p1: A => Boolean): A => Boolean = {
    a => !p1(a)
}

def Implikacja[A](p1: A => Boolean, p2: A => Boolean): A => Boolean = {
    a => !p1(a) || p2(a)
}

val parzysta = (n: Int) => n % 2 == 0
val nieparzysta = (n: Int) => n % 2 == 1 
val wiekszaOd5 = (n: Int) => n > 5
val rowna5 = (n: Int) => n == 5
val mniejszaOd5 = (n: Int) => n < 5


println(Koniunkcja(parzysta, wiekszaOd5)(4))
println(Koniunkcja(parzysta, wiekszaOd5)(8))
println(Alternatywa(parzysta, wiekszaOd5)(3))
println(Alternatywa(parzysta, wiekszaOd5)(6))
println(Negacja(mniejszaOd5)(4))
println(Negacja(parzysta)(6))
println(Implikacja(rowna5, nieparzysta)(5))
println(Implikacja(parzysta, nieparzysta)(5))