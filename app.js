const yargs = require('yargs');
// We are using yargs to parse the command line arguments ,

const chalk = require('chalk')

const {addNotes , getNote , removeNote, listNotes } = require('./notes');
const log  = console.log;

// We can customize the version acc to our needs
yargs.version('1.1.0');

// Now we need title to remove/read a specific note so adding a title property which contains a obj

// creating add command
yargs.command({
    command : 'add',
    describe : 'Here we will add some notes',
    builder : {  // builder property takes in a  obj which will support some options for the command
        title : {
            describe : 'Title here!!!',
            demandOption : true, // it means this property is required
            type : 'Array'
        },
        body : { // This property Will store the content of note 
            describe : 'Body Here',
            required : true,
            type : 'string'
        }
    },
    handler (argv) {
       addNotes(argv.title , argv.body); 
    }
});
// creating remove command
yargs.command({
    command : 'remove',
    describe : 'Here we will remove some notes',
    builder : {
        title : {
            describe : "Title to remove",
            required : true , 
            type : 'string'
        }
    },
    handler(argv) {
        removeNote(argv.title);
    }
});
yargs.command({
    command : 'list',
    describe : 'Here we will display some notes',
    handler () {
        listNotes();
    }
});
yargs.command({
    command : 'read',
    describe : 'Here we will read some notes',
    builder : {
        title : {
            type : 'string',
            demandOption : true ,
            describe : "Read a Note!"
        }
    },
    handler(argv) {
        getNote(argv.title);
    }
});

// When yargs command calls up ....yargs.parse() go through the process of parsing the arguments with configuration details u have given
yargs.parse();


