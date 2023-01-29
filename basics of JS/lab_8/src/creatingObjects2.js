// Brawo, teraz wiesz jak działa słowo kluczowe new :) 
// 1. Uprość funkcję BookCreator tak, aby zawierała tylko nadawanie wartości polom. (użyj operatora this) 
// Dodaj wywołanie słowa kluczowego new, przy wywołaniu BookCreator(). 

function BookCreator(title = "-", author = "-") {
    this.title = title,
    this.author = author,
    this.readers = 0
}

var book5 = new BookCreator('Cień wiatru', 'Carlos Ruiz Zafon');
var book6 = new BookCreator('Ojciech Chrzestny', 'Mario Puzo');

// BookCreator jest konstruktorem, a je zawsze (ZAWSZE) deklarujemy zaczynając nazwę od wielkiej litery

// 1.1. Użyj zmiennej prototype, aby dodać funkcje print() i addReader() do tworzonych obiektów.

BookCreator.prototype.print = function () { console.log(this) };
BookCreator.prototype.addReader = function () { this.readers += 1 };
// 2. Tworzymy alternatywną wersję powyższego kodu. Użyj słów kluczowych class i constructor, aby osiągnąć powyższy efekt.

class Book {

    constructor(title, author){
        this.title = title;
        this.author = author;
        this.readers = 0
        constructor.prototype.print = function () {console.log(this)};
        constructor.prototype.address = function () { this.readers += 1 }
    };

};

const book1 = new Book("Harry Poter", "J.K.Rowling")
book1.print()

// 3. Znasz już wiele sposób na stworzenie obiektu. Dlaczego więc nie użyć arrow function?
// Arrow function przyjmuje parent scope
// Uzupełnij poniższy kod o inicjalizację pola name i age. Dodaj wewnąrz funkcję addAge, która inkrementuje wiek. 

const Person = name => ({
    name: name,
    age: 0,
    addAge: function () {this.age += 1}
})

//const osoba = new Person("Jarosław")
//const osoba2 = Object.create(Person())
//osoba2.name = "Zdzisław"
//console.log(osoba2)

const osoba = Person("Krzysztof")
osoba.addAge()
console.log(osoba)
console.log(Person.prototype)

// Przetestuj działanie tak stworzonego obiektu, korzystając z wiedzy, którą już masz. Jakie są róznice pomiędzy stworzeniem obiektu za pomocą poprzednich metod?
// (przetestuj prototype, new itd.)
// Przy użyciu arrow function nie możemy zastosować słówka kluczowego new, a prototype nie działa, ponieważ arrow function nie ma go zdefinowanego

class Fraction {

    constructor(denumerator, numerator){
        this.numerator = numerator,
        this.denumerator = denumerator
    }

    multiplyBy(number){
        if (typeof number === "object") {
        this.numerator *= number.numerator
        this.denumerator *= number.denumerator
        }
        if (Number.isInteger(number) && number > 0){
            this.denumerator *= number
        }
    }

    static multiply(x,y){
        return new Fraction(x.denumerator*y.denumerator, x.numerator*y.numerator)
    }

    print(){
        console.log(`${this.denumerator}/${this.numerator}`)
    }

}

const trzyCzwarte = new Fraction(3,4);
const dwieTrzecie = new Fraction(2,3);
dwieTrzecie.multiplyBy(trzyCzwarte)
dwieTrzecie.print()
console.log(trzyCzwarte)
trzyCzwarte.print()
trzyCzwarte.multiplyBy(2)
trzyCzwarte.print()
const jednaTrzecia = new Fraction(1,3)
const trzyPiąte = new Fraction(3,5)
Fraction.multiply(jednaTrzecia,trzyPiąte).print()
