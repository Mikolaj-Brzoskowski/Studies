import scala.annotation.tailrec

@tailrec def ciąg(n: Int, acc1: Int = 1, acc2: Int = 1): Int = {
    if (n==0) return acc2
    else ciąg(n-1, acc1=acc1+acc2, acc2=acc1)
}

print(ciąg(9))