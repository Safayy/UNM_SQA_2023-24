/* The file returns the top 12 short youtube videos regarding SQA
 *
 *  Date Created    : 
 *  Date Modified   : 
 *  License         : 
 *  Last Author     :  
*/

class VideoListManager {
  constructor(){
    this.videoList = [];
  }
  displayPlayList(){
    var videoListDiv = document.getElementById("video-list");
    for (let video of this.videoList) {
      var videoDiv = document.createElement("div");
      videoDiv.textContent = video;
      videoDiv.addEventListener("click", () => {
        this.displayVideo(video);
      });
      videoListDiv.appendChild(videoDiv);
    }
  }
  setVideoList(videoList){
    this.videoList = videoList;
    this.displayPlayList();
    this.displayVideo(this.videoList[0]);
  }
  displayVideo(videoId){
    console.log("Playing video with ID:", videoId);
    //todo highlight playing video
    let src = `https://www.youtube.com/embed/VIDEO_ID?playlist=`;
    src = src + videoId + "&autoplay=1&rel=0";
    console.log("Loading Video for: " + src);

    const iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.frameBorder = 0;
    iframe.allowFullscreen = true;
    iframe.allowAutoplay = true;
    iframe.mute = true;
    iframe.frameBorder = false;
    iframe.showInfo = true;

    const cntYoutubePlayer = document.querySelector(".cnt-youtubeplayer");
    cntYoutubePlayer.replaceChildren();
    cntYoutubePlayer.appendChild(iframe); //TODO replaceChild
  }
}

class YoutubeAPI {
    async loadYoutubeAPI() {
      return new Promise((resolve, reject) => {
          gapi.client.load('youtube', 'v3', function () {
              console.log("Loaded youtube API");
              resolve();
          });
      });
    }
  
    constructor(API_KEY) {
        this.videoListManager = new VideoListManager();
        this.API_KEY = API_KEY;
        const initialize = async () => {
          const { gapi } = window;
          await new Promise((resolve, reject) => {
            gapi.load('client', async () => {
              try {
                await gapi.client.setApiKey(this.API_KEY)
                await this.loadYoutubeAPI();
                await this.searchVideos();
                resolve();
              } catch (error) {
                throw Error(`Error initializing gapi client: ${error}`);
              }
            });
          });
        };
        
        initialize();
    }
  
    searchVideos(query="Software Quality Assurance") {
      gapi.client.youtube.search.list({
          "type": "video",
          "videoEmbeddable": "true",
          "videoDuration": "short",
          "maxResults": 12,
          "order": "rating",
          "q": query
      })
        .then((response) => {
            const responseBody = JSON.parse(response.body);
            const items = responseBody.items;
            let video_id_list = [];
            let video_list = "";
            for (const item of items) {
                video_id_list.push(item.id.videoId);
                video_list += item.id.videoId + ","; //comment out
                console.log(item.body); //comment out
            }

            this.videoListManager.setVideoList(video_id_list);
        })
        .catch((err) => { console.error("Execute error", err); });
    }

    
  
  }
  
const youtubeAPI = new YoutubeAPI("AIzaSyCMz9hT05lvEd-Fb0mzONMqamzsCI3BbG4")

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
 if(null === keywords)
 {
    keywords = ["Software","Development","Education","Music","Animal"];
 }
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
    query = query.replace(/[+\.]{4}/g, ' ').replace(/\+/g, ' ');
    youtubeAPI.searchVideos(query);
})
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

//get search bar value when user press enter
searchbar.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        var inputValue = searchbar.value;
        youtubeAPI.searchVideos(inputValue);
    }
});


