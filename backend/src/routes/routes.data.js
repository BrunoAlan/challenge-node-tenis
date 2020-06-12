const { Router } = require('express');
const router = Router();

const { google } = require('googleapis');
const keys = require('../../json/credentials.json');

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  'https://www.googleapis.com/auth/spreadsheets',
]);

client.authorize((err, tokens) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('Conectado');
    googleSheetRun(client);
  }
});

let data;
let allTourneys;

function esGrandSlam(torneo) {
  return (
    torneo == '520' || torneo == '540' || torneo == '560' || torneo == '580'
  );
}

async function googleSheetRun(cl) {
  const gs = google.sheets({ version: 'v4', auth: cl });
  const opt = {
    spreadsheetId: '1j4MVmWvjw10RR2tkPEN_DOTl8LEnxkJZSk-_ftvlvEc',
    range: 'A2:P33',
  };
  data = await gs.spreadsheets.values.get(opt);
  allTourneys = data.data.values;
}

router.route('/').get((req, res) => res.send(allTourneys));

module.exports = router;
