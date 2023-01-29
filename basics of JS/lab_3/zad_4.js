(function longest(str){
    let tab = str.split(" ")
    const sorted = tab.sort((a,b) => b.length - a.length)
    console.log(sorted[0])
})("Ala ma kota");

