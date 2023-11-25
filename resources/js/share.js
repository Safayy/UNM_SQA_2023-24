// Function to export video link and notes to a text file
function exportToFile() {
    // Get the currently playing video's information from YoutubeAPI
    const currentVideo = youtubeAPI.videoListManager.videoList[0];

    // Check if there is a currently playing video
    if (currentVideo) {
        // Generate the YouTube link with the video ID
        const youtubeLink = `https://www.youtube.com/watch?v=${currentVideo.id}`;

        // Get the notes from localStorage
        let notes = localStorage.getItem("notes");
        let notesObj = [];

        if (notes != null) {
            notesObj = JSON.parse(notes);
        }

        // Combine the video link and notes
        const content = `YouTube Video Link: ${youtubeLink}\n\nNotes:\n${notesObj.join('\n')}`;

        // Create a Blob with the content
        const blob = new Blob([content], { type: 'text/plain' });

        // Create a link element and trigger a click to download the file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'video_notes.txt';
        link.click();
    } else {
        alert('No video is currently playing.');
    }
}
