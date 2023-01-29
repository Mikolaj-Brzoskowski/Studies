const arr = [ 
    { id: 'abc', name: 'Ala' }, 
    { id: 'def', name: 'Tomek' }, 
    { id: 'ghi', name: 'Jan' } 
]

let temp = arr.reduce((prev, curr) => {
    prev[curr["id"]] = curr;
    return prev;
}, {});

console.log(temp['abc'])

