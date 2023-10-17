var url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet";
const maxResults = "12";
const order = "rating";
const q = "SoftwareQualityAssurance";
const type = "video";
const videoDuration = "short";
const key = "AIzaSyBRgvgjviG26TOvOimVFWfMq6dDvjJlq0o"
url = url + "&maxResults=" + maxResults +"&order=" + order + "&q=" + q + "&type=" + type + "&videoDuration=" +videoDuration + "&key=" + key;
  const videoContainer = document.getElementById('video-container');
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