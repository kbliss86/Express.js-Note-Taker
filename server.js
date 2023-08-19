//pull in express and path
const express = require('express');
const path = require('path');
//pull in route for API's
const api = require('./routes/index.js');

const app = express();
//set port to 3001
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', api);

//set public folder as static asset
app.use(express.static('public'));

//pull in route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
)

//pull route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);

