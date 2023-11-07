import YoutubeAPI from "./youtube-video-query";

require("dotenv").config();

//console.log(process.env.API_KEY)
//const youtubeAPI = new YoutubeAPI("AIzaSyBRgvgjviG26TOvOimVFWfMq6dDvjJlq0o")
const youtubeAPI = new YoutubeAPI(process.env.API_KEY);