function UserObject() {
  this.username = null; //String
  this.password = null; //String
  this.email = null; //String
  this.sex = null; //String
  this.matchingSex = null; //Array
  this.firstName = null; //String
  this.place = null; //String
  this.birthDate = null; //DateObject
  this.saveBirthday = function(year, month, day) {
    this.birthDate = new Date(year, month, day);
  };
  this.profilePic = null; //String, href-link
  this.height = null; //String
  this.bodyType = null; //String
  this.hairColor = null; //String
  this.eyeColor = null; //String
  this.interests = null; //Array
  this.aboutSelf = null; //String
  this.aboutMatch = null; //String
}

//Snabbfunktion för skapa element
function $$(str){
    return document.createElement(str);
}
function addInterestsToDocument(){
  let interestList = ["Musik", "Litteratur", "Resa", "Film", "Matlagning", "TV",
                      "Vin & Dryck", "Korsord", "Restaurang", "Trädgård", "Hälsa",
                      "Bakning", "Bilar", "Datorer", "New Age", "Städa", "PornHub",
                      "Välta Kossor", "Stoppa elakingar från välta kossor", "Övrigt"];
  let addTo = $("#regInterestBoxes");
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

function $(str) {
  if (document.querySelectorAll(str).length <= 1) {
    return document.querySelector(str);
  }
  else {
        return document.querySelectorAll(str);
  }
}

function hidePagesAtStart(){
  let pages = [$("#reg2"),$("#reg3"),$("#reg4")];
  pages.forEach(e=>{
    e.style.display = "none";
  });
}

function confirmButtonsActions(){
  $("#reg1Confirm").addEventListener("click", function(){
    $("#reg2").style.display = "block";
    $("#reg1").style.display = "none";
  });
  $("#reg2Confirm").addEventListener("click", function(){
    $("#reg3").style.display = "block";
    $("#reg2").style.display = "none";
  });
  $("#reg3Confirm").addEventListener("click", function(){
    $("#reg4").style.display = "block";
    $("#reg3").style.display = "none";
  });
  $("#reg2Previous").addEventListener("click", function() {
    $("#reg1").style.display = "block";
    $("#reg2").style.display = "none";
  });
  $("#reg3Previous").addEventListener("click", function() {
    $("#reg2").style.display = "block";
    $("#reg3").style.display = "none";
  });
  $("#reg4Previous").addEventListener("click", function() {
    $("#reg3").style.display = "block";
    $("#reg4").style.display = "none";
  });
}
/*
function addBootStrapClasses(){
  let halfPage = $(".regHalfPage");
  halfPage.forEach(e=>{
    e.className += " col-xs-12 col-md-6";
  });
  let regOption = $(".regOptionText");
  regOption.forEach(e=>{
    e.className += " col-sm-6";
  });
  let regInput = $(".regInput");
  regInput.forEach(e=>{
    e.className += " col-sm-6";
  });
} */
document.addEventListener("DOMContentLoaded", function(event) {
  addInterestsToDocument();
  hidePagesAtStart();
  confirmButtonsActions();
//  addBootStrapClasses();
});
