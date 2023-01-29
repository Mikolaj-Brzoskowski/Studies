'use strict';

// Poniższe fragmenty kodu zostały zakomentowane w celu utrzymania porządku. 
// Odkomentowuj je na bieżąco i zapisuj odpowiedzi w komentarzu. 
// Ostatecznie przed wrzuceniem pliku na repozytorium zakomentowane powinny być tylko dodane odpowiedzi i fragmenty kodu powodujące ewentualne błędy.

// ========================= Zadanie 1 =========================
// Co zwróci funkcja poniższa funkcja w każdym z poniższych przypadków?
// Wyjaśnij, dlaczego w niektórych przypadkach wyniki różnią się.

// ========================== UWAGA =============================
// Zapis 
// (impression) ? console.log('A') : console.log('B');
// Jest skróconą wersją:
// if (impression) {
//     console.log('A');
// } else {
//     console.log('B');
// }
// ==============================================================

function isEquals(val_1, val_2) {
    (val_1 == val_2) ? console.log('A') : console.log('B');
    (val_1 === val_2) ? console.log('C') : console.log('D');
}

isEquals(2, '2');
// operator == sprawdza tylko wartości, a === również typy 
isEquals(null, undefined);
//null i undefined są wartościami "pustymi", ale jako że są inaczej nazwane to operator === zwraca false przy ich spradzaniu
isEquals(undefined, NaN);
//NaN - Not a Number, jest innego typu niż undefined - da się to zauważyć po podświetleniu różnymi kolorami tych wartości
isEquals(['a', 'b', 'c'], ['b', 'c', 'd']);
//listy pierwsza i druga róźnią się wartościami, które zawierają
isEquals(0, '');
// 0 to int, '' to string, JavaScript najwidoczniej traktuje brak jakichkolwiek znaków w stringu jako wartość zerową
isEquals('0', '');
// 0 w stringu nie jest równe wartości zerowej, jest to po prostu traktowane jako znak bez wartości, w przeciwieństwie do ''
isEquals(+0, -0);
// nie istnieje coś takiego jak zero dotatnie i ujemne, prawdopodobnie kompilator ignoruje te znaki przy zerach
isEquals(0, false);
//zarówno 0 i false są wartościami "negatywnymi" jednak innego typu
isEquals(0, 'false');
// wartość zero nie jest równa jakiemuś losowemu ciągu znaków
isEquals([1, 2], '1,2');
//podobnie jak w pierwszym przykładzie, poszczególne wartości są takie same, ale mają inny typ

!!false; //podwójna negacja jest równa niczemu, tj. w tym przypadku zwrócona jest wartość false
!!true;
!!undefined;
!!null;

// ========================= Zadanie 2 =========================
// Jaki będzie efekt działania poniższego fragmentu kodu?
// Wyjaśnij wynik

const person = {
    firstName: 'Jan',
    lastName: 'Kowalski'
}

console.log(person);
// wyświetla dane przypisane do person
//person = {};
//console.log(person);
//pojawia się error, ponieważ chcemy zmienić const person, a wartości const nie można zmieniać

// ========================= Zadanie 3 =========================
// Co zostanie wyświetlone na ekranie?
// Wyjaśnij wynik

let number = 3;
console.log(number); {
    let number = 4;
    console.log(number);
    // number jest w tym momencie wartością lokalną=4, po wykonaniu funkcji number globalny nadal jest równy 3
}
console.log(number);

// ========================= Zadanie 4 =========================
// Czym się różnią poniższe dwa fragmenty kodu?
// Jak działa operator '...'?

const arr = [1, 2];
const newArr1 = [arr, 3, 4];
//dodaje tablice bezpośrednio do tablicy
console.log(newArr1);
const newArr2 = [...arr, 3, 4];
//spread operator dodaje wartości zawarte w arr do tablict arr2. inaczej mówiąc ignoruje nawiasy kwadratowe tablicy arr
console.log(newArr2);

// Co zostanie wyświetlone na ekranie?
// Wyjaśnij wynik

const word = 'react';
const arrWord = [...word];
//spread operator iteruje znaki zawarte w stringu, dlatego przy wypisywaniu arrWord litery są rozdzielone
console.log(arrWord);

// ========================= Zadanie 5 =========================
// Zapoznaj się z kodem poniżej. Jaki będzie jego wynik i dlaczego?

var hello = 'Hello world!';
var result = hello / 2;

result;

Number.isNaN(result);
Number.isNaN(hello);

//wynik nie wyświetla się, ponieważ jest brak console.log. Jeśli drukowałoby wynik, result zwróciło by true, ponieważ dzielenie stringa przez 2 zwraca wartość nieliczbową. Hello jest stringiem więc isNaN zwraca false

// ========================= Zadanie 6 =========================
// Zapoznaj się z przykładami poniżej. Jaka jest różnica między var a let/const?

// var car = 'BMW';

// function showCar() {
//     car = 'Audi';
//     model = 'A5';
//     console.log('Great car!');
// }

// showCar();

// car;
// model;

//brak var/let/const we funkcji showCar, wyrzuca błąd

var name = 'Bryan';

(function differentName() {
    var name = 'Adam';
    console.log(name);
})();

console.log(name);

//console.log najpierw wypisuje lokanly name z funkcji different name, a potem globalny name

if (true) {
    var a = 2;
}
console.log(a);

// if (true) {
//     const b = 2;
// }
// console.log(b);

//const może być tylko dostępne w bloku {} w którym jest zadeklarowana

for (var i = 0; i < 10; i++) {
    console.log(i);
}
console.log(i);

for (let i = 0; i < 10; i++) {
    console.log(i);
}
console.log(i);

//drugi console.log wypisuje i zainicjowane przez var, let inicjuje zmienną tylko na dany blok funkcyjny {}

var test = "var1";
var test = "var2";

let test2 = "let1";
//let test2 = "let2";

//ten sam let nie może być zdeklarowany dwa razy, w przeciwieństwie do var

// ========================= Zadanie 7 =========================
// Do czego używany jest 'use strict' w pierwszej linijce skryptu?

//sprawia, że kompilator pokazuje wszystkie błędy, a nie tylko te, które nie pozwalają pliku zkompilować się do końca (tj. pokazuje tzw. silent errory)
//nie pozwala również na używanie niezadeklarowanych zmiennych