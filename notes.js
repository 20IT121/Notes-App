const fs = require('fs');
const chalk = require('chalk')


const addNotes = (title , body)=>{
    
    // Now to store our data as array of objects,  we are returning empty array when we try to add our first note , in this way our data will be stored as an array of json
    

    const notes = loadNotes();
    
    // Now to avoid ambiguity we will check the title of new note doesn't match with title of notes existed

    const duplicateNotes = notes.find((note)=> note.title === title )
// filter() will go through all the notes no matter what comes along the way , even if we found the note of same title so its not efficient instead we can use find() method  it will return true if condn in callback func is satisfied
    
    console.log(notes);

    if(!duplicateNotes) {
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

let tempNotes = notes.filter((note)=> note.title != title ); // notes to keep

if(tempNotes.length === notes.length)
console.log(chalk.bgRed("Note doesn't Exist"));
else{
    console.log(chalk.bgGreen("Note Removed"));
    saveNotes(tempNotes);
}

}

const listNotes = ()=> {
    let notes =loadNotes();
        
    if(notes.length === 0)  log(chalk.red.  inverse("There are no notes , yet!!!"));
    
    
    else{
        console.log(chalk.red.bgCyan("-------------------------------")+chalk.cyan.inverse("Following are your notes")+chalk.red.bgCyan("-------------------------------"));
        
        for(let i=0; i<notes.length; i++)
            console.log(`Note - ${i+1}  ${chalk.red("Title")} : ${chalk.rgb(255,131,0)(notes[i].title)} , ${chalk.red("Body")} : ${chalk.rgb(255,131,0)(notes[i].body)})`);
    }
}

const getNote = (title)=>{
    let notes = loadNotes();
    
    let note = notes.find((note) => note.title === title); // Its gonna store just one note 
    if(note){ 
        console.log(chalk.green.inverse("Note Found"));
        console.log(chalk.red("Title :") , chalk.rgb(255,131,0)(note.title) , chalk.red("Body :") , chalk.rgb(255,131,0)(note.body));
    }
    else
        console.log(chalk.red.inverse("Note of this title doesn't Exist"));
}

module.exports = {
    getNote,
    addNotes,
    removeNote,
    listNotes
}