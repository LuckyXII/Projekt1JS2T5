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
var userScore = compareProfiles();
var profile = document.getElementById("profilePic");

//=====================================================================
//main

logout.addEventListener("click", logoutUser);
getProfileOnClick(profile);
bestMatch();
	
	
//======================================================================
//Callbacks



//=====================================================================
//functions

function bestMatch(){
    let bestMatches =[];
    
    for(let i = 0; i < userScore.length; i++){
        if(userDatabase.users[i].compatible === true){
            bestMatches.push({"username":userDatabase.users[i].username, "score":userScore[i]});
        }
    }
    bestMatches.sort((x,y)=>{
        return y.score - x.score;
    });
    userDatabase.logedIn.bestMatch = bestMatches;
    localStorage.setItem("logedIn", JSON.stringify(userDatabase.logedIn));
}


function compareProfiles(){
    addUsersToDatabase();
    let logedIn = JSON.parse(localStorage.getItem("logedIn"));
    let logedInIsCompatible = false;
    let userIsCompatible = false;
    
    //Fill array with 0 per user
    let counter = new Array(userDatabase.users.length).fill(0);
    
    
    for(let i = 0; i < users.length; i++){
        //district match
        if(users[i].district == logedIn.prefDistrict){
            counter[i]++;
        }
        //Gender match
        logedIn.lookingFor.sort();
        users[i].lookingFor.sort();
        for(let j = 0; j < logedIn.lookingFor.length; j++){
            if(users[i].sex == logedIn.lookingFor[j]){
                counter[i]++;
                logedInIsCompatible = true;
            } 
        }
        for(let j = 0; j < users[i].lookingFor.length; j++){
            if(logedIn.sex == users[i].lookingFor[j]){
                counter[i]++;
                userIsCompatible = true;
            }
        }
        if(userIsCompatible === true && logedInIsCompatible === true){
            users[i].compatible = true;
        }
        else{
            users[i].compatible = false;
        }
        //haircolor match
        if(users[i].hairColor == logedIn.prefHairColor){
            counter[i]++;
        }
        //eye color match
        if(users[i].eyeColor == logedIn.prefEyeColor){
            counter[i]++;
        }
        //bodytype match
        if(users[i].bodyType == logedIn.prefBody){
            counter[i]++;
        }
        //smoker match
        if(users[i].smoker == logedIn.prefSmoker){
            counter[i]++;
        }
        //animals match
        if(users[i].hasAnimals == logedIn.prefAnimals){
            counter[i]++;
        }
        //vegetarian match
        if(users[i].vegetarian == logedIn.prefVegetarian){
            counter[i]++;
        }
        //employed match
        if(users[i].employed == logedIn.prefEmployed){
            counter[i]++;
        }
        // kids match
        if(users[i].hasKids == logedIn.prefHasKids){
            counter[i]++;
        }
        //interest match
        for(let y = 0; y < users[i].interests.length; y++){
            for(let j = 0; j < logedIn.interests.length; j++){
                if(users[i].interests[y] == logedIn.interests[j]){
                    counter[i]++;
                }    
            }
        }
        //height matches
        if(users[i].height > logedIn.prefMinHeight && users[i].height < logedIn.prefMaxHeight){
            counter[i]++;
        }
        console.log(`${users[i].username}: ${counter[i]} \n is compatible: ${users[i].compatible}`); 
        //reset compatibillity
        userIsCompatible = false;
        logedInIsCompatible = false;
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