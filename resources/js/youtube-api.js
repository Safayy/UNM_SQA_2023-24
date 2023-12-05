import videoListManager from './video-manager.js';
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
        this.videoListManager = videoListManager; //TODO undo this keyword, its global, no need
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
          "q": query,
          "part": "snippet",
      })
        .then((response) => {
            const responseBody = JSON.parse(response.body);
            const items = responseBody.items;

            let video_list = [];
            let video = {};

            items.forEach((video) => {
              let videoId = video.id.videoId;
              let title = video.snippet.title;
              let thumbnail = video.snippet.thumbnails.default.url;
              let creator = video.snippet.channelTitle;
      
              video = {
                "id" : videoId,
                "title" : title,
                "thumbnail" : thumbnail,
                "creator" : creator
              }

              video_list.push(video)
            })

            console.log(video_list)

            this.videoListManager.setVideoList(video_list);
        })
        .catch((err) => { console.error("Execute error", err); });
    }
  }

console.log(window.API_KEY)
const youtubeAPI = new YoutubeAPI("AIzaSyDPuQT5Nus34BAORpwsDnFQuHwzWhErz5o")
export default youtubeAPI;