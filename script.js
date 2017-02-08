/*jshint esnext: true, moz: true*/
/*jslint browser:true */


//**********************************************************************
// experimental comunication with prototype-database server


//adresses
// userProfileDatabase.dat -> https://luckyxii.github.io/Projekt1JS2T5/profileTextDatabase.dat


var req = new XMLHttpRequest();


req.onreadystatechange = function(){
    
    if(req.readyState === 4){
        console.log("state 4");
        console.log(req.responseText); //when done print database
    }
    
};

req.open("get", "https://luckyxii.github.io/Projekt1JS2T5/profileTextDatabase.dat?users=user1");
req.send();




//***********************************************************************
//experimental private user info

function UserObject(_username, _password, _email, sex, lookingFor,
                    firstName, lastName, adress, district, profilePic, height,
                    hairColor, eyeColor, smoker, hasAnimals, vegetarian,
                    employed, hasKids, interests, aboutSelf, aboutMatch,
                    prefEyeColor, prefDistrict, prefMaxHeight, prefMinHeight, prefHairColor,
                    prefSmoker, prefAnimals, prefVegetarian, prefEmployed, prefHasKids ) {

//---------------------------
// private 
    var username = username; //String
    var password = password; //String
    var email = email; //String
   
//-----------------------------
//public
    
    this.sex = sex; //String
    this.lookingFor = lookingFor; //Array
    this.firstName = firstName; //String
    this.lastName = lastName;
    this.adress = adress; //String
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
    this.setBirthday = function(date) {
        this.birthDate = new Date(date);
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
}


var newUser = new UserObject("luckyxii", "a123", "fakemail@dumpTrump.com", "male", "female",
                        "johan", "magnusson", "fakerStreet", "fakerWard",
                         "https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/14232971_10207465694944968_1889056014685634462_n.jpg?oh=ea3f2fa7e1a410f7a26387cd821d5ae4&oe=5942D6A3",
                        178, "brown", "hazel", false, false, false, false, false, ["stuff", "other stuff"], "is_l33t", "has to be_l33t", "blue", "fakerWard", 
                        175, 160, "blond", false, true, false, true, false );

newUser.setBirthday("1992-09-04");

console.log(newUser);

