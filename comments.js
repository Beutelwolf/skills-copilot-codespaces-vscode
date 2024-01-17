// Create web server application that will render comments from a file
// on the server
// The file should contain an array of objects with the following structure:
// [
//   {
//     name: "John Doe",
//     comment: "Hello everyone"
//   },
//   {
//     name: "Jane Doe",
//     comment: "Hi, John"
//   }
// ]
// The application should have the following routes:
// GET /comments - returns all comments as a JSON array
// GET /comments/:n - returns the first n comments as a JSON array
// POST /comments - adds a new comment to the file

// 1. Read the file
// 2. Parse the file
// 3. Send the parsed data to the client

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) throw err;
    const comments = JSON.parse(data);
    res.json(comments);
  });
});

app.get('/comments/:n', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) throw err;
    const comments = JSON.parse(data);
    const n = parseInt(req.params.n);
    const firstNComments = comments.slice(0, n);
    res.json(firstNComments);
  });
});

app.post('/comments', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) throw err;
    const comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
      if (err) throw err;
      res.json(comments);
    });
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));