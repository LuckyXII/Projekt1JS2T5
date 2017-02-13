/*jshint esnext: true, moz: true*/
/*jslint browser:true */

/*********************************** USE THIS FILE TO TEST CODE ***********************************/

//Import database
var imported = document.createElement("script");
imported.scr = "userDatabase.js";
document.head.appendChild(imported);

//===========================================================================
//Globals

var users = userDatabase.users;

//===========================================================================
//Main




//===========================================================================
//Callbacks



//===========================================================================
//Functions

function loadAllDatabaseItems(){
    let key;
    for(let i = 0; i < localStorage.length; i++){
        key = localStorage.key(i);
        users.push(JSON.parse(localStorage.getItem(key)));
    }
}



//==========================================================================
//Constructors

