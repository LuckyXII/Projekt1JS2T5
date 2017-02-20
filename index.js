/*jshint esnext: true, moz: true*/
/*jslint browser:true */

//Import database
var imported = document.createElement("script");
imported.scr = "userDatabase.js";
document.head.appendChild(imported);

//===========================================================================
//Globals

var login = document.getElementById("login");
var logedIn = userDatabase.logedIn;



//===========================================================================
//Main



//===========================================================================
//Callbacks

//Login user on click
login.addEventListener("click", loginAuthenticatedUser);

//===========================================================================
//Functions



//Log in authenticated user
function loginAuthenticatedUser(){

    let userName = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;
    
    if(localStorage.getItem(userName) !== null){
        logedIn = (JSON.parse(localStorage.getItem(userName)));
        console.log(logedIn);
    }
        else{
            console.log("Fugerar inte 2");
        }
    

    if((logedIn.email == userName || logedIn.username == userName) &&
       logedIn.password == password){
        localStorage.setItem("logedIn",JSON.stringify(logedIn));
        localStorage.removeItem(logedIn.email);
        console.log("sucessful login");
        alert("sucessful login!");

    }
    else{
        console.log("Inte rätt");
    }
}


//==========================================================================
//Constructors

