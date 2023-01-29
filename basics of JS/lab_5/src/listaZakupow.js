const listaZakupow = [
    {
        produkt: "chleb",
        typ: "pieczywo",
        ilosc: 2,
        cena: 3.6,
        jednostka: "sztuk"
    },
    {
        produkt: "jabłka",
        typ: "owoce",
        ilosc: 6,
        cena: 2.5,
        jednostka: "kg"
    },
    {
        produkt: "mleko",
        typ: "nabiał",
        ilosc: 3,
        cena: 2.9,
        jednostka: "litry"
    },
    {
        produkt: "kawa",
        typ: "napoje",
        ilosc: 1,
        cena: 24,
        jednostka: "sztuk"
    },
    {
        produkt: "kefir",
        typ: "nabiał",
        ilosc: 2,
        cena: 2.4,
        jednostka: "sztuk"
    },
    {
        produkt: "woda",
        typ: "napoje",
        ilosc: 6,
        cena: 1.9,
        jednostka: "sztuk"
    },
    {
        produkt: "marchewka",
        typ: "warzywa",
        ilosc: 2,
        cena: 4,
        jednostka: "kg"
    },
    {
        produkt: "banan",
        typ: "owoce",
        ilosc: 1,
        cena: 4.6,
        jednostka: "kg"
    },
    {
        produkt: "herbata",
        typ: "napoje",
        ilosc: 2,
        cena: 8,
        jednostka: "sztuk"
    },
    {
        produkt: "ziemniaki",
        typ: "warzywa",
        ilosc: 5,
        cena: 3.5,
        jednostka: "kg"
    },
    {
        produkt: "jogurt",
        typ: "nabiał",
        ilosc: 8,
        cena: 1.4,
        jednostka: "sztuk"
    }
]

let temp = listaZakupow.reduce((prev, curr) => {
    prev[curr["produkt"]] = curr;
    return prev;
}, {});

console.log(temp);

const suma = listaZakupow.reduce((prev, curr) => {
    if (curr["typ"] == "nabiał") return prev + curr["cena"];
    else return prev;
}, 0);

console.log(("Suma produktów nabiał: " + suma));

let kilogramy = listaZakupow.reduce((prev, curr) => {
    if (curr["jednostka"] == "kg") return [...prev, curr];
    else return prev;
}, []).sort((a,b) => a.produkt.localeCompare(b.produkt));

console.log(kilogramy);

function returnType(type) {
    return listaZakupow.reduce((prev, curr) =>  {
        if (curr["typ"] == type && (curr.cena * curr.ilosc) < 10) 
            return [...prev, curr];
        else return prev;
    }, []).sort((a,b) => parseFloat(a.cena) - parseFloat(b.cena));
}

console.log(returnType("nabiał"));

const temp2 = listaZakupow.reduce((prev, curr) => {
    if (curr.jednostka == "sztuk")  return [...prev, curr.produkt]
    else return prev;
}, []);

console.log(temp2);

function groupItems(tab, acc = 0)
{
    const grouped = [...tab]
    grouped.sort((a,b) => a.typ.localeCompare(b.typ));
    return grouped.reduce((prev, curr, index) => {
        if (index == 0){
            acc += 1
            return `${curr.typ}:\n${acc}. ${curr.produkt} - ${curr.jednostka}: ${curr.ilosc}`
        }
        if (curr.typ == grouped[index-1].typ) {
            acc += 1
            return prev + `\n${acc}. ${curr.produkt} - ${curr.jednostka}: ${curr.ilosc}`
        }
        else {
            acc = 1
            return prev + `\n${curr.typ}:\n${acc}. ${curr.produkt} - ${curr.jednostka}: ${curr.ilosc}`
        }
    }, ``);
}

console.log(groupItems(listaZakupow));

// 5.7

//console.log(sumaMin)

function resultSuma(tab, acc = 0) {
    const sumaMin = tab
    sumaMin.sort((a,b) => parseFloat(a.cena*a.ilosc) - parseFloat(b.cena*b.ilosc));
    return sumaMin.reduce((prev, curr) => {
        if (((curr.cena*curr.ilosc)+acc) < sumaMin[sumaMin.length - 1].cena){ 
            acc = acc + (curr.cena*curr.ilosc)
            return [...prev, curr.produkt + ": {cena: " + (curr.cena*curr.ilosc) + "}"]
                }
        else return prev
    }, []);
}

console.log(resultSuma(listaZakupow));