def val_trójkąt(wys: Int, szr: Int): Int = {
      if (szr == 0 || wys==szr || wys==0) 1
      else  val_trójkąt(wys-1, szr-1) + val_trójkąt(wys-1, szr)
}

def print_trójkąt(wys: Int, n: Int=0): Unit = {
  if(n<wys){
    print(" " * (2*wys-1-2*n) + "1")
    (1 to n).map(x =>val_trójkąt(n, x)).map(result => "   " + result).foreach(print)
    print('\n')
    print_trójkąt(wys,n+1)
  }    
}

println("Wprowadź wysokość trójkąta:")
val read = io.StdIn.readInt
print_trójkąt(read)