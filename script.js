/*jshint esnext: true, moz: true*/
/*jslint browser:true */


//**********************************************************************
// experimental comunication with prototype-database server


//adresses
// userProfileDatabase.dat -> https://luckyxii.github.io/Projekt1JS2T5/profileTextDatabase.dat


var req = new XMLHttpRequest();


req.onreadystatechange = function(){
    
    if(req.readyState === 4){
        console.log("state 4");
        console.log(req.responseText); //when done print database
    }
    
};

req.open("get", "https://luckyxii.github.io/Projekt1JS2T5/profileTextDatabase.dat");
req.send();




//***********************************************************************
//experimental private user info

function Con(name, age, password, username){
    this.age = age;
    this.name = name;
    var pass = password; //private property
    var usr = username; //private property
    
    this.getpass = function(){
        return pass;
    };
}


let testObj = new Con("johan", 24, "a123", "luckyxii");

console.log(testObj); // print object
console.log("password1: " + testObj.pass); //try print pass
console.log("password2: " + testObj.getpass()); // print password


//check pasword
if(testObj.getpass() === "a123"){
    console.log("password is correct");
}