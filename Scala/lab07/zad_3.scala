val set = Set(-3, 0, 1, 2, 5, 6)
def minNotContained(set: Set[Int]): Int = {
    return (set.toList.sorted.foldLeft(0)((prev: Int, curr: Int) => if (curr == prev) prev+1 else prev))
}

println(minNotContained(set))