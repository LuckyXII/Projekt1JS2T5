/*jshint esnext: true, moz: true*/
/*jslint browser:true */

/*********************************** USE THIS FILE TO TEST CODE ***********************************/

//Import database
var imported = document.createElement("script");
imported.src = "userDatabase.js";
document.head.appendChild(imported);

addUsersToDatabase();

var galleryProfiles = document.getElementsByClassName('profiles');

var profileInfo = document.getElementsByClassName('profileInfo');

function addUsersToGallery() {
    
    let user;
    let profileChildern;
    
    for (let i = 0; i<galleryProfiles.length; i++) {
        profileChildern = profileInfo[i].children;
        user = userDatabase.users[i];
        galleryProfiles[i].firstChild.src = userDatabase.users[i].profilePic;
        profileChildern[0].textContent = user.firstName;
        profileChildern[1].textContent = "Ålder: "+getAge(user.birthday);
        
    }
    
}


addUsersToGallery();