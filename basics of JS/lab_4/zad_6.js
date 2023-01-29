function find(element){
    const tablica=[ 'Ala', 'Kot', 'Pies' ];
    let wynik = tablica.reduce((prev, curr) => {
        if (curr === element){
            return curr
        }
        else if (prev === " "){
            return undefined
        }
        else {
            return prev
        };
    }, " ");
    return wynik
};
            
console.log(find('Chomik'));