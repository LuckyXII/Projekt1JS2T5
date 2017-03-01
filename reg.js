/*jshint esnext: true, moz: true*/
/*jslint browser:true */


//Import database
var imported = document.createElement("script");
imported.scr = "userDatabase.js";
document.head.appendChild(imported);

//==================================================================================
//GLOBALS

var currentYear = new Date().getFullYear();
var selectedYear = document.getElementById("regYear");
var selectedMonth = document.getElementById("regMonth");
var selectedDay = document.getElementById("regDay");
var confirmEmail = document.getElementById("regmailconfirm").value;
var email = document.getElementById("regmail").value;
var addToDB = false;

//==========================================================================
//functions

//add user to database
function newUserToDatabase(){

    let username = document.getElementById("regUser").value;
    let password = document.getElementById("regPassword").value;
    let email = document.getElementById("regmail").value;
    let firstName = document.getElementById("regFirstName").value;
    let lastName = null;
    let adress = null;
    let district = document.getElementById("regStadsdel").value;
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
    var profilePic = document.getElementById("regPicLink").value;

    let newUser = new UserObject(username,password,email,birthday,gender,lookingFor,
                                 firstName,lastName,adress,district,profilePic,height,
                                 hairColor,eyeColor,bodyType, interests, aboutSelf, aboutMatch,
                                 null,null,null,null,null,null,null,null,null,null,null,null,null,
                                 null,null);

    localStorage.setItem(email,JSON.stringify(newUser));
    console.log("User added to database");
    console.log(newUser);
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
}
//END user object



                                      /*        RIKARD  \/      */

//Snabbfunktion för skapa element
function $$(str){
    return document.createElement(str);
}
//Snabbfunktion för hämta element
function $(str) {
  if (document.querySelectorAll(str).length <= 1) {
    return document.querySelector(str);
  }
  else {
        return document.querySelectorAll(str);
  }
}
function addInterestsToDocument(){
    let addTo = $("#regInterestBoxes");
    let interestList = ["Musik", "Litteratur", "Resa", "Film/TV", "Matlagning", "Party",
                      "Vin & Dryck", "Korsord", "Restaurang", "Trädgård", "Hälsa",
                      "Bakning", "Bilar", "Datorer", "New Age", "Städa", "PornHub",
                      "Välta Kossor", "Stoppa elakingar från välta kossor", "Övrigt"];

  interestList.forEach(e =>{
    let div = $$("div");
    div.style.marginRight = "30px";
    div.style.float ="left";
    let box = $$("input");
    box.type = "checkbox";
    box.name = "regInterests";
    box.value = e;
    box.id = e;
    let label = $$("label");
    label.htmlFor = document.getElementById(e);
    label.appendChild(document.createTextNode(e));
    div.appendChild(box);
    div.appendChild(label);
    addTo.appendChild(div);
  });
}

function hidePagesAtStart(){
  let pages = [$("#reg2"),$("#reg3"),$("#reg4"),$("#regControlPanel")];
  pages.forEach(e=>{
    e.style.display = "none";
  });
}

function confirmButtonsActions(){
  $("#reg1Confirm").addEventListener("click", function(){
    if ($("#regUser").value == "admin") {
      console.log("You are my master");
      $("#reg2").style.display = "block";
      $("#reg3").style.display = "block";
      $("#reg4").style.display = "block";
      $("#regControlPanel").style.display = "block";
      $("#reg1Confirm").style.display = "none";
      $("#reg2Confirm").style.display = "none";
      $("#reg3Confirm").style.display = "none";
      $("#reg2Previous").style.display = "none";
      $("#reg3Previous").style.display = "none";
      $("#reg4Previous").style.display = "none";
      $(".regInfo").style.display = "none";
      let headers = $("h1");
      headers.forEach(e=>{
        e.style.display = "none";
      });
    }
    else{
      $("#reg2").style.display = "block";
      $("#reg1").style.display = "none";
    }
  });
  $("#reg2Confirm").addEventListener("click", function(){
    $("#reg3").style.display = "block";
    $("#reg2").style.display = "none";
  });
  $("#reg3Confirm").addEventListener("click", function(){
    $("#reg4").style.display = "block";
    $("#reg3").style.display = "none";
  });
  $("#reg2Previous").addEventListener("click", function() {
    $("#reg1").style.display = "block";
    $("#reg2").style.display = "none";
  });
  $("#reg3Previous").addEventListener("click", function() {
    $("#reg2").style.display = "block";
    $("#reg3").style.display = "none";
  });
  $("#reg4Previous").addEventListener("click", function() {
    $("#reg3").style.display = "block";
    $("#reg4").style.display = "none";
  });
}

