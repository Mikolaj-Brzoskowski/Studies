def isPrime (n:Int, i:Int = 2): Boolean = {
    if (n < 2) return false
    if (n == 2) return true
    if (n % i == 0) return false
    if (i*i > n) return true

    return isPrime(n, i+1)
}

print(isPrime(7))