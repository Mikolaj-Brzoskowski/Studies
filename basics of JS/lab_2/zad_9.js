function greetings(arg) {
    if (typeof arg === 'string') {
        if (arg == "" || arg == '') {
            console.log("Hello World!");
        }
        else {
            console.log("Hello " + arg);
        };
    }
    else {
        console.log("Hello World!");
    };
};

greetings("Mikołaj");