val tablica = Array(1,3,4,5,4,3,2,1)

def jestPalindromem(tab: Array[Int]): Boolean = {
    if (tab.size == 0) return true
    else if (tab(0) == tab(tab.size-1)){
        jestPalindromem(tab.drop(tab(0)).dropRight(tab(tab.size-1)))
    }
    else return false
}

println(jestPalindromem(tablica))