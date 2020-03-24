const express = require('express');
const path    = require('path');
const request = require('request');

const app = express();
let regionsINFO = null;

getRegionsData();
initAPI()
initAngularApp();




function initAPI() {
    app.get('/regions', (req,res) => res.status(200)
    .json({ regions: regionsINFO }));
}

function initAngularApp() {
    app.use(express.static('./dist'));

    app.get('/*', function(req,res) {
        res.sendFile(path.join(__dirname,'/dist/index.html'));
    });
    
    app.listen(process.env.PORT || 8080);
}

function getRegionsData(res) { 
    request('https://cdn.pravda.com/cdn/covid-19/ukraine.json', { json: true }, (err, res, body) => {
        regionsINFO = body;
    });
}