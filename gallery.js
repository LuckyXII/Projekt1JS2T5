/*jshint esnext: true, moz: true*/
/*jslint browser:true */

//Import database
var imported = document.createElement("script");
imported.src = "userDatabase.js";
document.head.appendChild(imported);

//======================================================================
//Globals

 


//====================================================================
//main

createGallery();
addUsersToGallery();
styleHeader();
filterOptions();

//=================================================================
//callbacks

//===================================================================
//functions

function addUsersToGallery(){
    addUsersToDatabase();
    localStorage.removeItem("currentProfile");
    
    let galleryProfiles = document.getElementsByClassName('profile');
    let profileInfo = document.getElementsByClassName('GalleryProfileInfo');
    let user;
    let profileChildern;
    
    
    for (let i = 0; i<galleryProfiles.length; i++) {
        profileChildern = profileInfo[i].children;
        user = userDatabase.users[i];
        profileInfo[i].title = user.email;
        profileInfo[i].children[0].title = user.email;
        profileInfo[i].children[0].href = "profil.html";
        profileInfo[i].children[0].style.cursor = "pointer";
        galleryProfiles[i].children[0].src = user.profilePic;
        galleryProfiles[i].children[0].href = "profil.html";
        profileChildern[0].textContent = user.firstName;
        profileChildern[1].textContent = "Ålder: "+getAge(user.birthday);
        }  
    
     goToProfile(profileInfo);
}

function filterOptions(){
    let selectDistrict = getID("selectDistrict");
    let districts = [];
    let age = getID("selectAge");
    let users = userDatabase.users;
    let minAge = Number.MAX_VALUE, maxAge = Number.MIN_VALUE;
    let userAge = 0;
    let foundTwice = false;
    
    //---------------------------------------------
    //district options
    
    //get unique districts
    districts.push(users[0].district);
    for(let i = 1; i < users.length; i++){
        for(let j = 0; j < districts.length; j++){
            if(users[i].district == districts[j]){
               foundTwice = true;
            } 
        }
        if(!foundTwice){
                districts.push(users[i].district);
                
        }
        foundTwice = false;          
    }
    //create options elements per district
    for(let i = 1; i < districts.length; i++){
        selectDistrict.appendChild(newElement("option"));
        selectDistrict.children[i].value = districts[i];
        selectDistrict.children[i].textContent = districts[i];
    }
    
    //--------------------------------------------
    //age options
    
    //find all ages
    for(let i = 0; i < users.length; i++){
        userAge = getAge(users[i].birthday);   
        minAge = userAge < minAge ? userAge : minAge;
        maxAge = userAge > maxAge ? userAge : maxAge;
    }
    
    //create options for ages between smallest - highest
    let ageSpan = maxAge-minAge;
    for(let i = 1, j = minAge; i <= ageSpan; i++, j++){
        age.appendChild(newElement("option"));
        age.children[i].value = "År:"+j;
        age.children[i].textContent = "År: "+j;
        
    }
}

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
    btn2.style.backgroundColor = "#000";
    btn2.style.color = "#FFF";
    btn2.textContent = "Galleri";
    btn2.href="gallery.html";
    btn3.textContent = "Om Oss";
    btn3.href="aboutus.html";
    btn4.textContent = "Min Profil";
    btn4.href="profil.html";
    btn4.title = "logedIn";
    btn4.addEventListener("click", findCurrentProfile);

}

function createGallery(){
    addUsersToDatabase();
    
    let flexContainer = getID("flexContainer");
    let flexRow;
    let profile;
    let profileInfo;
    let galleryLength = userDatabase.users.length < 10 ? userDatabase.users.length : 10;
    
    flexContainer.appendChild(newElement("div"));
    flexContainer.children[0].id = "flexRow";
    
    for(let i = 0; i < galleryLength; i++){
        
        flexRow = getID("flexRow");
        flexRow.appendChild(newElement("div"));
        flexRow.children[i].className="profile";
        
        profile = document.getElementsByClassName("profile");
        profile[i].appendChild(newElement("img"));
        profile[i].appendChild(newElement("div"));
        profile[i].children[0].src="https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/14232971_10207465694944968_1889056014685634462_n.jpg?oh=ea3f2fa7e1a410f7a26387cd821d5ae4&oe=5942D6A3";
        profile[i].children[1].className = "GalleryProfileInfo";
        profile[i].children[1].appendChild(newElement("a"));
        profile[i].children[1].appendChild(newElement("h4"));
        
        profileInfo = profile[i].children[1];
        profileInfo.children[0].textContent = "Namn";
        profileInfo.children[1].textContent = "ålder";
        
    }
}