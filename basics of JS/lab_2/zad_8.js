function check_string(str){
    if (typeof str === 'string'){
        console.log("Jest to string")
        if (str == "" || str == ''){
            console.log("Jest to pusty string")
        }
        else {
            console.log("Jest to niepusty string")
        };
    }
    else {
      console.log("To nie jest string")      
    };
};

check_string(4);