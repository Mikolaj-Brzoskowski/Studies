def compose[A, B, C](f: A => B, g: B => C): A => C = {
    //g(f())
    //g compose f
    //f andThen g
    a:A => g(f(a))
}

def prod[A, B, C, D](f: A => C, g: B => D): (A, B) => (C, D) ={
    (a:A, b:B) => (f(a),g(b))
}

def isEven(i: Int) = i % 2 == 0
def TrueorFalse(b: Boolean) = if(b) "true" else "false"
def suma(a: Int, b: Int) = a + b
def len(s : String) = s.length
def zaokrąglenie(d: Double)= d.floor.toInt

println(compose(isEven, TrueorFalse)(2))

def lift[A, B, T](op: (T,T) => T)(f: A => T, g: B => T): (A,B) => T = {
    (v1:A, v2:B) => op(f(v1),g(v2))
}

println(lift(suma)(len, zaokrąglenie)("Aaa", 4.53))
println(prod(zaokrąglenie, TrueorFalse)(2.67, false))
