//keyword function
// drop down list
const dropdownButton = document.getElementById("dropdown-button");
const checkboxList = document.getElementById("checkbox-list");
const searchbar = document.getElementById("search-bar");
const dropdownmenu = document.getElementById("dropdown-menu")
dropdownButton.addEventListener("click", function () {
    dropdownmenu.style.display = dropdownmenu.style.display === "block" ? "none" : "block";
});
//render checkbox from array
let retString = localStorage.getItem("keyword");
let keywords = JSON.parse(retString);
if (null === keywords){
    keywords = ["Software","Development","Education","Music","Animal"];
}
for (keyword of keywords){
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = keyword;
    checkboxList.appendChild(checkbox);
    var label = document.createElement('label')
    label.htmlFor = keyword;
    label.innerHTML = keyword;
    checkboxList.appendChild(label); 
    checkboxList.appendChild(document.createElement('br'))
}

//when add button is click, render the checkbox with new keyword
const addButton = document.getElementById("add-button");
addButton.addEventListener("click", function () {
   const newkeyword = document.getElementById("newkeyword-field").value;
   //check if it is empty, if it is not empty, render the new checkbox
   if(newkeyword != ""){
     keywords.push(newkeyword);
     let keystring = JSON.stringify(keywords);
     localStorage.setItem("keyword",keystring);
     var checkbox = document.createElement('input');
     checkbox.type = 'checkbox';
     checkbox.id = newkeyword;
     checkboxList.appendChild(checkbox);
     var label = document.createElement('label')
     label.htmlFor = newkeyword;
     label.innerHTML = newkeyword;
     checkboxList.appendChild(label); 
     checkboxList.appendChild(document.createElement('br'))
   }
   //clear input field
   document.getElementById("newkeyword-field").value="";
});

//clear searhbar when user click
searchbar.addEventListener("click", function () {
   searchbar.value="";
})