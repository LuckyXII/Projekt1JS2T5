/*jshint esnext: true, moz: true*/
/*jslint browser:true */

//Import database
var imported = document.createElement("script");
imported.src = "userDatabase.js";
document.head.appendChild(imported);

//===========================================================================
//Globals

var login = document.getElementById("login");
var logedIn = userDatabase.logedIn;
var logInForm = document.getElementsByClassName("login-form")[0];
var logOut;



//===========================================================================
//Main
isLogedIn();




//===========================================================================
//Callbacks

//Login user on click
login.addEventListener("click", loginAuthenticatedUser, {once:true});
//===========================================================================
//Functions



function isLogedIn(){
   
    if(localStorage.getItem("logedIn") !== null){
        onLogin();
        logOut = document.getElementById("logOut");
        logOut.addEventListener("click", logoutUser);
    }
    else{
        return false;
    }
}

function onLogin(){
    addUsersToGallery();
    let login = document.getElementsByClassName("login")[0];
    let backgroundImg = document.getElementById("backgroundImg");
    let logedIn = JSON.parse(localStorage.getItem("logedIn"));
    let welcome = `Välkommen ${logedIn.firstName}`;
    let centerContent = document.getElementById("centerContent");
    let header = getID("header");
    let footer = getID("footer");
    let backgroundFiller = getID("backgroundFiller");
    let headerBtns = document.getElementsByClassName("nav")[0];
    let btn1 = headerBtns.children[0].firstChild;
    let btn2 = headerBtns.children[1].firstChild;
    let btn3 = headerBtns.children[2].firstChild;
    let btn4 = headerBtns.children[3].firstChild;
    
    
    //longDiv.hidden = false;
    header.hidden = false;
    footer.hidden = false;
    footer.style.display = "flex";
	btn1.href="index.html";
    btn1.style.backgroundColor = "#000";
    btn1.style.color = "#FFF";
    btn2.textContent = "Galleri";
    btn2.href="gallery.html";
    btn3.textContent = "Om Oss";
    btn3.href="aboutus.html";
    btn4.textContent = "Min Profil";
    btn4.href="profil.html";
	btn4.title="logedIn";
	btn4.addEventListener("click", findCurrentProfile);
    backgroundImg.style.height = "95vh";
    centerContent.hidden = false;
    backgroundFiller.hidden = false;
    logInForm.children[1].hidden = "true";
    logInForm.children[2].hidden = "true";
    logInForm.children[3].id = "logOut";
    logInForm.children[3].textContent = "Logga ut";
    logInForm.children[4].textContent = welcome;
    login.hidden=true;
    backgroundImg.hidden=true;
    
}

//Log in authenticated user
function loginAuthenticatedUser(){
    let userName = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;
    
    if(localStorage.getItem(userName) !== null){
        logedIn = (JSON.parse(localStorage.getItem(userName)));
    }
   
    if((logedIn.email == userName || logedIn.username == userName) &&
       logedIn.password == password){
        localStorage.setItem("logedIn",JSON.stringify(logedIn));
        localStorage.removeItem(logedIn.email);
        
        console.log("sucessful login");
    }
    else if(logInForm.children[3].textContent !== "Logga ut"){
        console.log("login unsucessful");
        alert("Fel användarnamn eller lösenord");
    }
}

//adds profile pics and information into gallery
function addUsersToGallery() {
    addUsersToDatabase();
   
    let galleryProfiles = document.getElementsByClassName('profiles');
    let profileInfo = document.getElementsByClassName('profileInfo');

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
        profileChildern[0].textContent = user.firstName;
        profileChildern[1].textContent = "Ålder: "+getAge(user.birthday);
          
    }
    goToProfile(profileInfo);
}


//==========================================================================
//Constructors

