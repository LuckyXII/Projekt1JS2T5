/*jshint esnext: true, moz: true*/
/*jslint browser:true */

//Import database
var imported = document.createElement("script");
imported.scr = "userDatabase.js";
document.head.appendChild(imported);

//===========================================================================
//Globals

var inputMail = document.getElementById("inputEmail");
var inputPassword = document.getElementById("inputPassword");
var login = document.getElementById("login");
var users = userDatabase.users;



//===========================================================================
//Main

console.log(localStorage);

//===========================================================================
//Callbacks

//Login user on click
login.addEventListener("click", loginAuthenticatedUser);

//===========================================================================
//Functions


//Log in authenticated user
function loginAuthenticatedUser(){
    
    users.push(JSON.parse(localStorage.getItem(inputMail.value)));
    
    console.log("pressed");
    let userName = inputMail.value;
    let password = inputPassword.value;
    
    for(let i = 0; i < users.length; i++){
        
        if((users[i].email == userName || users[i].username == userName) &&
           users[i].password == password){
            
            console.log("sucessful login");
        }
    }
}


//==========================================================================
//Constructors

