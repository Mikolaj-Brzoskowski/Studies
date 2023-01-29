let a = [[1,2,3], [4,5,6]] 

function flattable(){
    array=[]
    for (i = 0; i < a.length; i++){
        for (j=0; j<a[i].length; j++){
            array.push(a[i][j]);
        };
    };
    return array;
};

console.log(flattable());