const arr = [1,2,3,4,5];

let tmp = arr.reduce((prev,curr) => {
    return prev + curr;
}, 0);

console.log(tmp)

