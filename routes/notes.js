//referenced from course work - module 24
const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

//get route for retrieving existing notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request recieved from notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.get('/:id', (req, res) => {
    console.info(`${req.method} request for single note recieved`);
    const noteDetail = (req.params.uid);
    readFromFile('./db/db.json').then((data) => {
        let noteDetail = res.json(JSON.parse(data));
        const note = noteDetail.find((note) => note.uid === noteUid);
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

notes.post('/', (req, res) => {
    console.log(req.body);
const { title, text } = req.body;

if (req.body) {
    const newNote = {
        title,
        text,
        uid: uuid(),
    };

    readAndAppend(newNote, 'db/db.json');
    res.json(`Note Added Sucessfully`);
    }  else {
        res.error('Error in adding Note')
    }
});

module.exports = notes;