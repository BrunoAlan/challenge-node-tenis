const { Router } = require('express');
const router = Router();
const { getLogs } = require('../db');

router.route('/').get(async (req, res, next) => {
  try {
    const logs = await getLogs();
    res.json(logs);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
