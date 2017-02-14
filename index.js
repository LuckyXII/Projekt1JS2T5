/*jshint esnext: true, moz: true*/
/*jslint browser:true */

//Import database
var imported = document.createElement("script");
imported.scr = "userDatabase.js";
document.head.appendChild(imported);

//===========================================================================
//Globals

var login = document.getElementById("login");
var users = userDatabase.users;



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
        users.push(JSON.parse(localStorage.getItem(userName)));
    }
    
    for(let i = 0; i < users.length; i++){
        
        if((users[i].email == userName || users[i].username == userName) &&
           users[i].password == password){
            localStorage.setItem("logedIn",localStorage.getItem(userName));
            console.log("sucessful login");
            alert("sucessful login!");
        }
    }
}


//==========================================================================
//Constructors

