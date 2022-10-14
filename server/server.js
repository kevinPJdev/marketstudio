const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const authRoutes = require('./routes/authRoute');
const productRoutes = require('./routes/productRoute');
const cartRoutes = require('./routes/cartRoute');
const orderRoutes = require('./routes/orderRoute');

const app = express();
app.use(express.json());

app.use('/api',authRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
app.use('/api',orderRoutes);

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

