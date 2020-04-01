const express = require('express');
const path    = require('path');
const request = require('request');

const app = express();
let savedData;
initAPI()
initAngularApp();




function initAPI() {
    app.get('/regions', (req, serverResponse) => {
        request('https://cdn.pravda.com/cdn/covid-19/ukraine.json', { json: true }, (err, res, body) => {
            serverResponse.status(200)
            .json(Array.isArray(body.regions) ? body.regions : JSON.parse(savedData));
        });
    });
}

function initAngularApp() {
    app.use(express.static('./dist'));

    app.get('/*', function(req,res) {
        res.sendFile(path.join(__dirname,'/dist/index.html'));
    });
    
    app.listen(process.env.PORT || 8080);
}

savedData = `[
    {"name":"vinnytsya","confirmed":49,"recovered":0,"deaths":0},
    {"name":"volyn","confirmed":7,"recovered":0,"deaths":0},
    {"name":"dnipropetrovsk","confirmed":9,"recovered":1,"deaths":0},
    {"name":"donetsk","confirmed":6,"recovered":0,"deaths":0},
    {"name":"zhytomyr","confirmed":5,"recovered":0,"deaths":1},
    {"name":"transcarpathia","confirmed":1,"recovered":0,"deaths":0},
    {"name":"zaporizhzhya","confirmed":13,"recovered":1,"deaths":0},
    {"name":"ivanofrankivsk","confirmed":64,"recovered":0,"deaths":3},
    {"name":"kiev","confirmed":57,"recovered":1,"deaths":3},
    {"name":"kirovohrad","confirmed":6,"recovered":0,"deaths":0},
    {"name":"luhansk","confirmed":3,"recovered":0,"deaths":0},
    {"name":"lviv","confirmed":6,"recovered":0,"deaths":0},
    {"name":"mykolayiv","confirmed":0,"recovered":0,"deaths":0},
    {"name":"odessa","confirmed":12,"recovered":0,"deaths":0},
    {"name":"poltava","confirmed":2,"recovered":0,"deaths":0},
    {"name":"rivne","confirmed":15,"recovered":0,"deaths":3},
    {"name":"sumy","confirmed":19,"recovered":0,"deaths":2},
    {"name":"ternopil","confirmed":98,"recovered":0,"deaths":1},
    {"name":"kharkiv","confirmed":1,"recovered":0,"deaths":0},
    {"name":"kherson","confirmed":1,"recovered":0,"deaths":0},
    {"name":"khmelnytskyy","confirmed":3,"recovered":0,"deaths":0},
    {"name":"cherkasy","confirmed":52,"recovered":0,"deaths":0},
    {"name":"chernivtsi","confirmed":90,"recovered":7,"deaths":4},
    {"name":"chernihiv","confirmed":2,"recovered":0,"deaths":0},
    {"name":"kievcity","confirmed":134,"recovered":0,"deaths":0},
    {"name":"crimea","confirmed":16,"recovered":0,"deaths":0},
    {"name":"sevastopol","confirmed":0,"recovered":0,"deaths":0}
]`