// API Knapp
function createRandomUser(){
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(event) {
    console.log("readyState:" + xhr.readyState);
    console.log("status:" + xhr.status);
    if( xhr.readyState == 4 ) {
      let xhrObject = JSON.parse(xhr.responseText).results[0];
      console.log(xhrObject);
      let updateValues = function(id, value) {
        document.getElementById(id).value = value;
        document.getElementById(id).innerHTML = value;
      };
      updateValues("regUser", xhrObject.login.username);
      updateValues("regPassword", xhrObject.login.password);
      updateValues("regmail", xhrObject.email);
      updateValues("regmailconfirm", xhrObject.email);
      updateValues("regPicLink", xhrObject.picture.large);
      updateValues("regFirstName", xhrObject.name.first);
      updateValues("regStadsdel", xhrObject.location.city);
      $("#regYear").selectedIndex = getRandomInt(18, 80);
      $("#regMonth").selectedIndex = getRandomInt(1, 12);
      $("#regDay").selectedIndex = getRandomInt(1, 31);
      updateValues("regHeight", getRandomInt(155, 200));
      $("#hairColor").selectedIndex = getRandomInt(1, 7);
      $("#bodytype").selectedIndex = getRandomInt(1, 4);
      $("#eyeColor").selectedIndex = getRandomInt(1, 5);
      let sex = getRandomInt(1, 4);
      document.getElementsByName("gender")[sex].checked = true;
      document.getElementsByName("matchgender")[sex].checked = true;
      changePreviewPic();
      if (addToDB === true) {
        newUserToDatabase();
      }
    }
  };
  xhr.open('GET', 'https://randomuser.me/api/');
  xhr.send();
}

function getRandomInt(min, max) {  // returnerar ett random heltal mellan min och max
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener("DOMContentLoaded", function() {
  createOptionsBirthdate();
  $("#reg4Confirm").addEventListener("click", newUserToDatabase);
  addInterestsToDocument();
  hidePagesAtStart();
  confirmButtonsActions();
  $("#api").addEventListener("click", function(){
    addToDB = false;
    createRandomUser();
  });
  $("#addRandomUsers").addEventListener("click", function(){
    addToDB = true;
    let nr = Number($("#numberNewUsers").value);
    if (Number.isInteger(nr) === true){
      nr = Math.min(50, nr);
      for (let i=0;i<nr;i++){
        createRandomUser();
      }
    }
  });
  $("#regUploadPic").addEventListener("click", changePreviewPic);
});

function eventCal(){
  let xh = new XMLHttpRequest();
  xh.onreadystatechange = function(event) {
    console.log("readyState:" + xh.readyState);
    console.log("status:" + xh.status);
    if( xh.readyState == 4 ) {
      let xhObject = JSON.parse(xh.responseText);
      console.log(xhObject);
    }
  };
  xh.open('GET', 'http://esb.goteborg.se/TEIK/001/Kalendarie/?startDate=2017-02-01&type=category&searchstring=Kultur&date=month');
  xh.send();
}

function changePreviewPic() {
  let imglink = $("#regPicLink").value;
    console.log($("#regProfilePic"));
    console.log(imglink);
  $("#regProfilePic").innerHTML = '<img src="'+imglink+ '" style="height: 150px; width: 150px;">';
  console.log($("#regProfilePic"));

}
