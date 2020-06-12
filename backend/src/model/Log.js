const mongoose = require('mongoose');
const LogSchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  req: String,
  type: String,
});

module.exports = mongoose.model('Log', LogSchema);
