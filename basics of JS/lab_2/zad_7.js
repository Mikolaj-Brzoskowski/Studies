table=[1, 2, null, 24, 8, 11, 9, undefined, 7, 0, "", 27, 7, 4, 28, false, 3, 10, NaN, 7]

function deleteUndefined(table){
    for (i=0; i<table.length; i++){
        if ( table[i]==NaN || table[i]==null || table[i]==0 || table[i]==false || table[i]==undefined  ){
            table.splice(i,1);
        };
    };
    return table.filter(Boolean);
};

console.log(deleteUndefined(table));