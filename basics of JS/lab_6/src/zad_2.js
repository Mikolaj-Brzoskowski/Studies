const { lp3 } = require('./toplist');
const lodash = require('lodash');

const Queen = lp3.reduce((prev, curr) => {
    if (curr.author == 'Queen') return [...prev, curr.song]
    else return prev
}, [])

console.log(Queen)

const Pink = lp3.reduce((prev, curr) => {
    if (curr.author == 'Pink Floyd' && curr.change >= 10) return [...prev, curr.song]
    else return prev
}, [])

console.log(Pink)

const ChangeSort = (n) => {
    const sorted = [...lp3]
    sorted.sort((a,b) => parseFloat(a.change) - parseFloat(b.change))
    for (var i = 0; i < n; ++i) {
        sorted.pop()
    }
    return sorted
}

console.log(ChangeSort(4));

let firstPlace = {
    author: lp3[0].author,
    song: lp3[0].song
}

console.log(firstPlace)

function printPlace(tab) {
    const result = tab.reduce((prev, curr) => {
        if (prev == true && lodash.isNumber(curr)) return true
        else return false
    }, true)
    if (result == true) {
        return tab.reduce((prev, curr) => {
            return [...prev, lp3[curr-1]]
        },[])
    }
    else return result
}

console.log(printPlace([1,2,3,4,5,6,7]))

function randomPrint(n, min, max) {
    for (var i = 0; i<n; i++){
        console.log(lp3[lodash.random(min, max)-1])
    }
}

randomPrint(3, 2, 10)

function delay() {
    for(let i = 0; i < 10; i++) {
        lodash.delay(i => console.log(lp3[i]), 5000 * i, i);
    }
}

delay()
//funkcja liczy czas pomimo wykonywania innych funckji - jak wykonać najpierw secPrint, a potem resztę?

const negativePlace = lp3.reduce((prev,curr) => {
    if (curr.change < 0) return [...prev, curr]
    else return prev
}, [])

console.log(negativePlace)

const idIsName = lp3.reduce((prev,curr) => {
    prev[curr.song] = curr
    return prev 
}, {})

console.log(idIsName)

function bandSongs()
{
    const grouped = [...lp3]
    grouped.sort((a,b) => a.author.localeCompare(b.author));
    return grouped.reduce((prev,curr, index) => {
        if (index == 0){
            prev[curr.author] = [{
                song: curr.song, 
                place: curr.place
            }]
            return prev
        }
        if (curr.author == grouped[index-1].author) {
            prev[curr.author].push({
                song: curr.song, 
                place: curr.place
            })
            return prev
        }
        else {
            prev[curr.author] = [{
                song: curr.song, 
                place: curr.place
            }]
            return prev
        }
    }, {})
}
console.log(bandSongs())

function HowManySongs(){
    const grouped = [...lp3]
    grouped.sort((a,b) => a.author.localeCompare(b.author));
    console.log(grouped)
    return grouped.reduce((prev, curr, index) => {
        if (index == 0) return prev+1
        if (grouped[index-1].author==curr.author) return prev+1
        if (grouped[index-1].author== curr && index==grouped.length-1) console.log(`${grouped[index].author}: ${[prev+1]} piosenek`)
        if (grouped[index-1].author!= curr && index==grouped.length-1) console.log(`${grouped[index-1].author}: ${[prev]} piosenek\n${grouped[index].author}: 1 piosenek`)
        if (grouped[index-1].author== curr && index==grouped.length-1) return prev+1
        if (index != grouped.length-1) {
            console.log(`${grouped[index-1].author}: ${[prev]} piosenek`)
            return prev = 1
        }
    }, 0)
}

HowManySongs()

const minMax = lp3.reduce((prev, curr) => {
    if (curr.change > prev["Najwyższy wzrost"]) {
        prev["Najwyższy wzrost"] = curr.change
    }
    if (curr.change < prev["Największy spadek"]) {
        prev["Największy spadek"] = curr.change
    }
    return prev
}, {"Największy spadek": 0, "Najwyższy wzrost": 0})

console.log(minMax)