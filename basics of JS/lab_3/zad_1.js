function triangleCheck(a,b,c){
    return ((a+b>c) && (b+c>a) && (c+a>b));
}

console.log(triangleCheck(2,6,4))