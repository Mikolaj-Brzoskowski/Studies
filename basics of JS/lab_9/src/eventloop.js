'use strict';
// Zadanie 1.1. Dopisz do pomiędzy deklaracją funkcji helloWorld, a poleceniem console.log instrukcję wywołania helloWorld() tak, aby na ekranie pojawiło się jako pierwsze 'No, hello universe!'.
// Nie możesz dopisać nic za console.log()


// function helloWorld() {
//     console.log('Hello world!');
// }setTimeout(helloWorld, 5000)


// console.log('No, hello universe!');

// Zadanie 1.2. Napisz funkcję, która wypisuje 'Welcome' co sekundę w nieskończoność.

// function Welcome() {
//     console.log('Welcome!');
// }setInterval(Welcome, 1000)

// Zadanie 1.3. Napisz funkcję, która wypisuje 'Welcome' co sekundę, ale tylko przez 5 sekund. Podpowiedź: (użyj clearInterval)

// var counter = 0
// var i = setInterval(function Welcome() {
//     console.log("Welcome!")
//     counter++
//     if (counter === 5){
//         clearInterval(i);
//     };
// }, 1000)

// Zadanie 1.4. Napisz funkcję, która przyjmuje trzy argumenty: funkcję i dwie liczby. Funkcja będzie wywołała podaną w argumencie 
// funkcję co x milisekund i automatycznie zatrzyma się po upływie y milisekund. 

// function DoSth(f, x, y) {
//     var counter = y/x
//     var fun = setInterval(() =>{
//         counter--
//         if(counter === 0) clearInterval(fun)
//         f();
//     }, x);
// }


// const Hello = () => {console.log("Hi there!")}

// DoSth(Hello, 500, 5000)

// Zadanie 1.5. 
/* Napisz funkcję:

                  
                        
taką, że:

    - jej dwoma pierwszymi argumentami są funkcje asynchroniczne – możesz założyć, że funkcje te muszą być przygotowane na przyjęcie określonej listy argumentów, z których korzystać będzie poKolei
    - funkcja poKolei powinna zapewnić, że fun2 wykona się zawsze po fun1, a wyniki wygenerowane przez fun1 zostaną przekazane do fun2.
    - trzecim argumentem jest „callback” cb, czyli funkcja, której zadaniem jest przetworzenie wyników zwracanych przez fun2
*/


// function helloWorld(cb) {
//     setTimeout(function() {
//     console.log('Rozpoczynam callback');
//     cb(5);
//     }, 3000)
// }

// function helloUniverse(cb, x){
//     setTimeout(function() {
//     console.log('Dodaje 1')
//     x += 1
//     cb(x)
//     }, 2000)
// }

function callback(x){
    console.log("Skończyłem z liczbą:" + x)
}

// const poKolei = (fun1, fun2, cb) => { 
//     fun1(x => fun2(x => cb(x), x))
// }

// poKolei(helloWorld, helloUniverse, callback)

// Zadanie do przećwiczenia: 

var init = function() {
    console.log("starting init promise");
    return new Promise(resolve => {
      setTimeout(function() {
        console.log("Inicjalizacja 5")
        resolve(5)
      }, 3000);
    });
  };
  
  var apply = function(x) {
    console.log("starting apply promise");
    return new Promise(resolve => {
      setTimeout(function() {
        console.log("Dodaje jedynkę")
        x += 1
        resolve(x)
      }, 2000);
    });
  };


const poKolei2 = async function(fun1, fun2, cb) {
    console.log('==START SEKWENCYJNY==');
    const res = await fun1();
    console.log(res);
    const res2 = await fun2(res);
    cb(res2);
  }


poKolei2(init, apply, callback);

// Zmodyfikuj rozwiązanie zadania 1.5, używając mechanizmu async-await zamiast callbacków.