var status

switch(status) {
    case 'Completed':
        runFunc();
        break;
    case 'Running': 
        runFunc2();
        break;
}

function runFunc(){
    console.log("Pierwsza funkcja po raz drugi");
}

function runFunc2(){
    console.log("Druga funkcja po raz drugi");
}