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
        this.initializeYoutubeAPI();
    }
    initGapiClient(){
        gapi.client.init({
            apiKey: "AIzaSyBRgvgjviG26TOvOimVFWfMq6dDvjJlq0o" //todo this.API_KEY
        });
    }
    async initializeYoutubeAPI() { //todo make private #
        console.log("Initializing API...")

        // let myPromise = new Promise(function(myResolve, myReject) {
        //     let x = 0;
        //     if (x == 0) {
        //       myResolve("OK");
        //     } else {
        //       myReject("Error");
        //     }
        //   });
          
        //   myPromise.then(
        //     function(value) {myDisplayer(value);},
        //     function(error) {myDisplayer(error);}
        //   );



        try {
            await new Promise((resolve,reject) => { 
                // gapi.load('client', resolve);
                gapi.load('client', resolve, {
                        callback: function() { //make anonymous inner
                            // gapi.client.init({
                            //     apiKey: "AIzaSyBRgvgjviG26TOvOimVFWfMq6dDvjJlq0o" //todo this.API_KEY
                            // });
                            // resolve("OK")
                            this.initGapiClient();
                            // (function () {
                            //     gapi.client.init({
                            //         apiKey: "AIzaSyBRgvgjviG26TOvOimVFWfMq6dDvjJlq0o"
                            //     });
                            // });
                            console.log("gapi.client loaded successfully");
                        },
                        onerror: function() {
                            alert('gapi.client failed to load!');
                        },
                        timeout: 500,
                        ontimeout: function() {
                            alert('gapi.client could not load in a timely manner!');
                        }
                    });
            });
            // await gapi.client.init({
            //     apiKey: "AIzaSyBRgvgjviG26TOvOimVFWfMq6dDvjJlq0o"
            // })
            
            await this.searchVideos();
            await console.log("Completed initialization")
        } catch(error) {
            throw Error('Error initializing')
        }
        console.log("X")
    }

    filterKeywords(){
        
    }

    searchVideos(){ //query, maxResults, videoDuration
        console.log("test")
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
  
                  // Add Iframe
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
  
                  src = src + video_list;
                  console.log("Loading Videos for: " + src);
  
                  iframe.src = src;
                  iframe.frameBorder = 0;
                  iframe.allowFullscreen = true;
  
                  const cntYoutubePlayer = document.querySelector(".cnt-youtubeplayer");
                  cntYoutubePlayer.appendChild(iframe);
              },
              function(err) { console.error("Execute error", err); });
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
