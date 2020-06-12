const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Log = require('./model/Log');

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//db connection
mongoose.connect(
  'mongodb+srv://alan:1234asd@cluster0-8zhwt.mongodb.net/logs?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('db connect'),
);

//routes
app.use('/api/allData', require('./routes/routes.data'));
app.use('/api/statistics', require('./routes/routes.statistics'));
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
  const log = new Log({
    req: req.url,
    type: 'Error',
  });
  log
    .save()
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  console.log(req.url);
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
