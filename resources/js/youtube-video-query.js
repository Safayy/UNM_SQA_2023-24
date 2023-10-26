/* The file returns the top 12 short youtube videos regarding SQA
 *
 *  Date Created    : 
 *  Date Modified   : 
 *  License         : 
 *  Last Author     :  
*/
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

    searchVideos(){ //query, maxResults, videoDuration
        console.log("Searching Videos...")
        gapi.client.youtube.search.list({
            "type":"video",
            "videoEmbeddable":"true",
            "videoDuration":"short",
            "maxResults": 12,
            "order": "rating",
            "q": "software quality assurance"
          })
              .then(function(response) {
                  console.log("Response", response.body);
  
                  // Add Iframe TODO move to display
                  const iframe = document.createElement("iframe");
                  let src = `https://www.youtube.com/embed/VIDEO_ID?playlist=`;
              
                  const responseBody = JSON.parse(response.body);
                  const items = responseBody.items;
  
                  let video_list = "";
                  for (const item of items) {
                    console.log("Video ID:", item.id.videoId);
                    video_list += item.id.videoId + ",";
                  }
                  video_list = video_list.substring(0, video_list.length - 1);
                  console.log(video_list);
  
                  src = src + video_list + "&autoplay=1";
                  console.log("Loading Videos for: " + src);
  
                  iframe.src = src;
                  iframe.frameBorder = 0;
                  iframe.allowFullscreen = true;
                  iframe.allowAutoplay = true;
                  iframe.mute = true;
                  iframe.frameBorder = false;
                  iframe.showInfo = true;
  
                  const cntYoutubePlayer = document.querySelector(".cnt-youtubeplayer");
                  cntYoutubePlayer.appendChild(iframe);
              },
              function(err) { console.error("Execute error", err); });
    }

    filterKeywords(){
        
    }

    displayVideos(){

    }
}

const youtubeAPI = new YoutubeAPI("AIzaSyBRgvgjviG26TOvOimVFWfMq6dDvjJlq0o")