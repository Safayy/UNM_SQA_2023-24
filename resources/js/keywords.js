import youtubeAPI from "./youtube-api.js";

const submitButton = document.getElementById("submit-button");
const searchbar = document.getElementById("search-bar");

//when submit button is clicked, check checkbox and add to query if checked
submitButton.addEventListener("click", function(){
   var query = ""
   searchbar.value = "";
   for (keyword of keywords){
       var checkbox = document.getElementById(keyword);
       if (checkbox.checked === true){
           query += keyword + "+";
       }
   }
   query += "..."
   searchbar.value = query;
   query = query.replace(/[+\.]{4}/g, ' ').replace(/\+/g, ' ');
   youtubeAPI.searchVideos(query);
})

//get search bar value when user press enter
searchbar.addEventListener("keydown", function (event) {
   if (event.key === "Enter") {
       var inputValue = searchbar.value;
       youtubeAPI.searchVideos(inputValue);
   }
});