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

function goToProfile(profileInfo){
    //let profileInfo = document.getElementsByClassName("profileInfo");
    
    for(let i = 0; i < profileInfo.length; i++){
    
        profileInfo[i].children[0].addEventListener("click", findCurrentProfile);
    }
}


function findCurrentProfile(e){
	let currentProfile = e.target.title;
	let storageItem = localStorage.getItem(currentProfile);
	if (storageItem !== null){
		localStorage.setItem("currentProfile", storageItem);
	}
}

//create option elements for year / month / day
function createOptionsBirthdate(year, month, day){
    
    let currentYear = new Date().getFullYear();
    //let option = $$("option"); - only works once with appendchild

    //create options year
    for(let i = 0; i < 100; i++){
        year.appendChild(document.createElement("option"));
        year.children[i].value = currentYear-i;
        year.children[i].textContent = year.children[i].value;
    }
    //create options month
    for(let i = 0; i < 12; i++){
        month.appendChild(document.createElement("option"));
        month.children[i].value = 1+i;
        month.children[i].textContent = month.children[i].value;
    }
    //create options day
    for(let i = 0; i < 31; i++){
        day.appendChild(document.createElement("option"));
        day.children[i].value = 1+i;
         day.children[i].textContent =  day.children[i].value;
    }
}


//======================

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


//=======================

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
function setBirthday(selectedYear,selectedMonth,selectedDay){

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

//Validate username
function validateUser(username, email){
    
   // var username=getID("profileMail").value;
    //User already registered
    if(localStorage.getItem(username) !== null){
        console.log("taken");
        return false;
    }
    else{
        if (validateEmail(username, email)) {
            return true;
        }
        else {
            return false;
        }
    }
}

//Validate email
function validateEmail(email, confirmEmail){
    
    //confirm mail matches
   // var email = getID("profileMail").value;
  //  var confirmEmail = getID("confirmProfileMail").value;
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

function newElement(elm){
    let element = document.createElement(elm);
    return element;
}


function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


//get element by id
function getID(ID){
    let variable = document.getElementById(ID);
    return variable;
}


// logout user
function logoutUser(){
   
    let logedIn = JSON.parse(localStorage.getItem("logedIn"));
    localStorage.setItem(logedIn.email, JSON.stringify(logedIn));
    localStorage.removeItem("logedIn");
   
}

//*******************************************************
//ready for implementation

//load selected profile
function loadCurrentProfile(e){
    let targetProfile = e.target.title;
    
    if(localStorage.getItem(targetProfile) !== null){
        let currentProfile = localStorage.getItem(targetProfile);
        localStorage.setItem("currentProfile", JSON.stringify(currentProfile));
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

        let storageKey = localStorage.getItem(key);
        let JSONKey = JSON.parse(storageKey);

        if(!(JSONKey instanceof Array) && JSONKey.email != userDatabase.logedIn.email){
            userDatabase.users.push(JSONKey);     
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
            "profilePic":"http://littlehouseofamericangirl.com/wp-content/uploads/2014/10/BKH28_main_2.jpg",
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
            "profilePic":"http://littlehouseofamericangirl.com/wp-content/uploads/2014/10/BKH28_main_2.jpg",
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
            "interests":["Musik","Korsord","Resa","Resturang","Städa"],
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
            "sex":"cyborg",
            "lookingFor":["female","cyborg", "male"],
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
            "interests":["TV","Vin & Dryck","Resturang","Bakning","Övrigt"],
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
            "interests":["Datorer","Städa","Matlagning","Trädgård","Hälsa"],
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
			"profilePic":"resources/trumpwillwin.jpg",
            "height":150,
            "hairColor":"Blond",
            "eyeColor":"Röda/Violetta",
            "bodyType":"Kramgo",
            "smoker":"True",
            "hasAnimals":"False",
            "vegetarian":"False",
            "employed":"True",
            "hasKids":"True",
            "interests":["Övrigt","Välta Kossor","PornHub","Film","TV"],
            "aboutSelf":"Gillar att bygga murar",
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
            "prefBody":"Atletisk",
            "friendsList":[],
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
            "interests":["Bilar","Litteratur","Resa","New Age","Stoppa elakingar från välta kossor"],
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
            "sex":"transgender",
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
            "interests":["TV","Litteratur","Resa","Vin & Dryck","Städa"],
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
            "firstName":"Dovakhin",
            "lastName":"Dragonborn",
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
            "interests":["Musik","Trädgård","Övrigt","PornHub","Hälsa"],
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
            "interests":["Musik","TV","Datorer","Film","PornHub"],
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
