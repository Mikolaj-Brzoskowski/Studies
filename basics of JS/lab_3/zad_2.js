function intToString(x){
    let i = 0
    let string = ''
    do {
        string = string + i + ' '        
        i += 1
    } while (i <= x)
    return string
}

console.log(intToString(15))