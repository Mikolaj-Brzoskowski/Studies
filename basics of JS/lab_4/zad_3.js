const arr = [1,-4,2,-1,-4,5];

let tmp = arr.reduce((prev, curr, index) => {
    console.log(index, ":", curr)
}, 0);

