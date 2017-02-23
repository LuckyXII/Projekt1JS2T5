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
var logInForm = document.getElementsByClassName("login-form")[0];
var logOut;
var backgroundImg = document.getElementById("backgroundImg");



//===========================================================================
//Main
isLogedIn();


//===========================================================================
//Callbacks

//Login user on click
login.addEventListener("click", loginAuthenticatedUser, {once:true});

//===========================================================================
//Functions

function isLogedIn(){
   
    if(localStorage.getItem("logedIn") !== null){
        onLogin();
        logOut = document.getElementById("logOut");
        logOut.addEventListener("click", logoutUser);
    }
    else{
        return false;
    }
}

function onLogin(){
    
    let logedIn = JSON.parse(localStorage.getItem("logedIn"));
    let welcome = `Välkommen ${logedIn.firstName}`;
    let longDiv = document.getElementById("longDiv");
    let centerContent = document.getElementById("centerContent");
    
    //longDiv.hidden = false;
    backgroundImg.style.height = "95vh";
    centerContent.hidden = false;
    logInForm.children[1].hidden = "true";
    logInForm.children[2].hidden = "true";
    logInForm.children[3].id = "logOut";
    logInForm.children[3].textContent = "Logga ut";
    logInForm.children[4].textContent = welcome;
    
}

//Log in authenticated user
function loginAuthenticatedUser(){

    let userName = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;
    
    if(localStorage.getItem(userName) !== null){
        logedIn = (JSON.parse(localStorage.getItem(userName)));
    }
   
    if((logedIn.email == userName || logedIn.username == userName) &&
       logedIn.password == password){
        localStorage.setItem("logedIn",JSON.stringify(logedIn));
        localStorage.removeItem(logedIn.email);
        console.log("sucessful login");
    }
    else if(logInForm.children[3].textContent !== "Logga ut"){
        console.log("login unsucessful");
        alert("Fel användarnamn eller lösenord");
    }
}


//==========================================================================
//Constructors

