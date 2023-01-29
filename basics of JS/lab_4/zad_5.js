const wishlist = [   
    {  
        name: 'Czajnik',  
        netto: 100  
    },  
    {  
        name: 'Lodówka',  
        netto: 1300  
    },  
    {  
        name: 'Mikrofalówka',  
        netto: 340  
    },  
    {  
        name: 'Mikser',  
        netto: 120  
    },  
    {  
        name: 'Piekarnik',  
        netto: 2100  
    }  
]

const suma = wishlist.reduce((prev, curr) => {
    return prev + curr["netto"]
}, 0) * 1.23;

console.log(suma);

function ceny(arr){
    const tablica = arr.reduce((prev, curr) => {
        return [...prev, curr["netto"]];
    }, []);
    return tablica;
};

console.log(ceny(wishlist));

function lista(arr, f){
    return arr.reduce((prev, curr) => {
        return [...prev, f(curr)]
    }, []);
}

console.log(lista(wishlist,  x  => x.name + ' ' + x.netto + "zł"))

const result = wishlist.map(x => x.name + ' : ' + x.netto);
console.log(result)

console.log(lista(wishlist, x => {
    if (x.netto < 500){return (x.name + ' ' + x.netto + "zł")}}).filter(item => item !== undefined));