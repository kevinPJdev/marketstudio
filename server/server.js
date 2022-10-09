const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();
app.use(express.json());

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.send(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const dbURI = config.get('dbURI');
const port = process.env.PORT || 4000;

mongoose.connect(dbURI,  {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(port))
  .then(() => console.log("Server is listening on port ", port ))
  .catch((err) => console.log(err));