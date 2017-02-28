/*jshint esnext: true, moz: true*/
/*jslint browser:true */


//=====================================================================
//Global Variables

//Import database
var imported = document.createElement("script");
imported.src = "userDatabase.js";
document.head.appendChild(imported);
var users = userDatabase.users;
userDatabase.currentProfile = JSON.parse(localStorage.getItem("currentProfile"));


var profileName = getID("profileName"),
    fullName = getID("fullName"),
    profileSex = getID("profileSex"),
    profileDistrict = getID("profileDistrict"),
    profileEyeColor = getID("profileEyeColor"),
    profileHeight = getID("profileHeight"),
    profileAge = getID("profileAge"),
    profileInterests = getID("profileInterests"),
    logedIn = userDatabase.currentProfile,
    logedIn = (JSON.parse(localStorage.getItem("logedIn"))),
    logout = getID("logout"),
    profileHeight = getID("profileHeight"),
    dateToday = getID("dateToday"),
    editUser = document.getElementsByClassName("editUser")[0],
    editUserButton = getID("editUserButton"),
    profileMail = getID("profileMail"),
    confirmProfileMail = getID("confirmProfileMail"),
    saveSettings = getID("saveSettings"),
    profilePic = getID("profilePic"),
    userScore = compareProfiles(),
    profile = getID("profilePic"),
    profileHeader = getID("header").hidden = false,
    aboutSelf = getID("aboutSelf"),
    aboutMatch = getID("aboutMatch"),
    saveFriend = getID("saveFriend");
var matchgender = document.getElementsByName("matchgender");
//___________________________________________________________________

var edit = {
    username: getID("editUserName"),
    password: getID("editPassword"),
    email: getID("editEmail"),
    confirmEmail: getID("confirmEditEmail"),
    firstname: getID("editFirstname"),
    lastname: getID("editLastname"),
    birthday: setBirthday(getID("regYear"),getID("regMonth"),getID("regDay")),
    district: getID("editDistrict"),
    adress: getID("editAdress"),
    length: getID("regHeight"),
    haircolor: getSelectOptionValue(getID("hairColor")),
    bodyType: getSelectOptionValue(getID("bodytype")),
    eyeColor: getSelectOptionValue(getID("eyeColor")),
    interest: checkboxSelected(document.getElementsByName("regInterests")),
    aboutSelf: getID("AboutYou"),
    aboutMatch: getID("regTextAboutMatch"),
    profilePic: getID("editInput"),
    
    //-------------------------------------
    //Methods
    getGender: function() {
        let gender = document.getElementsByName("gender");
        for (let i = 0; gender.length; i++) {
            if (gender[i].checked === true) {
                return gender[i].value;
            }
        }
    },
    getPotetialMate: function() {
        let matchgender = document.getElementsByName("matchgender");
        var potentialMate = [];
        for (let i = 0 ; matchgender.length ; i++){
            if (matchgender[i].checked === true){
                potentialMate.push(matchgender[i].value);
            }
        }
        return potentialMate;
    }
};
//end Edit


//=====================================================================
//main
styleHeader();
getProfileOnClick(profile);
bestMatch();



//======================================================================
//Callbacks
saveSettings.addEventListener("click", validateUser(getID("editEmail"),getID("confirmEditEmail")));

/////HIDE SHOW EDIT USER 	
editUserButton.addEventListener("click", function() {
    createOptionsBirthdate(getID("regYear"),getID("regMonth"),getID("regDay"));
    addInterestsToDocument();
    fillOutEditForm();
    editUser.classList.toggle('editUserShow');
    editUser.style.border = "1px solid lightgrey";
     
});
saveSettings.addEventListener("click", function() {
    updateUser();
    editUser.classList.toggle('editUserShow');
    editUser.style.border = "0px solid lightgrey";
});




//=====================================================================
//functions
function styleHeader(){
    let headerBtns = document.getElementsByClassName("nav")[0];
    let btn1 = headerBtns.children[0].firstChild;
    let btn2 = headerBtns.children[1].firstChild;
    let btn3 = headerBtns.children[2].firstChild;
    let btn4 = headerBtns.children[3].firstChild;
    let header = document.getElementById("header");
    header.hidden = false;
  
	btn1.textContent = "Home";
    btn1.href="index.html";
    btn2.style.color = "#FFF";
    btn2.textContent = "Galleri";
    btn2.href="gallery.html";
    btn3.textContent = "Om Oss";
    btn3.href="aboutus.html";
    btn4.textContent = "Min Profil";
	btn4.style.color="#FFF";
    btn4.href="profil.html";
	btn4.style.backgroundColor = "#000";

}

