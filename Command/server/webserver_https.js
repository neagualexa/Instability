// var http = require('http'); 
const https = require('https');
const fs = require('fs');
const cors = require('http-cors');

const path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/';

const options = {
  key: fs.readFileSync(path+'server/key.pem'),
  cert: fs.readFileSync(path+'server/cert.pem')
};

const books = JSON.stringify([
    { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
    { title: "The Prophet", author: "Kahlil Gibran", year: 1923 }
]);

// function refreshPage() {
//     window.location.reload(1);
// }

const requestListener = function (req, res) {
    if (cors(req, res)) return

    res.setHeader("Content-Type", "application/json");
    switch (req.url) {
        case '/':
            res.writeHead(200);
            res.end(
                fs.readFileSync(path+'data/pathNode.json')
            );
            // setTimeout(function(){
            //     refreshPage();
            // }, 2000)
            break
        case "/status":
                res.writeHead(200);
                res.end(fs.readFileSync(path+'data/status.json'));
                break
        case "/motors":
            res.writeHead(200);
            res.end(fs.readFileSync(path+'data/motors.json'));
            break
        case "/squal":
            res.writeHead(200);
            res.end(fs.readFileSync(path+'data/squal.json'));
            break
        default:
            res.writeHead(404);
            res.end(JSON.stringify({error:"Resource not found - TRY / or /status or anything under status"}));
    }
}

var server = https.createServer(options, requestListener); 
// var server = http.createServer(requestListener); 

port = 8000

console.log('WEB Server is running on port ', port); 
server.listen(port);
