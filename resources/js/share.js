import notesObj from "./note-button.js";

function exportToFile() {
    //Gets the notes from localStorage
    let notes = localStorage.getItem("notes");
    notesObj = notes ? JSON.parse(notes) : [];
    let exportContent = `Video Link: ${getCurrentlyPlayingVideoLink()}\n\nNotes:\n`;

    notesObj.forEach((note) => {
        exportContent += `[${formatTime(note.time)}] - ${note.text}\n`;
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
    if (player) {
        let videoId = player.getVideoData().video_id;
        return `https://www.youtube.com/watch?v=${videoId}`;
    } else {
        return "No video currently playing.";
    }
}
