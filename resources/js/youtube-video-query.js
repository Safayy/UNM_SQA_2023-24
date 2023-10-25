// gapi.load("client");


/* The file returns the top 12 short youtube videos regarding SQA
 *
 *  Date Created    : 
 *  Date Modified   : 
 *  License         : 
 *  Last Author     :  
*/
// Load Google API export
class YoutubeAPI {
    constructor(API_KEY){
        this.API_KEY = API_KEY;
        // this.initializeYoutubeAPI();

        const initialize = async () => {
            const { gapi } = window;
            await new Promise((resolve, reject) => {
              gapi.load('client', async () => {
                try {
                  await function() {
                    gapi.client.init({
                        apiKey: "AIzaSyBRgvgjviG26TOvOimVFWfMq6dDvjJlq0o" //todo this.API_KEY
                    });
                  }
                await console.log("Gapi Client Loaded")
                await gapi.client.setApiKey("AIzaSyBRgvgjviG26TOvOimVFWfMq6dDvjJlq0o")
                // await gapi.client.load("youtube")
                // await gapi.client.load('youtube', 'v3', function() {
                //     searchVideos();
                // });
                //   await gapi.client.load("youtube")
                //   await this.searchVideos()
                  resolve();
                } catch (error) {
                  throw Error(`Error initializing gapi client: ${error}`);
                }
              });
            });
            return true;
          };
          
          initialize();
    }

    initGapiClient(){
        gapi.client.init({
            apiKey: "AIzaSyBRgvgjviG26TOvOimVFWfMq6dDvjJlq0o" //todo this.API_KEY
        });
    }

    filterKeywords(){
        
    }

    searchVideos(){ //query, maxResults, videoDuration
        console.log("test")
        // gapi.client.youtube.search.list({
        //     "type":"video",
        //     "videoEmbeddable":"true",
        //     "videoDuration":"short",
        //     "maxResults": 12,
        //     "order": "rating",
        //     "q": "software quality assurance"
        //   })
        //       .then(function(response) {
        //           console.log("Response", response.body);
  
        //           // Add Iframe
        //           const iframe = document.createElement("iframe");
        //           let src = `https://www.youtube.com/embed/VIDEO_ID?playlist=`;
              
        //           const responseBody = JSON.parse(response.body);
        //           const items = responseBody.items;
  
        //           let video_list = "";
        //           for (const item of items) {
        //             console.log("Video ID:", item.id.videoId);
        //             video_list += item.id.videoId + ",";
        //           }
        //           video_list = video_list.substring(0, video_list.length - 1);
        //           console.log(video_list);
  
        //           src = src + video_list;
        //           console.log("Loading Videos for: " + src);
  
        //           iframe.src = src;
        //           iframe.frameBorder = 0;
        //           iframe.allowFullscreen = true;
  
        //           const cntYoutubePlayer = document.querySelector(".cnt-youtubeplayer");
        //           cntYoutubePlayer.appendChild(iframe);
        //       },
        //       function(err) { console.error("Execute error", err); });
    }
    displayVideos(){

    }
}

const youtubeAPI = new YoutubeAPI("AIzaSyBRgvgjviG26TOvOimVFWfMq6dDvjJlq0o")
// youtubeAPI.searchVideos()


// gapi.load("client");
// gapi.client.setApiKey("AIzaSyBRgvgjviG26TOvOimVFWfMq6dDvjJlq0o");

/**
 * 
 */
// gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    // .then(function() { console.log("GAPI client loaded for API"); },
    //         function(err) { console.error("Error loading GAPI client for API", err); })



//             gapi.client.youtube.search.list({
//             "type":"video",
//             "videoEmbeddable":"true",
//             "videoDuration":"short",
//             "maxResults": 12,
//             "order": "rating",
//             "q": "software quality assurance"
//             })
//                 .then(function(response) {
//                     console.log("Response", response.body);
        
//                     // Add Iframe
//                     const iframe = document.createElement("iframe");
//                     let src = `https://www.youtube.com/embed/VIDEO_ID?playlist=`;
                
//                     const responseBody = JSON.parse(response.body);
//                     const items = responseBody.items;
        
//                     let video_list = "";
//                     for (const item of items) {
//                     console.log("Video ID:", item.id.videoId);
//                     video_list += item.id.videoId + ",";
//                     }
//                     video_list = video_list.substring(0, video_list.length - 1);
//                     console.log(video_list);
        
//                     src = src + video_list;
//                     console.log("Loading Videos for: " + src);
        
//                     iframe.src = src;
//                     iframe.frameBorder = 0;
//                     iframe.allowFullscreen = true;
        
//                     const cntYoutubePlayer = document.querySelector(".cnt-youtubeplayer");
//                     cntYoutubePlayer.appendChild(iframe);
//                 },
//                 function(err) { console.error("Execute error", err); });
