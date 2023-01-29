function isEqual(x,y,z){
    if (x == y && y == z && typeof x == typeof y && typeof y == typeof z) {
        return true;
    }
    else {
        return false;
    };
}

console.log(isEqual(1,"1",1));