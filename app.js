const express = require('express');
const app = express();
const path = require('path');
const url = 'https://api.soundcloud.com';
const port = 3000;
const bodyParser = require('body-parser');
const { insertBookmark } = require('./routes/insertBookmark.js');
const { fetchBookmarks } = require('./routes/fetchBookmarks.js');
 
app.use(express.static('dist'));
  
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.post('/api/:id', insertBookmark);
app.get('/api/bookmarks', fetchBookmarks);
// handle all other requests and route them back to the homepage

app.listen(port, () => {
  console.log(`listening at ${port}`)
})

module.exports = { app }; 
