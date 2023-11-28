class VideoListManager {
    constructor(){
      this.videoList = [];
      this.videoCurrent;
      this.isUnique = true;
      this.player;
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
      if (this.isUnique){
        this.onYouTubeIframeAPIReady(videoList[0].id)
        this.isUnique = false;
      }
      this.videoList = videoList;
      this.displayPlayList();
      this.displayVideo(this.videoList[0]);
    }
    displayVideo(video){
      this.videoCurrent = video;      
      this.player.loadVideoById(video.id, 0, "large")
    }

    onYouTubeIframeAPIReady(id) {
      console.log('IframeAPI = Ready');
      this.player = new YT.Player('video-container', {
          videoId: id,
          events: {
              'onReady': onPlayerReady
          }
      });
    }
}

let videoListManager = new VideoListManager();
export default videoListManager;