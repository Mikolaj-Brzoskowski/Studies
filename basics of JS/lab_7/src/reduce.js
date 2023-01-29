const arr = [
    { key: 0, x: [4,5,6], y: [1,2,3,4]},
    { key: 0, x: [1], y: [] }
]            

const result = arr.reduce((prev, curr) => {
    return [...prev, {key: curr.key, x: curr.x, y: curr.y, suma: (curr.x.length + curr.y.length)}]
}, [], 0)

console.log(result)

const suma = arr.reduce((prev, curr) => {
    return prev + curr.x.length + curr.y.length
}, 0)

console.log(suma)