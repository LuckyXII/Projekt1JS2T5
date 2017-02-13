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
var confirmEmail = document.getElementsByClassName("regInput")[3].value;
var email = document.getElementsByClassName("regInput")[2].value;





//==================================================================================
//main

/* LOOP THROUGH LOCALSTORAGE USING KEY()
var key;
for(let i = 0; i < localStorage.length; i++){
    key = localStorage.key(i);
    console.log(localStorage.getItem(key));
    
}
*/

//==========================================================================
//Callbacks

/*************TO DO*********
- Validate fields(check for proper format, no-empty fields etc): keyup event (add green symbol once 
            validated and un-disable "next")
        
    OBS Validate mail and user ready but not assigned to an event
*/

regConfirm[0].addEventListener("click", createOptionsBirthdate);
regConfirm[1].addEventListener("click", setBirthday);
regConfirm[3].addEventListener("click", newUserToDatabase);

//==========================================================================
//functions

//add user to database
function newUserToDatabase(){
    
    let username = document.getElementsByClassName("regInput")[0].value;
    let password = document.getElementsByClassName("regInput")[1].value;
    let email = document.getElementsByClassName("regInput")[2].value;
   
    let firstName = document.getElementsByName("firstName")[0].value;
    let lastName = document.getElementsByName("lastName")[0].value;
    let adress = document.getElementsByName("adress")[0].value;
    let district = document.getElementsByName("stadsdel")[0].value;
    let height = document.getElementById("regHeight").value;
    let gender = selectedSex();
    let lookingFor = checkboxSelected(document.getElementsByName("matchgender"));
    let birthday = setBirthday();
    let hairColor = getSelectOptionValue(document.getElementById("hairColor"));
    let bodyType = getSelectOptionValue(document.getElementById("bodytype"));
    let eyeColor = getSelectOptionValue(document.getElementById("eyeColor"));
    let interests = checkboxSelected(document.getElementsByName("regInterests"));
    let aboutSelf = document.getElementById("regTextAboutSelf").value;
    let aboutMatch = document.getElementById("regTextAboutMatch").value;
    //CHANGE THIS 
    var profilePic = "https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/14232971_10207465694944968_1889056014685634462_n.jpg?oh=ea3f2fa7e1a410f7a26387cd821d5ae4&oe=5942D6A3";


    
    let newUser = new UserObject(username,password,email,birthday,gender,lookingFor,
                                 firstName,lastName,adress,district,profilePic,height,
                                 hairColor,eyeColor,bodyType, interests, aboutSelf, aboutMatch,
                                 null,null,null,null,null,null,null,null,null,null,null,null,null,
                                 null,null);
    
   
    
    localStorage.setItem(email,JSON.stringify(newUser));
    console.log("User added to database");
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
    return bday;
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
    else{
        return true;
    }
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
        selectedMonth.children[i].value = 1+i;
        selectedMonth.children[i].textContent = selectedMonth.children[i].value;
    }
    //create options day
    for(let i = 0; i < 31; i++){
        selectedDay.appendChild(document.createElement("option"));
        selectedDay.children[i].value = 1+i;
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

document.addEventListener("DOMContentLoaded", function() {
  addInterestsToDocument();
  hidePagesAtStart();
  confirmButtonsActions();
});


//==========================================================================
//Constructors

// User Objects
//---------------------------------------------
function UserObject(_username, _password, _email, _birthday, _sex, _lookingFor,
                    _firstName, _lastName, _adress, _district, _profilePic, _height,
                    _hairColor, _eyeColor,_bodyType,_interests, _aboutSelf, _aboutMatch, 
                    _hasAnimals, _vegetarian, _employed, _hasKids, _smoker, _prefEyeColor, 
                    _prefDistrict, _prefMaxHeight, _prefMinHeight, _prefHairColor,
                    _prefSmoker, _prefAnimals, _prefVegetarian, _prefEmployed, _prefHasKids) {

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
    
    this.sex = _sex; //String
    this.lookingFor = _lookingFor; //Array
    this.firstName = _firstName; //String
    this.lastName = _lastName; //string
    this.district = _district; // string
    this.profilePic = _profilePic; //String, href-link
    this.height = _height; //num
    this.hairColor = _hairColor; //String
    this.eyeColor = _eyeColor; //String
    this.bodyType = _bodyType; //string
    this.smoker = _smoker; //bool
    this.hasAnimals = _hasAnimals; //bool
    this.vegetarian = _vegetarian; //bool
    this.employed = _employed; //bool
    this.hasKids = _hasKids; //bool
    this.interests = _interests; //Array
    this.aboutSelf = _aboutSelf; //String
    this.aboutMatch = _aboutMatch; //String
    
    //Preferences
    this.prefEyeColor = _prefEyeColor; //string
    this.prefDistrict = _prefDistrict; //string
    this.prefMaxHeight = _prefMaxHeight; //num
    this.prefMinHeight = _prefMinHeight; //num
    this.prefHairColor = _prefHairColor; //string
    this.prefSmoker = _prefSmoker; //bool
    this.prefAnimals = _prefAnimals; //bool
    this.prefVegetarian = _prefVegetarian; //bool
    this.prefEmployed = _prefEmployed; //bool
    this.prefHasKids = _prefHasKids; //bool
    
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

