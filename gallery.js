/*jshint esnext: true, moz: true*/
/*jslint browser:true */

//Import database
var imported = document.createElement("script");
imported.src = "userDatabase.js";
document.head.appendChild(imported);

//======================================================================
//Globals
var flexContainer = getID("flexContainer");



//====================================================================
//main

createGallery();

//=================================================================
//callbacks

//===================================================================
//functions

function createGallery(){
    addUsersToDatabase();
    let profile;
    let profileInfo;
    
    for(let i = 0; i < userDatabase.users.length; i++){
        flexContainer.appendChild(document.createElement("div"));
        flexContainer.children[i].className="profile";
        
        profile = document.getElementsByClassName("profile");
        profile[i].appendChild(document.createElement("img"));
        profile[i].appendChild(document.createElement("div"));
        profile[i].children[0].src="https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/14232971_10207465694944968_1889056014685634462_n.jpg?oh=ea3f2fa7e1a410f7a26387cd821d5ae4&oe=5942D6A3";
        profile[i].children[1].className = "profileInfo";
        profile[i].children[1].appendChild(document.createElement("h3"));
        profile[i].children[1].appendChild(document.createElement("h4"));
        
        profileInfo = profile[i].children[1];
        profileInfo.children[0].textContent = "Namn";
        profileInfo.children[1].textContent = "ålder";
        
    }
}