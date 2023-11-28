import player from "./youtube-api.js";

class VideoListManager {
    constructor(){
      this.videoList = [];
    }
    displayPlayList() {
      var videoListDiv = document.getElementById("video-list");
      videoListDiv.innerHTML = '';
  
      for (let video of this.videoList) {
        var videoDiv = document.createElement("div");
        videoDiv.className = "cnt-white-box";
    
        var thumbnailDiv = document.createElement("div");
        thumbnailDiv.className = "thumbnail";
        var thumbnailImg = document.createElement("img");
        thumbnailImg.src = video.thumbnail;
        thumbnailDiv.appendChild(thumbnailImg);
    
        var titleDiv = document.createElement("div");
        titleDiv.className = "title";
        titleDiv.innerHTML = `<strong>${video.title}</strong>`;
    
        var creatorDiv = document.createElement("div");
        creatorDiv.className = "creator";
        creatorDiv.textContent = `${video.creator}`;
    
        videoDiv.appendChild(thumbnailDiv);
        videoDiv.appendChild(titleDiv);
        videoDiv.appendChild(creatorDiv);
    
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
    displayVideo(video){
      console.log("Playing video with ID:", video);
      //TODO highlight playing video
      let src = `https://www.youtube.com/embed/VIDEO_ID?playlist=`; //todo not playlist
      src = src + video.id + "&autoplay=1&rel=0";
      console.log("Loading Video for: " + src);
  
      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.frameBorder = 0;
      iframe.allowFullscreen = true;
      iframe.allowAutoplay = true;
      iframe.mute = true;
      iframe.frameBorder = false;
      iframe.showInfo = true;
      if (player) {
        player.destroy();
      }
      const cntYoutubePlayer = document.querySelector(".cnt-youtubeplayer");
      cntYoutubePlayer.replaceChildren();
      cntYoutubePlayer.appendChild(iframe); //TODO replaceChild
      //onYouTubeIframeAPIReady(video.id);
    }
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onYouTubeIframeAPIReady(videoID) {
  player = new YT.Player('video-container', {
      height: '360',
      width: '640',
      videoId: videoID,
      events: {
          'onReady': onPlayerReady,
      }
  });
}

export default VideoListManager;