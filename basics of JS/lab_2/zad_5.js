let a = [[1, 2, 1, 24], [8, 11, 9, 4], [7, 0, 7, 27], [7, 4, 28, 14], [3, 10, 26, 7]]


function printrow(){
    for (i = 0; i < a.length; i++){
        console.log("Rząd", i);
        for (j=0; j<a[i].length; j++){
            console.log(a[i][j]);
        };
    };
};

printrow();