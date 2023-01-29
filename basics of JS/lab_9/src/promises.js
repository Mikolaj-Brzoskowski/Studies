'use strict';

const axios = require('axios');

// 2.1 Stwórz obiekt klasy Promise -> niech zakończy się powodzeniem (resolve) po 5 sekundach i zwróci string 'Udało się!'. 
// Jako callback niech wypisze zwrócony string w konsoli.

const promise = new Promise((resolve) => {
    setTimeout(function() {
        resolve('Udało się!')
    }, 5000)
});


promise.then((value) => {
    console.log(value);
});


// 2.2 Zmodyfikuj powyższy kod tak, aby zamiast z sukcesem - promise zakończył się porażką i zwracał string 'Porażka'.
// Skorzystaj z then() aby obsłużyć błąd.

const promise2 = new Promise((reject) => {
    setTimeout(function() {
        reject('Porażka')
    }, 5000)
});

promise2.then(
    (value) => {
        console.log(value);
    }
);


// 2.3 Zamiast then(), zmodyfikuj powyższy kod używając catch()

const promise3 = new Promise((resolve, reject) => {
    setTimeout(function() {
        reject('Porażka')
    }, 5000)
});

promise3.catch(error => console.log(error))

// 2.4 Napisz funkcję multiplyAsync(x,y), która zwraca obiekt klasy Promise, kończący się porażką, gdy któryś za argumentów jest niepoprawny (nie jest liczbą).
// W przeciwnym przypadku zwraca iloczyn dwóch liczb. Napisz callback, który wypisuje wynik w konsoli.

const multiplyAsync = function(x,y) {
    return new Promise((resolve, reject) => {
        if (isNaN(x) === true || isNaN(y) === true) reject('Not a number')
        else resolve(x*y)
    });
};

function callback(x){
    console.log(x)
}

multiplyAsync(3,4).then(x => callback(x)).catch(error => callback(error))

// 2.5 Dołącz axios do projektu. Wykonaj funkcję get dla następującego url: https://jsonplaceholder.typicode.com/posts. 
// Jako pierwszy callback - sprawdź czy response jest poprawny (status równy 200). Jeśli tak, to zwróć response, w przeciwnym wypadku wypisz błąd w konsoli.
// Jako następny callback - użyj destrukcji obiektów, aby wypisać w konsoli zmienną 'data' i 'headers'.

axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
    if (response.status == 200) return response
    else console.log("Rosponse status != 200")
    }).then(({data,headers}) => {
        console.log(data);
        console.log(headers);
    })


/* 2.6 Stwórz funkcję, która przyjmuje jako parametr obiekt takiej postaci:

Następnie wysyła taki obiekt za pomocą funkcji post z biblioteki axios pod url: https://jsonplaceholder.typicode.com/todos.
Jeśli dodanie zakończy się sukcesem - wyświetli w konsoli komunikat 'Dodano' i wyświetli id dodanego obiektu. W przeciwnym wypadku wypisze błąd.
*/

const obj = {
    idUser: 3,
    title: "Harry Potter",
    completed: true
}

const postObj = function(x) {
    axios.post("https://jsonplaceholder.typicode.com/todos", x)
    .then(({data}) => {
        console.log("Dodano")
    }).catch(error => console.log(error))
}

postObj(obj)