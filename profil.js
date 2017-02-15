/*Ska vi ha namn och ett fullständigt namn? Kanske en användarnamn?*/



/*jshint esnext: true, moz: true*/
/*jslint browser:true */


//Import database
var imported = document.createElement("script");
imported.scr = "userDatabase.js";
document.head.appendChild(imported);





var firstName = document.getElementById("firstName");
var profileSex = document.getElementById("profileSex");
var profileDistrict = document.getElementById("profileDistrict");
var profileEyeColor = document.getElementById("profileEyeColor");
var profileHeight = document.getElementById("profileHeight");
var profileAge = document.getElementById("profileAge");
var profileInterests = document.getElementById("profileInterests");
var profileFullname = document.getElementById("profileFullname");

//var profilePic = document.getElementById("profilePic");
/*
function getLogedIn(){
	
}
*/
var logedIn = userDatabase.logedIn;
	logedIn = (JSON.parse(localStorage.getItem("logedIn")));
	
	console.log(logedIn);
//====================================================
//Callbacks
//window.addEventListener("load", getLogedIn);



/*
function UserObject() {
    this.profileSex = null; //String
    this.lookingFor = null; //Array
    this.firstName = null; //String
    this.district = null; // string
    this.profilePic = null; //String, href-link
    this.height = null; //num
    this.hairColor = null; //String
    this.eyeColor = null; //String
    this.bodyType = null; //string
    this.smoker = null; //bool
    this.hasAnimals = null; //bool
    this.vegetarian = null; //bool
    this.employed = null; //bool
    this.hasKids = null; //bool
    this.interests = null; //Array
    this.aboutSelf = null; //String
    this.aboutMatch = null; //String
    this.birthday = null; //string
	this.username = null; //String
	//this.lastname = null; //String
	}
	*/

/*Konstruktor*/

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
firstName.innerHTML = logedIn.username;
height.innerHTML = logedIn.height;
eyeColor.innerHTML = logedIn.eyeColor;
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