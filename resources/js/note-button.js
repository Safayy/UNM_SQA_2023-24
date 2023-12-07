import videoListManager from './video-manager.js';
import formatTime from './share.js';

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
    console.log(notesObj.length);
    notesObj.push(noteContent);
    console.log(notesObj.length);
    localStorage.setItem("notes",JSON.stringify(notesObj));
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

function showNotes() {
    stopHighlighting();
    currentnoteObj = [];
    
    let html = "";

    html = `<div class="noteCard my-2 mx-2 card" 
        style="width: 18rem;">
            <div class="card-body">`;

    if (videoListManager.videoCurrent === undefined){
        console.log('Video is loading');
    } else {
        notesObj.forEach(function(note,index) {
            if (note.id == videoListManager.videoCurrent.id){
                currentnoteObj.push({ note: note, index: index });
            }
        });
        startHighlighting();
    }

    currentnoteObj.forEach(function(item,index){
        var note = item.note;
        var index = item.index;
        var deleteButtonId = `deleteButton_${index}`;
        var editButtonId = `editButton_${index}`;
        var saveButtonId = `saveButton_${index}`;
        var inputFieldId = `inputField_${index}`;
        var noteTextId = `noteText_${index}`;

        html += `
        <div class="note">
                <p class="card-text"> 
                <b>Time: ${formatTime(note.time)}</b>
                </p>
                <p id="${noteTextId}" class="card-text"> 
                ${note.text}
                </p>
        </div>
        <button id="${editButtonId}" class="edit-button"><i class="fa fa-pencil icon"></i></button>
        <button id="${deleteButtonId}" class="delete-button"><i class="fa fa-trash-o icon"></i></button>
        <input type="text" id="${inputFieldId}" style="display:none;">
        <button id="${saveButtonId}" class="save-button" style="display:none;">Save</button>`;
    })

    let notesElm = document.getElementById("notes");

    if (currentnoteObj.length != 0){
        // Remove existing event listener before adding a new one
        notesElm.removeEventListener('click', handleButtonClick);
        notesElm.innerHTML = html;
        // Attach a single event listener to the parent element (notesElm)
        notesElm.addEventListener('click', handleButtonClick);
    }
    else
        notesElm.innerHTML = `Nothing to show! 
        Use "Add a Note" section above to add notes.`;
}

function handleButtonClick(event) {
    // Check if the clicked element is a delete button
    if (event.target.classList.contains('delete-button')) {
        var index = event.target.id.split('_')[1];
        deleteNote(index);
    } else if (event.target.classList.contains('edit-button')) {
        var index = event.target.id.split('_')[1];
        editNote(index);
    } else if (event.target.classList.contains('save-button')) {
        var index = event.target.id.split('_')[1];
        saveNote(index);
    }
}

// Function to delete a note
function deleteNote(index) {

    console.log(index);
    // Use splice to remove the item at the specified index
    notesObj.splice(index, 1);
    
    localStorage.setItem("notes", JSON.stringify(notesObj));

    showNotes();
}

function editNote(index) {
    var inputFieldId = `inputField_${index}`;
    var saveButtonId = `saveButton_${index}`;
    var editButtonId = `editButton_${index}`;

    // Show the input field and Save button, hide the Edit button
    document.getElementById(inputFieldId).style.display = 'block';
    document.getElementById(saveButtonId).style.display = 'inline-block';
    document.getElementById(editButtonId).style.display = 'none';

    // Set the input field value to the current note text
    var noteText = notesObj[index].text;
    document.getElementById(inputFieldId).value = noteText;
}

function saveNote(index) {
    var inputFieldId = `inputField_${index}`;
    var saveButtonId = `saveButton_${index}`;
    var editButtonId = `editButton_${index}`;
    var noteTextId = `noteText_${index}`;

    // Get the input field value
    var newNoteText = document.getElementById(inputFieldId).value;

    // Update the note text in the notesObj array
    notesObj[index].text = newNoteText;
    console.log(newNoteText);
    console.log(notesObj);
    //save it to localstorage
    localStorage.setItem("notes", JSON.stringify(notesObj));

    // Update the displayed note text
    document.getElementById(noteTextId).innerText = newNoteText;

    // Hide the input field and Save button, show the Edit button
    document.getElementById(inputFieldId).style.display = 'none';
    document.getElementById(saveButtonId).style.display = 'none';
    document.getElementById(editButtonId).style.display = 'inline-block';

}

let highlightInterval;

// Function to start continuously checking and highlighting notes
function startHighlighting() {
    highlightInterval = setInterval(function () {
        let currentTime = getCurrentTimeOutsideFunction();

        currentnoteObj.forEach(function (item, index) {
                var note = item.note;
                // Check if the current time is within the highlighting duration (1.5 seconds before and after)
                let isHighlighted = currentTime >= note.time - 1.5 && currentTime <= note.time + 1.5;

                // Add or remove the highlight class based on the condition
                toggleHighlight(index, isHighlighted);
        });
    }, 1000); // Check every second
}

// Function to stop continuously checking and highlighting notes
function stopHighlighting() {
    clearInterval(highlightInterval);
}

// Function to toggle the highlight class for a note
function toggleHighlight(index, isHighlighted) {
    let noteElements = document.getElementsByClassName("note");

    if (noteElements.length > index) {
        if (isHighlighted) {
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


export default { notesObj, showNotes };
