//pull in required files
const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

//get route for retrieving existing notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request recieved from notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//get route for pulling in details about specific note when its clicked on
//may not need this for it to work - handled by front end
notes.get('/:id', (req, res) => {
    console.info(`${req.method} request for single note recieved`);
    const noteDetail = (req.params.id);
    readFromFile('./db/db.json').then((data) => {
        let noteDetail = res.json(JSON.parse(data));
        const note = noteDetail.find((note) => note.id === noteId);
        if (note) {
            res.json(note);
        } else {
            res.status(404).json({error: 'Note detail note found'});
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({error: 'Error with server response'})
    });
});

//post route for adding in new notes
notes.post('/', (req, res) => {
    console.log(req.body);
const { title, text } = req.body;

if (req.body) {
    const newNote = {
        title,
        text,
        id: uuid(),
    };
    //add it to db.json file
    readAndAppend(newNote, 'db/db.json');
    res.json(`Note Added Sucessfully`);
    }  else {
        res.error('Error in adding Note')
    }
});
//route to delete the notes from the front end UI
notes.delete('/:id', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        let noteDetail = JSON.parse(data);
        console.log("This is the array: ", noteDetail)
        const noteId = (req.params.id);//important
        console.log("this is the note that we want to delete :", noteId)
        //use filter to pull and "keep" all of the notes EXCEPT the one i want deleted!
        const note = noteDetail.filter((note) => note.id !== noteId);
        console.log(note);
        writeToFile('db/db.json', note);
        res.json(`Note Deleted Sucessfully`);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({error: 'Error with server response'})
    });
    
})

module.exports = notes;