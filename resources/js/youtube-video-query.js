 // drop down list
 const dropdownButton = document.getElementById("dropdown-button");
 const checkboxList = document.getElementById("checkbox-list");
 const searchbar = document.getElementById("search-bar");
 const dropdownmenu = document.getElementById("dropdown-menu")
 dropdownButton.addEventListener("click", function () {
     dropdownmenu.style.display = dropdownmenu.style.display === "block" ? "none" : "block";
 });
 //render checkbox from array
 var keywords = ["Software","Quality","Assurance","Music",]
 for(keyword of keywords){
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

 const submitButton = document.getElementById("submit-button");
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
    loadVideo(query);
})
//when add button is click, render the checkbox with new keyword
const addButton = document.getElementById("add-button");
addButton.addEventListener("click", function () {
    const newkeyword = document.getElementById("newkeyword-field").value;
    //check if it is empty, if it is not empty, render the new checkbox
    if(newkeyword != ""){
      keywords.push(newkeyword);
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

//loadvideo function, calls onload and on submit 
function loadVideo(query = "SoftwareQualityAssurance"){
var url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet";
const maxResults = "12";
const order = "rating";
const q = query;
const type = "video";
const videoDuration = "short";
const key = "AIzaSyC8MhiHwrOeQhxckyMRKVWmP1dwkNdQhdg"
url = url + "&maxResults=" + maxResults +"&order=" + order + "&q=" + q + "&type=" + type + "&videoDuration=" +videoDuration + "&key=" + key;
  const videoContainer = document.getElementById('video-container');
  videoContainer.replaceChildren();
  fetch(url).then(response => response.json())
        .then(data => {

            let videos = data.items;
            let video_list = "";
            let url = `https://www.youtube.com/embed/VIDEO_ID?playlist=`;

            for (video of videos){
                //get the id
                //let videoTitle = video.snippet.title;
                let videoId = video.id.videoId;

                //append the video list
                video_list += videoId + ",";
            }

            video_list = video_list.substring(0, video_list.length - 1);

            //create the iframe and append
            const youtubeVideo = document.createElement('iframe');
                youtubeVideo.width = '90%';
                youtubeVideo.height = '90%';
                youtubeVideo.src = url + video_list;
                youtubeVideo.allowFullscreen = true;
            videoContainer.appendChild(youtubeVideo);    
        })
        .catch(error => {
            console.error(error);
        });
    }