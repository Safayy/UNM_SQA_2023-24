import videoListManager from './video-manager.js';
import formatTime from './share.js';

// showNotes();

var notesObj;
let notes = localStorage.getItem("notes");
    if (notes == null) notesObj = [];
    else notesObj = JSON.parse(notes);
var currentnoteObj;

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
    let addTxt = document.getElementById("addTxt");
    
    let currenttime = getCurrentTimeOutsideFunction();

    let noteContent = {
        text: addTxt.value,
        time: currenttime,
        id: videoListManager.videoCurrent.id
    };

    notesObj.push(noteContent);
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

// Function to clear existing notes
function clearNotes() {
    let notesElm = document.getElementById("notes");
    notesElm.innerHTML = ""; // Clears the inner HTML, removing all existing notes
}

function showNotes() {
    stopHighlighting();
    currentnoteObj = [];
    console.log('Showing notes');
    
    let html = "";

    html = `<div class="noteCard my-2 mx-2 card" 
        style="width: 18rem;">
            <div class="card-body">`;

    if (videoListManager.videoCurrent === undefined){
        console.log('Video is loading');
    } else {
        notesObj.forEach(function(note,index) {
            if (note.id == videoListManager.videoCurrent.id){
                currentnoteObj.push(note);
            }
        });
        startHighlighting();
    }

    currentnoteObj.forEach(function(note,index){
        html += `
        <div class="note">
                <p class="card-text"> 
                <b>Time: ${formatTime(note.time)}</b>
                </p>
                <p class="card-text"> 
                ${note.text}
                </p>
        </div>`;      
    })

    let deleteButton = document.createElement("button");
    deleteButton.id = "dlt";
    deleteButton.classList.add("btn", "btn-primary");
    deleteButton.textContent = "Delete Note";

    /*deleteButton.addEventListener("click", function () {
        deleteNote(deleteButton.id);
    });*/

    let notesElm = document.getElementById("notes");

    if (currentnoteObj.length != 0){
        notesElm.innerHTML = html;
        notesElm.appendChild(deleteButton);
    }
    else
        notesElm.innerHTML = `Nothing to show! 
        Use "Add a Note" section above to add notes.`;
}

// Function to edit a note
function editNote(noteId) {
    console.log(noteId);
    let notes = localStorage.getItem("notes");

    if (notes == null) notesObj = [];
    else notesObj = JSON.parse(notes);

    let editTxt = document.getElementById("addTxt");
    let editNoteContent = notesObj.find(note => note.id === noteId);

    if (editNoteContent) {
        // Set the text of the note to the input field for editing
        editTxt.value = editNoteContent.text;

        // Update the note content after editing
        let saveBtn = document.createElement("button");
        saveBtn.id = "saveBtn";
        saveBtn.classList.add("btn", "btn-primary");
        saveBtn.textContent = "Save";

        saveBtn.addEventListener("click", function () {
            editNoteContent.text = editTxt.value;
            localStorage.setItem("notes", JSON.stringify(notesObj));
            editTxt.value = "";
            showNotes();
        });

        let notesElm = document.getElementById("notes");
        notesElm.innerHTML = ""; // Clear previous content
        notesElm.appendChild(editTxt);
        notesElm.appendChild(saveBtn);
    }
}


let highlightInterval;

// Function to start continuously checking and highlighting notes
function startHighlighting() {
    console.log("Start highlighting");
    highlightInterval = setInterval(function () {
        let currentTime = getCurrentTimeOutsideFunction();
        console.log("Start counting");

        currentnoteObj.forEach(function (note, index) {
                console.log("checking note");
                // Check if the current time is within the highlighting duration (1.5 seconds before and after)
                let isHighlighted = currentTime >= note.time - 1.5 && currentTime <= note.time + 1.5;

                // Add or remove the highlight class based on the condition
                toggleHighlight(index, isHighlighted);
        });
    }, 1000); // Check every second
}

// Function to stop continuously checking and highlighting notes
function stopHighlighting() {
    console.log("Stop highlighting");
    clearInterval(highlightInterval);
}

// Function to toggle the highlight class for a note
function toggleHighlight(index, isHighlighted) {
    let noteElements = document.getElementsByClassName("note");

    if (noteElements.length > index) {
        console.log("checking note 2");
        if (isHighlighted) {
            console.log("highlight");
            noteElements[index].classList.add("highlight");
            setTimeout(() => {
                removeHighlight(index);
            }, 3000);
        } else {
            noteElements[index].classList.remove("highlight");
        }
    }
}

// Function to remove highlighting class
function removeHighlight(index) {
    let notesElm = document.getElementById("notes");
    let noteElements = notesElm.getElementsByClassName("note");

    if (noteElements.length > index) {
        noteElements[index].classList.remove("highlight");
    }
}

// Function to delete a note
function deleteNote(index) {

    currentnoteObj.splice(index, 1);

    localStorage.setItem("notes", 
        JSON.stringify(notesObj));

    showNotes();
}
export default { notesObj, showNotes };
