import notesObj from "./note-button.js";
import videoListManager from "./video-manager.js";

function formatTime(totalSeconds) {
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = Math.floor(totalSeconds - minutes * 60);
    seconds = seconds < 10 ? '0' + seconds : seconds; // Add leading zero if seconds < 10
    return minutes + ':' + seconds;
}

export default formatTime;

function exportToFile() {
    //Gets the notes from localStorage
    let notes = localStorage.getItem("notes");
    let notesText = notesObj;
    notesText = notes ? JSON.parse(notes) : [];
    let exportContent = `Video Link: ${getCurrentlyPlayingVideoLink()}\n\nNotes:\n`;

    notesText.forEach((note) => {
        if (note.id == videoListManager.videoCurrent.id){
            exportContent += `[${formatTime(note.time)}] - ${note.text}\n`;        
        }
    });

    let blob = new Blob([exportContent], { type: "text/plain" });

    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "notes.txt";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
}

//Gets video ID and appends to link
function getCurrentlyPlayingVideoLink() {
    if (videoListManager.player) {
        let videoId = videoListManager.videoCurrent.id;
        return `https://www.youtube.com/watch?v=${videoId}`;
    } else {
        return "No video currently playing.";
    }
}

let elm = document.getElementById('exportBtn');
elm.addEventListener('click', () => {
    exportToFile();
})

