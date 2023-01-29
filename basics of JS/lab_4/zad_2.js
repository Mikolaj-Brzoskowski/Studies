const arr = [1,-4,2,-1,-4,5];

// let tmp = arr.reduce((prev, curr, index) => {
//     if (curr < 0){
//         arr[index] = null;
//     }
//     else {
//         arr[index] = arr[index] * arr[index]
//     };
// }, 0);

// console.log(arr.filter(x => x !== null))

let temp = arr.reduce((prev,curr) => {
    if (curr < 0){
        return [...prev]
    }
    else{
        return [...prev, curr * curr]
    }
}, []);

console.log(temp)