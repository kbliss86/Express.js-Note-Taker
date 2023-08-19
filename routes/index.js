// pull in express module 
const express = require('express');

//pull in notes.js file
const notesRouter = require('./notes.js');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;
