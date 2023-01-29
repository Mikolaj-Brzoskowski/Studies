type MSet[A] = A => Int

val a:MSet[Int] = (n: Int) => 
n match
{ 
    case 1 => 2 
    case 3 => 1 
    case _ => 0 
}

val b:MSet[Int] = (n: Int) => 
n match
{ 
    case 1 => 4 
    case 2 => 6
    case _ => 0 
}

def suma(a: Int, b: Int) = a.+(b)
def roznica(a: Int, b: Int) = (a - b) max 0
def czescWspolna(a: Int, b: Int) = a min b

def lift[A, B, T](op: (T,T) => T)(f: A => T, g: B => T): (A,B) => T = {
    (v1: A, v2: B) => op(f(v1),g(v2))
}

def sum[A](s1: MSet[A], s2: MSet[A]): MSet[A] = 
{
    x => lift(suma)(s1, s2)(x, x)
}

println(sum(a,b)(1))

def diff[A](s1: MSet[A], s2: MSet[A]): MSet[A] = 
{
    x => lift(roznica)(s1, s2)(x, x)
}

println(diff(a,b)(1))

def mult[A](s1: MSet[A], s2: MSet[A]): MSet[A] = {
    x => lift(czescWspolna)(s1, s2)(x,x)
}

println(mult(a,b)(1))

// println(sum(a,b)(2))
// println(sum(a,b)(3))
// println(diff(a,b)(2))
// println(diff(a,b)(3))
// println(mult(a,b)(2))
// println(mult(a,b)(3))