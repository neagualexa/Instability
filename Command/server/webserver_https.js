
// var http = require('http'); 
const https = require('https');
const fs = require('fs');
const cors = require('http-cors');

const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

const books = JSON.stringify([
    { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
    { title: "The Prophet", author: "Kahlil Gibran", year: 1923 }
]);

const authors = JSON.stringify([
    { name: "Paulo Coelho", countryOfBirth: "Brazil", yearOfBirth: 1947 },
    { name: "Kahlil Gibran", countryOfBirth: "Lebanon", yearOfBirth: 1883 }
]);

const requestListener = function (req, res) {
    if (cors(req, res)) return

    res.setHeader("Content-Type", "application/json");
    switch (req.url) {
        case '/':
            res.writeHead(200);
            res.end(
                `{
                    "position": {
                        "x": 320,
                        "y": 25
                    }
                }`);
            break
        case "/books":
            res.writeHead(200);
            res.end(books);
            break
        case "/authors":
            res.writeHead(200);
            res.end(authors);
            break
        default:
            res.writeHead(404);
            res.end(JSON.stringify({error:"Resource not found - TRY / or /books or /authors"}));
    }
}

var server = https.createServer(options, requestListener); 
// var server = http.createServer(requestListener); 

console.log('Server is running on port 8000'); 
server.listen(8000);