function updateUser(){
    logIn.username = edit.username;
    logIn.password = edit.password;
    logIn.email = edit.email;
    logIn.confirmEmail = edit.confirmEmail;
    logIn.firstName = edit.firstname;
    logIn.lastname = edit.lastname;
    logIn.birthday = edit.birthday;
    logIn.district = edit.district;
    logIn.adress = edit.adress;
    logIn.height = edit.length;
    logIn.hairColor = edit.haircolor;
    logIn.bodyType = edit.bodyType;
    logIn.eyeColor = edit.eyeColor;
    logIn.interest = edit.interest;
    logIn.aboutSelf = edit.aboutSelf;
    logIn.aboutMatch = edit.aboutMatch;
    logIn.profilePic = edit.profilePic;
    
    localStorage.setItem("logedIn", logedIn);
}

function fillOutEditForm(){
    addUsersToDatabase();
   // edit.username.placeholder = logedIn.username;
	edit.username.value = logedIn.username;
	edit.password.value = logedIn.password;
	edit.email.value = logedIn.email;
	edit.confirmEmail.value = logedIn.email;
	edit.firstname.value = logedIn.firstName;
	edit.lastname.value = logedIn.lastName;
	edit.profilePic.value = logedIn.profilePic;
	edit.district.value = logedIn.district;
	edit.adress.value = logedIn.adress;
	edit.length.value = logedIn.height;
	edit.aboutSelf.value = logedIn.aboutSelf;
	edit.aboutMatch.value = logedIn.aboutMatch;
    
    //check gender
    let gender = document.getElementsByName("gender");
    for (let i = 0; i < gender.length; i++) {
        if (logedIn.sex == gender[i].value) {
            gender[i].checked = true;
            break;
        }
    }
    
    //check matched gender
    let matchgender = document.getElementsByName("matchgender");
    checkSelectedCheckbox("lookingFor",matchgender);
    
    //default date values
    let birthdate = convertBirthdate();
    let birthday =[getID("regYear"),getID("regMonth"),getID("regDay")];
    for(let i = 0; i < 2; i++){
        setDefaultDate(birthday[i],i,birthdate);
    }
    
    //default haircolor
    checkSelectedOption(logedIn.hairColor, getID("hairColor"));
    //Default bodyType
    checkSelectedOption(logedIn.bodyType, getID("bodytype"));
    //default eyeColor
    checkSelectedOption(logedIn.eyeColor, getID("eyeColor"));
    //checked interests
    let interest = document.getElementsByName("regInterests");
    checkSelectedCheckbox("interests",interest);
    
}//END fillOutEditForm

//convert birthday to separate dates
function convertBirthdate(){
    let birthday = logedIn.birthday;
    let key = "-";
    let year ="", month="", day="";
    let date = [];
    for(let i = 0; i < birthday.length; i++){
        if(birthday[i] != key && i < 4){
            year += birthday[i];
        }
        else if(birthday[i] != key && i < 7){
            month += birthday[i];
        }
        else if(birthday[i] != key && i > 7){
            day += birthday[i];       
        }
    }
    
    if(month[0] == "0"){
        month = month[1];
    }
    if(day[0] == "0"){
        day = month[1];
    }
    
    date.push(year, month, day);
    return date;
}

// find logedIn's age and set to default value
function setDefaultDate(attr, dateIndex, date){
    
    for(let i = 0; i < attr.length; i++){
        if(attr.children[i].value == date[dateIndex]){
            attr.children[i].selected = "selected";
            break;
        }
    }
}

//find logIn's selected value and set as default
function checkSelectedOption(logedIn, edit){
    for(let i = 0; i < logedIn.length; i++){
        if(logedIn == edit.children[i].value){
            edit.children[i].selected = "selected";
            break;
        }
    }
}
//check logIn's selected boxes and set as default
function checkSelectedCheckbox(attr,elm){
    for(let i = 0; i < elm.length; i++){
        for(let j = 0; j < elm.length; j++){
            if(logedIn[attr][i] == elm[j].value){
                elm[j].checked = true;
            }
        }
    }
}

