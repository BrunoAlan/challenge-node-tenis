const Log = require('./model/Log');

function saveLog(req, type) {
  const log = new Log({
    req: req,
    type: type,
  });
  log
    .save()
    .then()
    .catch((err) => console.log(err));
}

module.exports = saveLog;
