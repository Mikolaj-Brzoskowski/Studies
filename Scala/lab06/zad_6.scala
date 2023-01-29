def countChars(str: String): Int = {
    str.map(_.toByte).toSet.size //.filter(x => x != 32).
}

println(countChars("Ala ma kota"))