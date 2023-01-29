const numbers = [4, 10, 32, 1, 54, 43, 21, 43, 65, -43, 5];


for (var i = 0; i < numbers.length; i++){
    console.log(numbers[i]);
}

console.log("Najmniejsza wartość to", Math.min.apply(Math, numbers));
console.log("Największa wartość to", Math.max.apply(Math, numbers));