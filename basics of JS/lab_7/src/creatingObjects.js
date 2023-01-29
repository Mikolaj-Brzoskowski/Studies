// ========================================
// ZADANIE 1
// ========================================

//  Zdefiniuj pola 'title' i 'author' i funkcję print(), która wypisze: author - title

const book0 = {
    author: "author",
    title: "title",
    print: function() {console.log(`${this.author} - ${this.title}`)}
};

book0.print();

const book = {};
book.author = "author"
book.title = "title"
book.print = function() {console.log(`${this.author} - ${this.title}`)}

book.print();

const book2 = Object.create({});
book2.author = "author"
book2.title = "title"
book2.print = function() {console.log(`${this.author} - ${this.title}`)}
book2.print();

function BookCreator(title, author) {
    const b = {};
    b.title = title;
    b.author = author;
    b.print = function() {console.log(`${this.author} - ${this.title}`)}
    return b
}

const book3 = BookCreator('Cień wiatru', 'Carlos Ruiz Zafon');
const book4 = BookCreator('Ojciech Chrzestny', 'Mario Puzo');

book3.print();
book4.print();

// ========================================
// ZADANIE 2
// ========================================

// Przetestuj poniższy kod i odpowiedz na pytania


function testThis() {
    console.log(this);
}

testThis();

function testThis2() {
    "use strict"
    console.log(this);
}

testThis2();

// 2.1. Czym jest this? This jest dynamiczną wartością zmieniającą się na podstawie tego jaką funkcję, obiekt itp. dostała. 
// 2.2. Do czego odwołuje się this w obu przypadkach? W pierwszym przypadku odwołuje się do swojej globalnej definicji, a w przypadku strict jest niezdefiniowana, ponieważ nic nie zostało do niej "przypisane".

const person = {
    name: 'Oscar Wilde',
    print() {
        console.log(this.name);
        function a() {
            console.log(`${a.name}: ${person.name}`);
        }
        a();
    }
}
person.print();

// 2.3. Jakie wartości przyjmuje this w powyższych przypadkach i dlaczego? W pierwszym przypadku przyjmuje imię Oscar Wilde, ponieważ została do niej przypisana wartość .name z obiektu person (w którym znajduje się this),
//a w dtugim przypadku zwraca wartość globalną, bo nie ma nic przypisane i nie jest używany strict mode
// 2.4. Zmodyfikuj powyższy kod w ten sposób, aby funkcja a wyświetlała w konsoli 'a: Oscar Wilde'. Nie używaj arrow function.

const printName = function() {
    console.log(this.name);
}

const person1 = {
    name: 'Aaron Towels'
}

const person2 = {
    name: 'Tom Clancy'
}

printName.call(person1)
printName.call(person2)

// 2.5. Za pomocą funkcji printName wypisz 'name' obu autorów. Nie zmieniaj implementacji funkcji printName!


const person3 = {
    name: 'Arthur Conan Doyle',
    print() {
        const a = () => {
            console.log(this);
        };
        a();
    }
}
person3.print();

// 2.6. Co wydrukuje w konsoli powyższy kod? Jaki scope ma arrow function? Wydrukuje cały obiekt person3 = {name: , print: }. Arrow function przyjmuje parent scope, co w tym przypadku oznacza, że this jest taki sam
//jak w princie: globalny

// ========================================
// ZADANIE 3
// ========================================

// Powróćmy do zadania 1. 
// Dlaczego nasza funkcja BookCreator nie jest najlepszym rozwiązaniem do tworzenia obiektów?

// Zmodyfikuj funkcję BookCreator tak, aby inicjalizowała pola author i title. 
// Funkcję print zadeklaruj jako wspólną dla wszystkich obiektów tworzonych przez BookCreator.
// Dopisz do tworzonych obiektów pole readers, które będzie zawierało liczbę czytelników.
// Zadeklaruj funkcję addReader, która inkrementuje pole readers. addReader powinna być funkcją wspólną, tak jak print.

function BookCreator1(title = "-", author = "-") {
        this.title = title,
        this.author = author,
        this.readers = 0,
        BookCreator1.prototype.print = function () { console.log(this) };
        BookCreator1.prototype.addReader = function () { this.readers += 1 };
}

const book5 = new BookCreator1('Cień wiatru', 'Carlos Ruiz Zafon');
const book6 = new BookCreator1('Ojciech Chrzestny', 'Mario Puzo');

book5.addReader();
book5.addReader();
book6.addReader();
book5.print();
book6.print();


// ========================================
// ZADANIE 4*
// ========================================

// Na stworzonym obiekcie wywołaj funkcję hasOwnProperty('isBestseller'). 
console.log(Object.prototype.hasOwnProperty.call(book5, 'isBestseller'))
// ========================================
// Napisz dlaczego nasz obiekt ma do niej dostęp. (jeśli wyskakuje błąd - powróć do poprzedniego zadania)


// ========================================
// ZADANIE 5*
// ========================================

// Odwołaj się do zmiennej __proto__ w stworzonym obiekcie, co zawiera ta zmienna i do czego służy?