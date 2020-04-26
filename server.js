// Setup empty JS object to act as endpoint for all routes
projectData = [
    {temp: 292.09, city: 'Calgary', date: '3.21.2020', feelings: 'best kind by'},
    {temp: 292.09, city: 'Calgary', date: '3.21.2020', feelings: 'alright by'}
];
console.log(typeof projectData);

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 5500;

const server = app.listen(port, listening);

function listening(){
    console.log('server is running');
    console.log('server is : ' + port);
}

app.get('/getWeather', function (req, res){
    console.log(projectData);
    res.send(projectData);
});

app.post('/postWeather', function (req, res){
    newEntry = {
        temp: req.body.temp,
        city: req.body.city,
        date: req.body.date,
        feelings: req.body.feelings
    }
    projectData.push(newEntry);
    console.log(projectData);
    res.send(projectData);
});