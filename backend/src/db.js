const Log = require('./model/Log');

async function saveLog(req, type) {
  const log = new Log({
    req: req,
    type: type,
  });
  await log
    .save()
    .then()
    .catch((err) => console.log(err));
}

async function getLogs() {
  const logs = await Log.find();
  return logs;
}

module.exports = {
  saveLog,
  getLogs,
};
