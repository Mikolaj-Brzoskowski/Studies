function palindrom(tab){
    if (tab.length == 0) return true
    else if (tab[0] == tab[tab.length-1]){
        tab.splice(0, 1)
        tab.splice(tab.length-1,1)
        return palindrom(tab)
    }
    else return false;
};

console.log(palindrom([1,2,3,4,4,3,2,1]));