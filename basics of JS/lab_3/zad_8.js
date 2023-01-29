function nwd(x,y) {
    if (x!=y) {
        if (x>y) {
            return nwd(x=x-y, y)
        }
        else {
            return nwd(x, y=y-x)
        };
    }
    else {
        return x
    };
}

console.log(nwd(56,6));