/*jshint esnext: true, moz: true*/
/*jslint browser:true */

//Import database
var imported = document.createElement("script");
imported.scr = "userDatabase.js";
document.head.appendChild(imported);

//===========================================================================
//Globals

var login = document.getElementById("login");
var logedin = userDatabase.logedin;



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
        logedin = (JSON.parse(localStorage.getItem(userName)));
    }
    
    for(let i = 0; i < logedin.length; i++){
        
        if((logedin.email == userName || logedin.username == userName) &&
           logedin.password == password){
            localStorage.setItem("logedIn",localStorage.getItem(JASON.stringify(logedin)));
			localStorage.removeItem(username);
            console.log("sucessful login");
            alert("sucessful login!");
        }
    }
}


//==========================================================================
//Constructors

