import videoListManager from './video-manager.js';
import formatTime from './share.js';

// showNotes();

var notesObj;

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
        time: currenttime,
        id: videoListManager.videoCurrent.id
    };

    notesObj.push(noteContent);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";

    showNotes();
});

function getCurrentTimeOutsideFunction() {
    if (videoListManager.player) {
        var currentTime = videoListManager.player.getCurrentTime();
        return currentTime;
    } else {
        return 0;
    }
}

// Function to show elements from localStorage
function showNotes() {
    console.log('Showing notes');
    let notes = localStorage.getItem("notes");

    if (notes == null) notesObj = [];
    else notesObj = JSON.parse(notes);

    let html = "";

    html = `<div class="noteCard my-2 mx-2 card" 
        style="width: 18rem;">
            <div class="card-body">`;

    if (videoListManager.videoCurrent === undefined){
        console.log('Video is loading');
    } else {
        notesObj.forEach(function(note, index) {
            if (note.id == videoListManager.videoCurrent.id){
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
    }

    let deleteButton = document.createElement("button");
    deleteButton.id = "dlt";
    deleteButton.classList.add("btn", "btn-primary");
    deleteButton.textContent = "Delete Note";

    deleteButton.addEventListener("click", function () {
        deleteNote(deleteButton.id);
    });

    let notesElm = document.getElementById("notes");

    if (notesObj.length != 0){
        notesElm.innerHTML = html;
        notesElm.appendChild(deleteButton);
    }
    else
        notesElm.innerHTML = `Nothing to show! 
        Use "Add a Note" section above to add notes.`;
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
export default {notesObj, showNotes};