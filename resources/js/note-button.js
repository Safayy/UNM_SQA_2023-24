showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");

    if (notes == null) notesObj = [];
    else notesObj = JSON.parse(notes);
    
    let currenttime = getCurrentTimeOutsideFunction();

    let noteContent = {
        text: addTxt.value,
        time: currenttime, // Add current time to the note
        id: player.videoID
    };

    notesObj.push(noteContent);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";

    showNotes();
});

function getCurrentTimeOutsideFunction() {
    // Access the current time of the player from an outside function
    if (player) {
        var currentTime = player.getCurrentTime();
        return currentTime;
    } else {
        return 0;
    }
}

function formatTime(totalSeconds) {
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = Math.floor(totalSeconds - minutes * 60);
    seconds = seconds < 10 ? '0' + seconds : seconds; // Add leading zero if seconds < 10
    return minutes + ':' + seconds;
}

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");

    if (notes == null) notesObj = [];
    else notesObj = JSON.parse(notes);

    let html = "";

    html = `<div class="noteCard my-2 mx-2 card" 
        style="width: 18rem;">
            <div class="card-body">`;

    notesObj.forEach(function(note, index) {
        if(note.id == player.videoID){
            html += `
            <p class="card-text"> <b>
                Time: ${formatTime(note.time)} 
                </b>
            </p>
            <p class="card-text"> 
                       ${note.text}
                        </p>`;
            }
    });

    html += `<button id="dlt" onclick=
                "deleteNote(this.id)"
                    class="btn btn-primary">
                Delete Note
            </button>
            </div>
            </div>`;

    let notesElm = document.getElementById("notes");

    if (notesObj.length != 0) notesElm.innerHTML = html;
    else
        notesElm.innerHTML = `Nothing to show! 
        Use "Add a Note" section above to add notes.`;
}

function hideNotes() {
    let notesElm = document.getElementById("notes");
    notesElm.style.display = "none";
}

// Function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");

    if (notes == null) notesObj = [];
    else notesObj = JSON.parse(notes);

    notesObj.splice(index, 1);

    localStorage.setItem("notes", 
        JSON.stringify(notesObj));

    showNotes();
}