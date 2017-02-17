/*Ska vi ha namn och ett fullständigt namn? Kanske en användarnamn?*/



/*jshint esnext: true, moz: true*/
/*jslint browser:true */


//=====================================================================
//Global Variables

//Import database
var imported = document.createElement("script");
imported.scr = "userDatabase.js";
document.head.appendChild(imported);
var users = userDatabase.users;

var firstName = document.getElementById("firstName");
var profileSex = document.getElementById("profileSex");
var profileDistrict = document.getElementById("profileDistrict");
var profileEyeColor = document.getElementById("profileEyeColor");
var profileHeight = document.getElementById("profileHeight");
var profileAge = document.getElementById("profileAge");
var profileInterests = document.getElementById("profileInterests");
var profileFullname = document.getElementById("profileFullname");
var logedIn = userDatabase.logedIn;
	logedIn = (JSON.parse(localStorage.getItem("logedIn")));
var logout = document.getElementById("logout");
//var profilePic = document.getElementById("profilePic");

//=====================================================================
//main

var counter = compareProfiles();
logout.addEventListener("click", logoutUser());
	
	
//======================================================================
//Callbacks



//=====================================================================
//functions


function compareProfiles(){
    addUsersToDatabase();
    let logedIn = JSON.parse(localStorage.getItem("logedIn"));
    
    //CHANGE LATER
    let counter = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    
    for(let i = 0; i < users.length; i++){
       
        if(users[i].district == logedIn.prefDistrict){
            counter[i]++;
        }
        for(let i = 0; i < logedIn.lookingFor.length; i++){
            
            if(users[i].sex == logedIn.lookingFor[i]){
                counter[i]++;
            }
            
        }
        if(users[i].hairColor == logedIn.prefHairColor){
            counter[i]++;
        }
        if(users[i].eyeColor == logedIn.prefEyeColor){
            counter[i]++;
        }
        if(users[i].bodyType == logedIn.prefBody){
            counter[i]++;
        }
        if(users[i].smoker == logedIn.prefSmoker){
            counter[i]++;
        }
        if(users[i].hasAnimals == logedIn.prefAnimals){
            counter[i]++;
        }
        if(users[i].vegetarian == logedIn.prefVegetarian){
            counter[i]++;
        }
        if(users[i].employed == logedIn.prefEmployed){
            counter[i]++;
        }
        if(users[i].hasKids == logedIn.prefHasKids){
            counter[i]++;
        }
        for(let i = 0; i < users[i].interests.length; i++){
            for(let y = 0; i < logedIn.interests.length; i++){
                if(users[i].interests[i] == logedIn.interests[y]){
                    counter[i]++;
                }    
            }
        }
        if(users[i].height > logedIn.prefMinHeight && users[i].height < logedIn.prefMaxHeight){
            counter[i]++;
        }
     console.log(users[i].username + counter[i]);   
    }
    
     return counter;
}


/*
var peter = new UserObject();
peter.username = "PetER";
peter.firstName = "Peter";
//peter.lastname = "Larsson";
peter.password = "password";
peter.birthDate = 28;
peter.interests = ["Korsord", "Programmering", "Stoppa elakingar från välta kossor"];
//peter.profilePic Avvaktar tills vidare
peter.profileSex = "Man";
peter.district = "Mölndal";
peter.eyeColor = "Peachpuff";
peter.height = "179";*/
firstName.textContent = logedIn.username;
height.textContent = logedIn.height;
eyeColor.textContent = logedIn.eyeColor;
/*Testpersonen Peter Larsson*//*

profileSex.innerHTML = peter.profileSex;
profileDistrict.innerHTML = peter.district;
profileEyeColor.innerHTML = peter.eyeColor;
profileHeight.innerHTML = peter.height + " cm";
profileAge.innerHTML = peter.birthDate + " år gammal";
profileInterests.innerHTML = peter.interests[0] + ", " + peter.interests[1] + ", " + //peter.interests[2];
	*/


/////////////////////

/*
$(document).ready(function() {
    var panels = $('.user-infos');
    var panelsButton = $('.dropdown-user');
    panels.hide();

    //Click dropdown
    panelsButton.click(function() {
        //get data-for attribute
        var dataFor = $(this).attr('data-for');
        var idFor = $(dataFor);

        //current button
        var currentButton = $(this);
        idFor.slideToggle(400, function() {
            //Completed slidetoggle
            if (idFor.is(':visible')) {
                currentButton.html('<i class="glyphicon glyphicon-chevron-up text-muted"></i>');
            } else {
                currentButton.html('<i class="glyphicon glyphicon-chevron-down text-muted"></i>');
            }
        });
    });


    $('[data-toggle="tooltip"]').tooltip();

    $('button').click(function(e) {
        e.preventDefault();
        alert("This is a demo.\n :-)");
    });
});
*/