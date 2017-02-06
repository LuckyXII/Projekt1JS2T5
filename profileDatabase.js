/*jshint esnext: true, moz: true*/
/*jslint browser:true */


//https://luckyxii.github.io/Projekt1JS2T5/profileTextDatabase.dat


var req = new XMLHttpRequest();


req.onreadystatechange = function(){
    
    if(req.readyState === 4){
        console.log("state 4");
        console.log(req.responseText);
    }
    
};

req.open("get", "https://luckyxii.github.io/Projekt1JS2T5/profileTextDatabase.dat");
req.send();
