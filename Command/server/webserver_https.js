// var http = require('http'); 
const https = require('https');
const fs = require('fs');
const cors = require('http-cors');

const path = 'd:/2_Work/Y2_courseworks/Instability_Rover/Instability/Command/';

const options = {
  key: fs.readFileSync(path+'server/key.pem'),
  cert: fs.readFileSync(path+'server/cert.pem')
};

const requestListener = function (req, res) {
    if (cors(req, res)) return

    console.dir(req.method)
    console.log(req.body)
    

    if (req.method == 'POST') {
        console.log('POST')
        var body = ''
        req.on('data', function(data) {
            body += data
            console.log('Partial body: ' + body)
        })
        switch (req.url) {
            case "/moveto":
                req.on('end', function() {
                    console.log('Body: ' + body)
                    fs.writeFileSync(path+'data/moveto.json', body)
                    res.writeHead(200)
                    res.end('post received')
                })
            break
            case "/joystick":
                req.on('end', function() {
                    console.log('Body: ' + body)
                    fs.writeFileSync(path+'data/joystick.json', body)
                    res.writeHead(200)
                    res.end('post received')
                })
            break
            default:
                res.writeHead(404);
                res.end(JSON.stringify({error:"Resource not found to POST to"}));
            
        
        }
    } else {
        console.log('GET')
        res.setHeader("Content-Type", "application/json");
    
    switch (req.url) {
        case '/':
            res.writeHead(200);
            res.end(
                fs.readFileSync(path+'data/pathNode.json')
            );
            break
        case "/start":
            res.writeHead(200);
            res.end(fs.readFileSync(path+'data/start.json'));
            break
        case "/end":
            res.writeHead(200);
            res.end(fs.readFileSync(path+'data/end.json'));
            break
        case "/nodes":
            res.writeHead(200);
            res.end(fs.readFileSync(path+'data/nodes.json'));
            break
        case "/currentNode":
            res.writeHead(200);
            res.end(fs.readFileSync(path+'data/currentNode.json'));
            break
        case "/edges":
            res.writeHead(200);
            res.end(fs.readFileSync(path+'data/edges.json'));
            break
        case "/alien":
            res.writeHead(200);
            res.end(fs.readFileSync(path+'data/alien.json'));
            break
        case "/obstacle":
            res.writeHead(200);
            res.end(fs.readFileSync(path+'data/obstacle.json'));
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
        case "/radar":
            res.writeHead(200);
            res.end(fs.readFileSync(path+'data/radar.json'));
            break
        case "/moveto":
            res.writeHead(200)
            res.end(fs.readFileSync(path+'data/moveto.json'));
            break
        case "/joystick":
            res.writeHead(200)
            res.end(fs.readFileSync(path+'data/joystick.json'));
            break
        default:
            res.writeHead(404);
            res.end(JSON.stringify({error:"Resource not found - TRY / or /status or anything under status"}));
        }
    }
}

var server = https.createServer(options, requestListener); 
// var server = http.createServer(requestListener); 

port = 8000

console.log('WEB Server is running on port ', port); 
server.listen(port);
