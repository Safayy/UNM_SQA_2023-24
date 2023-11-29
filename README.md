# UNM_SQA_2023-24 Group 3
## Running the Program
Enter the root directory. Run the following commands then the website will be hosted locally at `http://localhost:3000/`
```bash
# Enter the root directory of the projecct
cd UNM_SQA_2023-24/ 
# Run NPM to resolve dependencies
npm install
# Start server
node ./index.js
```

## Run tests
In the root directory run the command below to run the test suite. Server must be started.
```bash
# Enter the root directory of the projecct
cd UNM_SQA_2023-24/ 
# Start server
node ./index.js
# Run the test suite
npm test
```

## Requirements and Features
1. Build an application (web or desktop based) whose main user interface displays a collection of 12 short YouTube videos on the topic of “Software Quality Assurance”.
2. Each video should have a thumbnail image and a title. Upon clicking the thumbnail image/title, the video should start playing in a dedicated player area on the screen. 
3. The usual controls for playing, pausing and stopping, as well as moving forward and backward through the video should be available while playing.
4. A collection of search keywords should be available in the app. Keywords help narrow-down the selection of 12 videos that is displayed at any time by the application. Every time a keyword is (de-)selected, the list of videos should be updated based on a search that includes all the selected keywords. A selection of predefined keywords should be provided and it should also be possible to define additional keywords. 
5. The software should include the ability to take and save notes for each specific video. Notes are plain text annotations that are meant to help understand the content of an educational video. A user should have the ability to take/edit notes while watching a video and display these notes again when replaying the same video (for this, notes need to be saved when they are written). A note includes a time stamp and a line of text. A video can have multiple notes. When a video is replayed, the saved notes for that video should be displayed on the side, highlighting each note at its corresponding time. 
6. The software should provide a way to share a video together with the notes for that video. Sharing, in its simplest form, could mean that the video URL and the notes are made available as plain text that can be copied and pasted into another application (email, messaging app, etc.). More sophisticated sharing mechanisms can be envisaged, e.g. sharing directly to another Google account.

## Libraries Used
The program aims to lesen the amount of dependencies, in order to increase maintainabiliy.
The required applications are Node and the libraries `webdriver-selenium chromedriver geckodriver express jest`.

## Group Members
Safa Yousif Abdalla Abakar
Pei Shan Yap
Jinming Khor
Jin Shuan Chan