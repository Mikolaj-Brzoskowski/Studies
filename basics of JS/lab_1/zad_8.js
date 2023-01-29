const array = ['asd', 'asd', 'sdf', 'qwe', 'sdf', 'tyu'];

var max=1
var count=0

function countElements(){
for (i=0; i<array.length; i++) {
    for(j=0; j<array.length; j++) {
        if (array[j]==array[i]) {
            if (j<i){
                break;
            }
            count++;
        }
    }
    if (count != 0) {
    console.log(array[i], ":", count);
    count=0
    }
}
}

countElements()