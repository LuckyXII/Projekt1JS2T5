/*jshint esnext: true, moz: true*/
/*jslint browser:true */

var userDatabase = {
    "logedIn": {},
    "users":[],
    "currentProfile": {},
    "bestMatch":[]
    
};


//===================================================================================
//callbacks



//===================================================================================
//functions


function logoutUser(){
   
    let logedIn = JSON.parse(localStorage.getItem("logedIn"));
    localStorage.setItem(logedIn.email, JSON.stringify(logedIn));
    localStorage.removeItem("logedIn");
   
}

//*******************************************************
//ready for implementation

//load selected profile
function loadCurrentProfile(e){
    let targetProfile = e.target.value;
    
    if(localStorage.getItem(targetProfile) !== null){
        let currentProfile = localStorage.getItem(targetProfile);
        localStorage.setItem("currentProfile", currentProfile);
    }
    else{
        console.log("Error: profile not found");
    }
}
//Get profile from clicked element
function getProfileOnClick(target){
    target.addEventListener("click", loadCurrentProfile);
}

//*******************************************************


//Made for GitHub (and to train AJAX)
function addTestUsersToStorage(){
    let choice = prompt("Clear Storage before adding users? Y/N");
    let testUsers;
    
    if(choice.toLocaleLowerCase() == "y"){
        localStorage.clear();
    }
    
    let xml = new XMLHttpRequest();
    xml.open("GET", "testUsers.dat");
    xml.onreadystatechange = () => {
        if(xml.readyState == 4){
            testUsers = JSON.parse(xml.responseText);
            for(let i = 0; i < testUsers.users.length; i++){
                localStorage.setItem(testUsers.users[i].email, JSON.stringify(testUsers.users[i]));  
            }
        }
    };
    xml.send();
}

//Made for testing from folder
function localAddTestUsersToStorage(){
     let choice = prompt("Clear Storage before adding users? Y/N");
    
    if(choice.toLocaleLowerCase() == "y"){
        localStorage.clear();
    }
    
    for(let i = 0; i < localTestUsers.users.length; i++){
                localStorage.setItem(localTestUsers.users[i].email, JSON.stringify(localTestUsers.users[i]));  
            }
}

// LOOP THROUGH LOCALSTORAGE USING KEY()
function addUsersToDatabase(){
    var key;
    userDatabase.logedIn = JSON.parse(localStorage.getItem("logedIn"));
    for(let i = 0; i < localStorage.length; i++){
        key = localStorage.key(i);
        if(!(JSON.parse(localStorage.getItem(key)) instanceof Array) && 
           (JSON.parse(localStorage.getItem(key)).email != userDatabase.logedIn.email)){
            userDatabase.users.push(JSON.parse(localStorage.getItem(key)));     
        }
    }
}




