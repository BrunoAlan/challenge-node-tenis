const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config({ path: '../.env' });
const morgan = require('morgan');
const mongoose = require('mongoose');
const { saveLog } = require('./db');

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//db connection
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Mongo DB connected'),
);

//routes
app.use('/api/statistics', require('./routes/routes.statistics'));
app.use('/logs', require('./routes/routes.logs'));

//error handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  saveLog(req.url, 'Error');
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
