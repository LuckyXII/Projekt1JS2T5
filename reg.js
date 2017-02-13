/*jshint esnext: true, moz: true*/
/*jslint browser:true */


//Import database
var imported = document.createElement("script");
imported.scr = "userDatabase.js";
document.head.appendChild(imported);

//==================================================================================
//GLOBALS

var regConfirm = document.getElementsByClassName("regConfirm");
var currentYear = new Date().getFullYear();
var selectedYear = document.getElementById("regYear");
var selectedMonth = document.getElementById("regMonth");
var selectedDay = document.getElementById("regDay");


var username = document.getElementsByClassName("regInput")[0].value;
var password = document.getElementsByClassName("regInput")[1].value;
var email = document.getElementsByClassName("regInput")[2].value;
var confirmEmail = document.getElementsByClassName("regInput")[3].value;
var firstName = document.getElementsByName("firstName")[0].value;
var lastName = document.getElementsByName("lastName")[0].value;
var adress = document.getElementsByName("adress")[0].value;
var district = document.getElementsByName("stadsdel")[0].value;
var height = document.getElementById("regHeight").value;
var gender = selectedSex();
var lookingFor = checkboxSelected(document.getElementsByName("matchgender"));
var profilePic
var birthday = ""; 
var hairColor = getSelectOptionValue(document.getElementById("hairColor"));
var bodyType = getSelectOptionValue(document.getElementById("bodytype"));
var eyeColor = getSelectOptionValue(document.getElementById("eyeColor"));
var interests = checkboxSelected(document.getElementsByName("regInterests"));
var aboutSelf = document.getElementById("regTextAboutSelf").value;
var aboutMatch = document.getElementById("regTextAboutMatch");



//==================================================================================
//main

//manual user remove once registration is completed
var newUser = new UserObject("luckyxii", "a123", "fakemail@dumpTrump.com",
                        1992-09-04, "male", ["female"],"johan", "magnusson", "fakerStreet", "fakerWard",
                        "https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/14232971_10207465694944968_1889056014685634462_n.jpg?oh=ea3f2fa7e1a410f7a26387cd821d5ae4&oe=5942D6A3",
                        178, "brown", "hazel", false, false, false, false, false, ["stuff", "other stuff"], "is_l33t", "has to be_l33t", "blue", "fakerWard", 
                        175, 160, "blond", false, true, false, true, false );
//localStorage.setItem("luckyxii", JSON.stringify(newUser));



//==========================================================================
//Callbacks

/*************TO DO*********
- Validate fields(check for proper format, no-empty fields etc): keyup event (add green symbol once 
            validated and un-disable "next")
*/

regConfirm[0].addEventListener("click", createOptionsBirthdate);
regConfirm[1].addEventListener("click", setBirthday);

//==========================================================================
//functions

//add user to database
function pushToDatabase(){
    
}

//push values to constructor
function createUser(){
    
}

//option element attribute value
function getSelectOptionValue(attr){
    
    for(let i = 0; i < attr.length; i++){
    
        if(attr.children[i].selected === true){
            return attr.children[i].textContent;
        }
    }
}

//value of checkboxes Selected
function checkboxSelected(inputID){
    
    let outputArray = [];
    
    for(let i = 0; i < inputID.length; i++){
        
        if(inputID[i].checked === true){
            outputArray.push(inputID[i].value);
        }
    }
    return outputArray;
}

//setBirthdate
function setBirthday(){
    
    /* saved incase buggs
    for(let i = 0; i < selectedMonth.length; i++){
        if(selectedMonth.children[i].selected === true){
            month = selectedMonth.children[i].textContent;
        }
    }
    */
    
   
    let bday;
    let year = 0;
    let month = 0;
    let day = 0;
    
    // Vore det bättra att omvandla till en statik array och filtrera selected
    // med filter?
    year = getSelectOptionValue(selectedYear);
    month = getSelectOptionValue(selectedMonth);
    day = getSelectOptionValue(selectedDay);
    
    //format string
    if(day < 10){
        day = "0"+day;
    }
    if(month < 10){
        month = "0"+month;
    }  
    bday = year + "-" + month + "-" + day;
    //save to global var
    birthday = bday;
} 


//Gender selected
function selectedSex(){
    
    let sex = document.getElementsByName("gender");
    
    for(let i = 0; i < sex.length; i++){
        
        if(sex[i].checked === true){
            return sex[i].value;
        }
    }
}

//Validate User
function validateUser(username){
    
    //User already registered
    if(localStorage.getItem(username)){
        console.log("taken");
        return false;
    }
    else
        return true;
    
}

//Validate email
function validateEmail(){
    
    //confirm mail matches
    if(email != confirmEmail){
        console.log("E-mail do not match");
        return false;
    }
    
    //mailformat is correct
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return true;
    }
    else{
        console.log("You have entered an invalid email address!");
        return false;
    }
}


//Snabbfunktion för skapa element
function $$(str){
    return document.createElement(str);
}


