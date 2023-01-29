val ciąg = Seq(1, 2, 2, 4)
def isOrdered[A](seq: Seq[A])(leq:(A, A) => Boolean): Boolean = {
    seq.sliding(2).map( (seq: Seq[A]) => leq(seq(0), seq(1) ) ).reduceLeft(_&&_) 
}

println(isOrdered(ciąg)(_ < _))// == false
println(isOrdered(ciąg)(_ <= _))// == true 