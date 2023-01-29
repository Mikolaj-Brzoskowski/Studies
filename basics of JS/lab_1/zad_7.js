const numbers = [4, 10, 32, 1, 54, 43, 21, 43, 65, -43, 5];

var max=1
var count=0

function countElementsMax(){
for (i=0; i<numbers.length; i++) {
    for(j=i; j<numbers.length; j++) {
        if (numbers[j]==numbers[i]) {
            count++;
        }
        if (count>max){
            max=count;
            liczba=numbers[i];
        }
    }
    count=0;
}
return console.log("Najwięcej wystąpień ma element:", liczba, "| Liczba wystąpień:", max)
}

countElementsMax()