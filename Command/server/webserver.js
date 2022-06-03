const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())

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


//at specific sublinks:
app.get('/', (req, res) => {
    res.json({
        message: 'Hello to backend SERVER'
    });
});

app.get('/:name', (req, res) => {
    let name = req.params.name;

    res.json({
        message: `Hello ${name}`
    });
});

app.listen(2020, () => {
    console.log('server is listening on port 2020');
});
