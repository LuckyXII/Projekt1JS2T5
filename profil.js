/*jshint esnext: true, moz: true*/
/*jslint browser:true */


//=====================================================================
//Global Variables

//Import database
var imported = document.createElement("script");
imported.src = "userDatabase.js";
document.head.appendChild(imported);
var users = userDatabase.users;


var profileName = getID("profileName"),
    fullName = getID("fullName"),
    profileSex = getID("profileSex"),
    profileDistrict = getID("profileDistrict"),
    profileEyeColor = getID("profileEyeColor"),
    profileHeight = getID("profileHeight"),
    profileAge = getID("profileAge"),
    profileInterests = getID("profileInterests"),
    logedIn = userDatabase.logedIn,
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
    username: getID("editUserName").value,
    password: getID("editPassword").value,
    email: getID("editEmail").value,
    confirmEmail: getID("confirmEditEmail").value,
    editFirstname: getID("editFirstname").value,
    editLastname: getID("editLastname").value,
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
    


//=====================================================================
//main

getProfileOnClick(profile);
bestMatch();


//======================================================================
//Callbacks
saveSettings.addEventListener("click", validateUser);



//=====================================================================
//functions

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


/////HIDE SHOW EDIT USER


editUserButton.addEventListener("click", function() {
    editUser.classList.toggle('editUserShow');
    editUser.style.border = "1px solid lightgrey";
});
saveSettings.addEventListener("click", function() {
    editUser.classList.toggle('editUserShow');
    editUser.style.border = "0px solid lightgrey";
});


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

/*"username":"L33tKid",
                "password":"a123",
                "email":"L33tKid@mail.com",
                "adress":"Positivgatan 7",
                "birthday":"1999-01-04",
                "sex":"male",
                "lookingFor":["female","cyborg"],
                "firstName":"Winston",
                "lastName":"Duck",
                "district":"Frölunda",
                "profilePic":"https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/14232971_10207465694944968_1889056014685634462_n.jpg?oh=ea3f2fa7e1a410f7a26387cd821d5ae4&oe=5942D6A3",
                "height":137,
                "hairColor":"Svart",
                "eyeColor":"Bruna",
                "bodyType":"Kramgo",
                "smoker":"True",
                "hasAnimals":"False",
                "vegetarian":"True",
                "employed":"False",
                "hasKids":"False",
                "interests":["Musik","Datorer","New Age","Välta Kossor","PornHub"],
                "aboutSelf":"is l33t",
                "aboutMatch":"Borde va l33t",
                "prefEyeColor":"Gröna",
                "prefDistrict":"Frölunda",
                "prefMaxHeight":200,
                "prefMinHeight":140,
                "prefHairColor":"Röda/Violetta",
                "prefSmoker":"True",
                "prefAnimals":"False",
                "prefVegetarian":"True",
                "prefEmployed":"True",
                "prefHasKids":"True"*/