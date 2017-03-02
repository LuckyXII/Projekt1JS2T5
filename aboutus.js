/*jshint esnext: true, moz: true*/
/*jslint browser:true */

//Import database
var imported = document.createElement("script");
imported.src = "userDatabase.js";
document.head.appendChild(imported);

document.getElementById("header").style.display = "block";

//document.getElementById("footer").style.display = "block";

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
    btn2.textContent = "Galleri";
    btn2.href="gallery.html";
    btn3.textContent = "Om Oss";
    btn3.href="aboutus.html";
    btn3.style.backgroundColor = "#000";
    btn3.style.color = "#FFF";
    btn4.textContent = "Min Profil";
    btn4.title = "logedIn";
    btn4.href="profil.html";
    btn4.title = "logedIn";
    btn4.addEventListener("click", findCurrentProfile);

}

styleHeader();