//create option elements for year / month / day
function createOptionsBirthdate(){
    
    //let option = $$("option"); - only works once with appendchild
    
    //create options year
    for(let i = 0; i < 100; i++){
        selectedYear.appendChild(document.createElement("option"));
        selectedYear.children[i].value = currentYear-i;
        selectedYear.children[i].textContent = selectedYear.children[i].value;
    }
    //create options month
    for(let i = 0; i < 12; i++){
        selectedMonth.appendChild(document.createElement("option"));
        selectedMonth.children[i].value = 12-i;
        selectedMonth.children[i].textContent = selectedMonth.children[i].value;
    }
    //create options day
    for(let i = 0; i < 31; i++){
        selectedDay.appendChild(document.createElement("option"));
        selectedDay.children[i].value = 31-i;
         selectedDay.children[i].textContent =  selectedDay.children[i].value;
    }
   
}


function addInterestsToDocument(){
    let addTo = $("#regInterestBoxes");
    let interestList = ["Musik", "Litteratur", "Resa", "Film", "Matlagning", "TV",
                      "Vin & Dryck", "Korsord", "Restaurang", "Trädgård", "Hälsa",
                      "Bakning", "Bilar", "Datorer", "New Age", "Städa", "PornHub",
                      "Välta Kossor", "Stoppa elakingar från välta kossor", "Övrigt"];
  
  interestList.forEach(e=>{
    let box = $$("input");
    box.type = "checkbox";
    box.name = "regInterests";
    box.value = e;
    box.id = e;
    let label = $$("label");
    label.htmlFor = document.getElementById(e);
    label.appendChild(document.createTextNode(e));
    addTo.appendChild(box);
    addTo.appendChild(label);
  });
}

function $(str) {
  if (document.querySelectorAll(str).length <= 1) {
    return document.querySelector(str);
  }
  else {
        return document.querySelectorAll(str);
  }
}

function hidePagesAtStart(){
  let pages = [$("#reg2"),$("#reg3"),$("#reg4")];
  console.log(pages);
  pages.forEach(e=>{
    e.style.display = "none";
  });
}

function confirmButtonsActions(){
  console.log($("#reg1Confirm"));
  $("#reg1Confirm").addEventListener("click", function(){
    $("#reg2").style.display = "block";
    $("#reg1").style.display = "none";
  });
  $("#reg2Confirm").addEventListener("click", function(){
    $("#reg3").style.display = "block";
    $("#reg2").style.display = "none";
  });
  $("#reg3Confirm").addEventListener("click", function(){
    console.log($("#reg4"));
    $("#reg4").style.display = "block";
    $("#reg3").style.display = "none";
  });
}

document.addEventListener("DOMContentLoaded", function(event) {
  addInterestsToDocument();
  hidePagesAtStart();
  confirmButtonsActions();
});


//==========================================================================
//Constructors

// User Objects
//---------------------------------------------
function UserObject(_username, _password, _email, _birthday, sex, lookingFor,
                    firstName, lastName, _adress, district, profilePic, height,
                    hairColor, eyeColor,bodyType, smoker, hasAnimals, vegetarian,
                    employed, hasKids, interests, aboutSelf, aboutMatch,
                    prefEyeColor, prefDistrict, prefMaxHeight, prefMinHeight, prefHairColor,
                    prefSmoker, prefAnimals, prefVegetarian, prefEmployed, prefHasKids) {

//---------------------------
// private 
    //.........
//-----------------------------
//public
    this.username = _username; //String
    this.password = _password; //String
    this.email = _email; //String
    this.adress = _adress; //String
    this.birthday = _birthday; //string
    
    this.sex = sex; //String
    this.lookingFor = lookingFor; //Array
    this.firstName = firstName; //String
    this.lastName = lastName; //string
    this.district = district; // string
    this.profilePic = profilePic; //String, href-link
    this.height = height; //num
    this.hairColor = hairColor; //String
    this.eyeColor = eyeColor; //String
    this.bodyType = bodyType; //string
    this.smoker = smoker; //bool
    this.hasAnimals = hasAnimals; //bool
    this.vegetarian = vegetarian; //bool
    this.employed = employed; //bool
    this.hasKids = hasKids; //bool
    this.interests = interests; //Array
    this.aboutSelf = aboutSelf; //String
    this.aboutMatch = aboutMatch; //String
    
    //Preferences
    this.prefEyeColor = prefEyeColor; //string
    this.prefDistrict = prefDistrict; //string
    this.prefMaxHeight = prefMaxHeight; //num
    this.prefMinHeight = prefMinHeight; //num
    this.prefHairColor = prefHairColor; //string
    this.prefSmoker = prefSmoker; //bool
    this.prefAnimals = prefAnimals; //bool
    this.prefVegetarian = prefVegetarian; //bool
    this.prefEmployed = prefEmployed; //bool
    this.prefHasKids = prefHasKids; //bool
    
//-----------------------------
//methods
    /*
    //date object
    this.getBirthday = function() {
        return birthday;
    };
    //get username
    this.getUserName = function(){
        return username;    
    };
    //get password
    this.getPassword = function(){
        return password;    
    };
    //get email
    this.getEmail = function(){
        return email;    
    };  
    //get adress
    this.getAdress = function(){
        return adress;
    };
    */
}
//END user object

