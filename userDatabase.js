/*jshint esnext: true, moz: true*/
/*jslint browser:true */

var userDatabase = {
    
  "users":[]  
    
};

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
            console.log("Response: ${xml.responseText}");
            for(let i = 0; i < testUsers.users.length; i++){
                localStorage.setItem(testUsers.users[i].email, JSON.stringify(testUsers.users[i]));
                
            }
        }else{
            console.log("Error testUsers not found");
        }
    };
    xml.send();
}
