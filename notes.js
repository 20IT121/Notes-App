const fs = require('fs');
const chalk = require('chalk')

const getNotes = ()=>{

}

const addNotes = (title , body)=>{

// Now to store our data as array of objects,  we are returning empty array when we try to add our first note , in this way our data will be stored as an array of json


    const notes = loadNotes();

// Now to avoid ambiguity we will check the title of new note doesn't match with title of notes existed
    const duplicateNotes = notes.filter((note)=>{
        return note.title === title; 
    })
// If the titles are equal then we will keep that note and if titles are not equal we will filter out that note, so by looking at duplicateNotes we will get to know that if there is any duplicate note or not.

    console.log(notes);
    if(duplicateNotes.length === 0){ 
        console.log(chalk.green.inverse("New Note Added"));   
        notes.push({
            title : title,
            body : body
        });
        
        saveNotes(notes)
    }else{
        console.log(chalk.red.inverse("This title has been taken!"));
    }
    
}

const saveNotes = (notes)=>{
    let modifiedNotes = JSON.stringify(notes);
    fs.writeFileSync('notes.json',modifiedNotes);
}

const loadNotes = ()=>{
    try{
        let noteData = fs.readFileSync('notes.json','utf-8');
        let notes = JSON.parse(noteData)
        return notes;
    // if the file doesn't exist or the data in the file is not json then it will throw an error
    }catch(e){
        // so we will return en empty array , 0 notes are loaded
        return [];
    }
}

const removeNote = (title)=>{
    const notes = loadNotes();
    
// If that note of given title exist in notes then it will not be stored in tempNotes so our work of removing the note of given title is done , if that note doesn't exist then we'll display the msg

    let tempNotes = notes.filter((note)=>{  // notes to keep
        return note.title != title
    });

    if(tempNotes.length === notes.length)
        console.log(chalk.bgRed("Note doesn't Exist"));
    else{
        console.log(chalk.bgGreen("Note Removed"));
        saveNotes(tempNotes);
    }
    
}

module.exports = {
    getNotes,
    addNotes,
    removeNote
}