var localTestUsers = 
    {

        "users":[
        {
            "username":"luckyxii",
            "password":"a123",
            "email":"omnipotent117@gmail.com",
            "adress":"Mölndalsvägen 77",
            "birthday":"1992-09-04",
            "sex":"male",
            "lookingFor":["female","cyborg"],
            "firstName":"Johan",
            "lastName":"Magnusson",
            "district":"Mölndal",
            "profilePic":"https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/14232971_10207465694944968_1889056014685634462_n.jpg?oh=ea3f2fa7e1a410f7a26387cd821d5ae4&oe=5942D6A3",
            "height":178,
            "hairColor":"Brunette",
            "eyeColor":"Gröna",
            "bodyType":"Atletisk",
            "smoker":"False",
            "hasAnimals":"False",
            "vegetarian":"False",
            "employed":"False",
            "hasKids":"False",
            "interests":["Musik","Litteratur","Resa","Film","Matlagning"],
            "aboutSelf":"Gillar att testa kod",
            "aboutMatch":"Bör också gilla att testa kod",
            "prefEyeColor":"blåa",
            "prefDistrict":"Mölndal",
            "prefMaxHeight":170,
            "prefMinHeight":160,
            "prefHairColor":"Blond",
            "prefSmoker":"False",
            "prefAnimals":"True",
            "prefVegetarian":"False",
            "prefEmployed":"True",
            "prefHasKids":"False",
            "prefBody":"Normal"
        },
        {
             "username":"Grodus",
            "password":"a123",
            "email":"grodus@mail.com",
            "adress":"Siriusgatan 24",
            "birthday":"1992-11-10",
            "sex":"male",
            "lookingFor":["female","transgender"],
            "firstName":"Emil",
            "lastName":"Eriksson",
            "district":"Bergsjön",
            "profilePic":"https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/14232971_10207465694944968_1889056014685634462_n.jpg?oh=ea3f2fa7e1a410f7a26387cd821d5ae4&oe=5942D6A3",
            "height":180,
            "hairColor":"Brunette",
            "eyeColor":"Gråa",
            "bodyType":"Smal",
            "smoker":"False",
            "hasAnimals":"True",
            "vegetarian":"False",
            "employed":"False",
            "hasKids":"False",
            "interests":["Musik","Litteratur","Datorer","PornHub","Stoppa elakingar från välta kossor"],
            "aboutSelf":"Spela",
            "aboutMatch":"Du bör spela",
            "prefEyeColor":"blåa",
            "prefDistrict":"Bergsjön",
            "prefMaxHeight":165,
            "prefMinHeight":155,
            "prefHairColor":"Rött",
            "prefSmoker":"False",
            "prefAnimals":"True",
            "prefVegetarian":"False",
            "prefEmployed":"True",
            "prefHasKids":"False",
            "prefBody":"Smal"
        },
        {
             "username":"Polackski",
            "password":"a123",
            "email":"Polackski@mail.com",
            "adress":"Mölndalsvägen 88",
            "birthday":"1994-09-02",
            "sex":"female",
            "lookingFor":["female","male"],
            "firstName":"Karolina",
            "lastName":"Nowak",
            "district":"Centrum",
            "profilePic":"https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/14232971_10207465694944968_1889056014685634462_n.jpg?oh=ea3f2fa7e1a410f7a26387cd821d5ae4&oe=5942D6A3",
            "height":165,
            "hairColor":"Blond",
            "eyeColor":"Gröna",
            "bodyType":"Normal",
            "smoker":"False",
            "hasAnimals":"True",
            "vegetarian":"False",
            "employed":"True",
            "hasKids":"False",
            "interests":["Musik","Litteratur","Resa","Film","Matlagning"],
            "aboutSelf":"Gillar hästar",
            "aboutMatch":"Bör ha mycket pengar",
            "prefEyeColor":"Gröna",
            "prefDistrict":"Mölndal",
            "prefMaxHeight":185,
            "prefMinHeight":170,
            "prefHairColor":"Brunette",
            "prefSmoker":"False",
            "prefAnimals":"True",
            "prefVegetarian":"False",
            "prefEmployed":"True",
            "prefHasKids":"False",
            "prefBody":"Normal"
        },
        {
             "username":"L33tKid",
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
            "interests":["Musik","Litteratur","Resa","Film","Matlagning"],
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
            "prefHasKids":"True",
            "prefBody":"Kramgo"
        },
        {
            "username":"V-dog",
            "password":"a123",
            "email":"V-dog@mail.com",
            "adress":"Kungsparken 1",
            "birthday":"1995-03-25",
            "sex":"female",
            "lookingFor":["male"],
            "firstName":"Vendella",
            "lastName":"Högskog",
            "district":"Centrum",
            "profilePic":"https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/14232971_10207465694944968_1889056014685634462_n.jpg?oh=ea3f2fa7e1a410f7a26387cd821d5ae4&oe=5942D6A3",
            "height":163,
            "hairColor":"Brunette",
            "eyeColor":"Bruna",
            "bodyType":"Smal",
            "smoker":"False",
            "hasAnimals":"False",
            "vegetarian":"False",
            "employed":"True",
            "hasKids":"False",
            "interests":["Musik","Litteratur","Resa","Film","Matlagning"],
            "aboutSelf":"gillar party",
            "aboutMatch":"Bör kunna stå ut med mig",
            "prefEyeColor":"Gråa",
            "prefDistrict":"Centrum",
            "prefMaxHeight":200,
            "prefMinHeight":175,
            "prefHairColor":"Blond",
            "prefSmoker":"False",
            "prefAnimals":"False",
            "prefVegetarian":"True",
            "prefEmployed":"True",
            "prefHasKids":"False",
            "prefBody":"Atletisk"
        },
        {
             "username":"tinyTina",
            "password":"a123",
            "email":"tinyTina@mail.com",
            "adress":"Skänningegatan 11",
            "birthday":"1996-12-01",
            "sex":"female",
            "lookingFor":["female","cyborg"],
            "firstName":"Tina",
            "lastName":"Tiny",
            "district":"Lundby",
            "profilePic":"https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/14232971_10207465694944968_1889056014685634462_n.jpg?oh=ea3f2fa7e1a410f7a26387cd821d5ae4&oe=5942D6A3",
            "height":160,
            "hairColor":"Varierande",
            "eyeColor":"Röda/Violetta",
            "bodyType":"Atletisk",
            "smoker":"False",
            "hasAnimals":"True",
            "vegetarian":"False",
            "employed":"True",
            "hasKids":"True",
            "interests":["Musik","Litteratur","Resa","Film","Matlagning"],
            "aboutSelf":"Gillar gosedjur",
            "aboutMatch":"Bör gilla barn och gosedjur",
            "prefEyeColor":"Röda/Violetta",
            "prefDistrict":"Lundby",
            "prefMaxHeight":170,
            "prefMinHeight":160,
            "prefHairColor":"Varierande",
            "prefSmoker":"False",
            "prefAnimals":"True",
            "prefVegetarian":"False",
            "prefEmployed":"True",
            "prefHasKids":"False",
            "prefBody":"Kramgo"
        },
        {
             "username":"trump",
            "password":"a123",
            "email":"trump@mail.com",
            "adress":"Diamantgatan 3",
            "birthday":"1947-05-30",
            "sex":"male",
            "lookingFor":["transgender","cyborg"],
            "firstName":"Donald",
            "lastName":"Trump",
            "district":"Frölunda",
            "profilePic":"https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/14232971_10207465694944968_1889056014685634462_n.jpg?oh=ea3f2fa7e1a410f7a26387cd821d5ae4&oe=5942D6A3",
            "height":150,
            "hairColor":"Blond",
            "eyeColor":"Röda/Violetta",
            "bodyType":"Kramgo",
            "smoker":"True",
            "hasAnimals":"False",
            "vegetarian":"False",
            "employed":"True",
            "hasKids":"True",
            "interests":["Musik","Litteratur","Resa","Film","Matlagning"],
            "aboutSelf":"Gillar att bygga väggar",
            "aboutMatch":"Bör hata mexikanare",
            "prefEyeColor":"Blåa",
            "prefDistrict":"Frölunda",
            "prefMaxHeight":210,
            "prefMinHeight":190,
            "prefHairColor":"Blond",
            "prefSmoker":"True",
            "prefAnimals":"False",
            "prefVegetarian":"False",
            "prefEmployed":"True",
            "prefHasKids":"False",
            "prefBody":"Atletisk"
        },
        {
             "username":"jesus",
            "password":"a123",
            "email":"jesus@mail.com",
            "adress":"Fredenslundsvägen",
            "birthday":"1945-12-24",
            "sex":"male",
            "lookingFor":["male","female","transgender","cyborg"],
            "firstName":"Jesus",
            "lastName":"Christ",
            "district":"Backa",
            "profilePic":"https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/14232971_10207465694944968_1889056014685634462_n.jpg?oh=ea3f2fa7e1a410f7a26387cd821d5ae4&oe=5942D6A3",
            "height":170,
            "hairColor":"Brunette",
            "eyeColor":"Bruna",
            "bodyType":"Atletisk",
            "smoker":"False",
            "hasAnimals":"True",
            "vegetarian":"False",
            "employed":"False",
            "hasKids":"True",
            "interests":["Musik","Litteratur","Resa","Film","Matlagning"],
            "aboutSelf":"Gillar gud",
            "aboutMatch":"Bör inte förråda mig som judas",
            "prefEyeColor":"Bruna",
            "prefDistrict":"Backa",
            "prefMaxHeight":170,
            "prefMinHeight":160,
            "prefHairColor":"Brunette",
            "prefSmoker":"False",
            "prefAnimals":"True",
            "prefVegetarian":"True",
            "prefEmployed":"False",
            "prefHasKids":"False",
            "prefBody":"Normal"
        },
        {
             "username":"putin",
            "password":"a123",
            "email":"putin@mail.com",
            "adress":"Transportgatan 23",
            "birthday":"1954-04-04",
            "sex":"male",
            "lookingFor":["male","cyborg"],
            "firstName":"Vladimir",
            "lastName":"Putin",
            "district":"Backa",
            "profilePic":"https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/14232971_10207465694944968_1889056014685634462_n.jpg?oh=ea3f2fa7e1a410f7a26387cd821d5ae4&oe=5942D6A3",
            "height":183,
            "hairColor":"Grått",
            "eyeColor":"gråa",
            "bodyType":"Atletisk",
            "smoker":"True",
            "hasAnimals":"False",
            "vegetarian":"False",
            "employed":"True",
            "hasKids":"False",
            "interests":["Musik","Litteratur","Resa","Film","Matlagning"],
            "aboutSelf":"Gillar krig",
            "aboutMatch":"Bör också gilla krig",
            "prefEyeColor":"Blåa",
            "prefDistrict":"Backa",
            "prefMaxHeight":170,
            "prefMinHeight":160,
            "prefHairColor":"Varierande",
            "prefSmoker":"False",
            "prefAnimals":"False",
            "prefVegetarian":"False",
            "prefEmployed":"True",
            "prefHasKids":"False",
            "prefBody":"Kramgo"
        },
        {
             "username":"dovakhin",
            "password":"a123",
            "email":"dovakhin@mail.com",
            "adress":"Kruniusvägen 1",
            "birthday":"1930-11-11",
            "sex":"male",
            "lookingFor":["woman"],
            "firstName":"The",
            "lastName":"Dovakhin",
            "district":"Askim",
            "profilePic":"https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/14232971_10207465694944968_1889056014685634462_n.jpg?oh=ea3f2fa7e1a410f7a26387cd821d5ae4&oe=5942D6A3",
            "height":210,
            "hairColor":"Svart",
            "eyeColor":"Gröna",
            "bodyType":"Atletisk",
            "smoker":"False",
            "hasAnimals":"False",
            "vegetarian":"False",
            "employed":"False",
            "hasKids":"False",
            "interests":["Musik","Litteratur","Resa","Film","Matlagning"],
            "aboutSelf":"Gillar att loot lådor",
            "aboutMatch":"Bör gilla snö",
            "prefEyeColor":"Gråa",
            "prefDistrict":"Askim",
            "prefMaxHeight":170,
            "prefMinHeight":160,
            "prefHairColor":"Svart",
            "prefSmoker":"False",
            "prefAnimals":"False",
            "prefVegetarian":"False",
            "prefEmployed":"False",
            "prefHasKids":"False",
            "prefBody":"Atletisk"
        },
        {
            "username":"slimShady",
            "password":"a123",
            "email":"slimShady@mail.com",
            "adress":"Mölndalsvägen 76",
            "birthday":"1977-08-17",
            "sex":"male",
            "lookingFor":["woman","cyborg", "transgender"],
            "firstName":"Slim",
            "lastName":"Shady",
            "district":"Mölndal",
            "profilePic":"https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/14232971_10207465694944968_1889056014685634462_n.jpg?oh=ea3f2fa7e1a410f7a26387cd821d5ae4&oe=5942D6A3",
            "height":176,
            "hairColor":"Svart",
            "eyeColor":"Blåa",
            "bodyType":"Smal",
            "smoker":"True",
            "hasAnimals":"False",
            "vegetarian":"False",
            "employed":"False",
            "hasKids":"True",
            "interests":["Musik","Litteratur","Resa","Film","Matlagning"],
            "aboutSelf":"Gillar dope",
            "aboutMatch":"Bör vara galen",
            "prefEyeColor":"Bruna",
            "prefDistrict":"Mölndal",
            "prefMaxHeight":172,
            "prefMinHeight":161,
            "prefHairColor":"Svart",
            "prefSmoker":"True",
            "prefAnimals":"False",
            "prefVegetarian":"False",
            "prefEmployed":"False",
            "prefHasKids":"False",
            "prefBody":"Smal"
        }
    ]

    };