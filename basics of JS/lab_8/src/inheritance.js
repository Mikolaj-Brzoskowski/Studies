'use strict';

// 1.1 
// Co wyświetlą na ekranie poniższe wywołania?

const book = {
    title: "Potop",
    author: "Henryk Sienkiewicz"
}

//console.log(book.__proto__ === Object.prototype); //true
//console.log(book.__proto__.__proto__ === null);  //true?

// 1.2. 
// Zastanów się, co należy wpisać w miejsce ..., tak aby każde wywołanie po odkomentowaniu zwróciło true.

const animals = ["dog", "cat", "rabbit", "hamster"];

//console.log(animals.__proto__ === Array.prototype);
//console.log(animals.__proto__.__proto__ === Object.prototype);
//console.log(animals.__proto__.__proto__.__proto__ === null)

// 1.3. 
// Co zostanie wyświetlone na ekranie w poniższym przykładzie?

// function Animal(animal) {
//     this.animal = animal;
// }

// var dog = new Animal('dog');
// var cat = new Animal('cat');
// dog.whatIs = function () {
//     console.log("It's a " + this.whatIs());
// }

// console.log(dog.__proto__ === Animal.prototype); //true
// console.log(dog.__proto__ === cat.__proto__);    //false //jednak True

// 1.4.
// Stwórz obiekt za pomocą funkcji CreateMovie (zawierający klucze bez wartości: director, title, year) wykorzystując słówko `this`.
// Jeśli przy tworzeniu obiektu rok nie zostanie podany powinien przyjmować wartość "unknown".

function CreateMovie(director, title, year = "unknown"){
    this.director = director,
    this.title = title,
    this.year = year
}

// Następnie nie zmieniając implementacji funkcji CreateMovie, dodaj do niego metody: 
// * isOlder(year) - zwracającą true/false w zależności od tego, czy podany film jest młodszy/starszy nić rok 2000.
// * print - wyświetlającą: "director: title (year)"

CreateMovie.prototype.isOlder = function () {
    if (this.year > 2000) return true
    else return false
}

CreateMovie.prototype.print = function () {
    console.log(`${this.director}: ${this.title} (${this.year})`)
}

// const movie = new CreateMovie("dyrektor", "Fajnyfilm", 2004)

// console.log(movie.isOlder())
// movie.print()

// 1.5.
// Uzupełnij poniższy konstruktor o inicjalizację name, type i funkcję printInstrument. Funkcja printInstrument powinna być współdzielona między wszystkie utworzone obiekty.

function CreateInstrument(name, type) {
   const instrument = Object.create(CreateInstrument.prototype);
   instrument.name = name,
   instrument.type = type
   return instrument;
}

CreateInstrument.prototype.printInstrument = function() { console.log(this) }
const trąbka = CreateInstrument("trąba", "dęty")
trąbka.printInstrument()


// 1.6. 
// Uzupełnij poniższy konstruktor, który tworzy obiekt dziedziczący po Instrument. Wykorzystaj do jego stworzenia konstruktor z zadania poprzedniego.
// Zdefiniuj funkcję setStrings(number), która ustala liczbę strun w instrumencie (ta funkcja też powinna być współdzielona). NewStringInstrument powinien mieć też dostęp do funkcji, która znajduje się w Instrument.
// Podpowiedź: aby zmienić wartość zmiennej __proto__ należy użyć - Object.setPrototypeOf(object, prototype) - należy użyć tej funkcji dwa razy w tym rozwiązaniu. 

function CreateStringedInstrument(name, type, stringsCount) {
    const newStringedInstrument = CreateInstrument.call(this, name, type);
    newStringedInstrument.stringsCount = stringsCount;
    Object.setPrototypeOf(newStringedInstrument, CreateStringedInstrument.prototype);
    return newStringedInstrument;
}

Object.setPrototypeOf(CreateStringedInstrument.prototype, CreateInstrument.prototype);

CreateStringedInstrument.prototype.setStrings = function (number) {
    this.stringsCount = number;
}

const stringedInstrument = CreateStringedInstrument('wiolonczela', 'strunowy', '3');
stringedInstrument.printInstrument();
stringedInstrument.setStrings(4);
stringedInstrument.printInstrument();

// 1.7. 
// Przeanalizuj poniższy kod i odpowiedz na umieszczone w nim pytania.

function Instrument(name, type) {
    this.name = name;
    this.type = type;
}

Instrument.prototype.printInstrument = function () {
    console.log("Instrument: " + this.name + ", typ: " + this.type);
}

function StringedInstrument(stringsCount, name, type) {
    Instrument.call(this, name, type);
    this.stringsCount = stringsCount;
}

StringedInstrument.prototype = Object.create(Instrument.prototype);

// a) Stwórz instancję StringedInstrument.

const wiolonczela = new StringedInstrument(4, "wiolonczela", "strunowy")

// b) W jaki sposób odwołać się do metody printInstrument?

Instrument.prototype.printInstrument.call(wiolonczela)

// c) Zastąp wywołanie call() funkcją apply() 

Instrument.prototype.printInstrument.apply(wiolonczela)

// 1.8.
// Utwórz obiekt Animal z polem 'name' i funkcją printName, po którym będą dziedziczyły Mammal (z polem age i funkcją getAge) i Fish (z polem weight i funkcją increaseWeight()) . 
// Następnie stwórz kolejne obiekty - Dog (z polem breed i nadpisaniem funkcji getAge(), która tutaj będzie najpierw wywoływała funkcję getAge() z klasy dziedziczonej, a następnie mnożyła wynik razy 4 i wyświetlała go) i Salmon (z funkcją catch()), które będą dziedziczyły odpowiednio po Mammal i Fish.
// W razie problemów wzoruj się na rozwiązaniu z poprzedniego zadania.

const Animal = function(name) {
    this.name = name;
}

Animal.prototype.printName = function() {
    console.log(this.name)
}

const Mammal = function(name, age) {
    Animal.call(this, name);
    this.age = age;
}

Mammal.prototype.getAge = function(){
    return this.age;
}

const Fish = function(name, weight) {
    Animal.call(this, name);
    this.weight = weight;
}

Fish.prototype.increaseWeight = function(number){
    this.weight += number
}

const Dog = function(name, breed, age) {
    Mammal.call(this, name, age);
    this.breed = breed;
}

Dog.prototype.getAge = function(){
    return Mammal.prototype.getAge.call(this) * 4
}

const burek = new Dog('Burek', 'CundelBurry', 2);
console.log(burek)
console.log(burek.getAge());

const Salmon = function(name, weight) {
    Fish.call(this, name, weight)
}

Salmon.prototype.catch = function() {
    console.log("Gratulacje! Złapałeś lososia")
}