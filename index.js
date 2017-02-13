/*jshint esnext: true, moz: true*/
/*jslint browser:true */

//Import database
var imported = document.createElement("script");
imported.scr = "userDatabase.js";
document.head.appendChild(imported);

//===========================================================================
//Globals

var inputMail = document.getElementById("inputEmail");
var inputPassword = document.getElementById("inputPassword");
var login = document.getElementById("login");
var users = userDatabase.users;



//===========================================================================
//Main

//manual user remove once constructor is completed
var newUser = new UserObject("luckyxii", "a123", "fakemail@dumpTrump.com",
                        1992-09-04, "male", "female","johan", "magnusson", "fakerStreet", "fakerWard",
                        "https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/14232971_10207465694944968_1889056014685634462_n.jpg?oh=ea3f2fa7e1a410f7a26387cd821d5ae4&oe=5942D6A3",
                        178, "brown", "hazel", false, false, false, false, false, ["stuff", "other stuff"], "is_l33t", "has to be_l33t", "blue", "fakerWard", 
                        175, 160, "blond", false, true, false, true, false );



//===========================================================================
//Callbacks

//Login user on click
login.addEventListener("click", loginAuthenticatedUser);

//===========================================================================
//Functions


//Log in authenticated user
function loginAuthenticatedUser(){
    
    console.log("pressed");
    let userName = inputMail.value;
    let password = inputPassword.value;
    
    for(let i = 0; i < users.length; i++){
        
        if((users[i].email == userName || users[i].username == userName) &&
           users[i].password == password){
            
            console.log("sucessful login");
        }
    }
}





//==========================================================================
//Constructors

// User Objects
function UserObject(_username, _password, _email, _birthday, sex, lookingFor,
                    firstName, lastName, _adress, district, profilePic, height,
                    hairColor, eyeColor, smoker, hasAnimals, vegetarian,
                    employed, hasKids, interests, aboutSelf, aboutMatch,
                    prefEyeColor, prefDistrict, prefMaxHeight, prefMinHeight, prefHairColor,
                    prefSmoker, prefAnimals, prefVegetarian, prefEmployed, prefHasKids ) {

//---------------------------
// private 
    var username = _username; //String
    var password = _password; //String
    var email = _email; //String
    var adress = _adress; //String
    var birthday = _birthday; //string
   
//-----------------------------
//public
    
    this.sex = sex; //String
    this.lookingFor = lookingFor; //Array
    this.firstName = firstName; //String
    this.lastName = lastName; //string
    this.district = district; // string
    this.profilePic = profilePic; //String, href-link
    this.height = height; //num
    this.hairColor = hairColor; //String
    this.eyeColor = eyeColor; //String
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
}
//END user object