//best matches
function bestMatch() {
    let bestMatches = [];

    for (let i = 0; i < userScore.length; i++) {
        if (userDatabase.users[i].compatible === true) {
            bestMatches.push({
                "username": userDatabase.users[i].username,
                "score": userScore[i]
            });
        }
    }
    bestMatches.sort((x, y) => {
        return y.score - x.score;
    });
    userDatabase.logedIn.bestMatch = bestMatches;
    localStorage.setItem("logedIn", JSON.stringify(userDatabase.logedIn));
}

//compare profiles for match
function compareProfiles() {
    addUsersToDatabase();
    let logedIn = JSON.parse(localStorage.getItem("logedIn"));
    let logedInIsCompatible = false;
    let userIsCompatible = false;

    //Fill array with 0 per user
    let counter = new Array(userDatabase.users.length).fill(0);


    for (let i = 0; i < users.length; i++) {
        //district match
        if (users[i].district == logedIn.prefDistrict) {
            counter[i]++;
        }
        //Gender match
        logedIn.lookingFor.sort();
        users[i].lookingFor.sort();
        for (let j = 0; j < logedIn.lookingFor.length; j++) {
            if (users[i].sex == logedIn.lookingFor[j]) {
                counter[i]++;
                logedInIsCompatible = true;
            }
        }
        for (let j = 0; j < users[i].lookingFor.length; j++) {
            if (logedIn.sex == users[i].lookingFor[j]) {
                counter[i]++;
                userIsCompatible = true;
            }
        }
        if (userIsCompatible === true && logedInIsCompatible === true) {
            users[i].compatible = true;
        } else {
            users[i].compatible = false;
        }
        //haircolor match
        if (users[i].hairColor == logedIn.prefHairColor) {
            counter[i]++;
        }
        //eye color match
        if (users[i].eyeColor == logedIn.prefEyeColor) {
            counter[i]++;
        }
        //bodytype match
        if (users[i].bodyType == logedIn.prefBody) {
            counter[i]++;
        }
        //smoker match
        if (users[i].smoker == logedIn.prefSmoker) {
            counter[i]++;
        }
        //animals match
        if (users[i].hasAnimals == logedIn.prefAnimals) {
            counter[i]++;
        }
        //vegetarian match
        if (users[i].vegetarian == logedIn.prefVegetarian) {
            counter[i]++;
        }
        //employed match
        if (users[i].employed == logedIn.prefEmployed) {
            counter[i]++;
        }
        // kids match
        if (users[i].hasKids == logedIn.prefHasKids) {
            counter[i]++;
        }
        //interest match
        for (let y = 0; y < users[i].interests.length; y++) {
            for (let j = 0; j < logedIn.interests.length; j++) {
                if (users[i].interests[y] == logedIn.interests[j]) {
                    counter[i]++;
                }
            }
        }
        //height matches
        if (users[i].height > logedIn.prefMinHeight && users[i].height < logedIn.prefMaxHeight) {
            counter[i]++;
        }
        console.log(`${users[i].username}: ${counter[i]} \n is compatible: ${users[i].compatible}`);
        //reset compatibillity
        userIsCompatible = false;
        logedInIsCompatible = false;
    }
    return counter;
}


///Klocka
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
        h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    } // add zero in front of numbers < 10
    return i;
}







///// SAVE FRIENDS
/*
if(userDatabase.currentProfile == userDatabase.logedIn){
    saveFriend.style.hidden=true;
}
saveFriend.addEventListener("click", function() {
    userDatabase.currentProfile = JSON.parse(localStorage.getItem("putin@mail.com"));
    logedIn.friendsList.push(userDatabase.currentProfile.username);
});
*/


///// USER PROFILE PROPERTIES
profileName.textContent = logedIn.username;
fullName.textContent = logedIn.firstName + " " + logedIn.lastName;
profileSex.textContent = logedIn.sex;
profileHeight.textContent = logedIn.height + " cm";
profileEyeColor.textContent = logedIn.eyeColor;
profileDistrict.textContent = logedIn.district;
profileInterests.innerHTML = logedIn.interests[0] + ", " + logedIn.interests[1] + ", " + logedIn.interests[2];
profileAge.innerHTML = getAge(logedIn.birthday);
profilePic.src = logedIn.profilePic;
aboutSelf.innerHTML = logedIn.aboutSelf;
aboutMatch.textContent = logedIn.aboutMatch;

