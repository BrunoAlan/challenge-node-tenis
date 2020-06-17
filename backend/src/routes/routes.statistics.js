const { Router } = require('express');
require('dotenv').config();
const router = Router();
const { saveLog } = require('../db');

let resAustralia, resRolandGarros, resWimbledon, resUS;
let usOpenWinners, australianWinners, wimbledonWinners, rolandGarrosWinner;

//connect to google sheet
const { google } = require('googleapis');
const { cloudfunctions } = require('googleapis/build/src/apis/cloudfunctions');
//
const client = new google.auth.JWT(
  process.env.CLIENT_EMAIL,
  null,
  process.env.PRIVATE_KEY,
  ['https://www.googleapis.com/auth/spreadsheets'],
);

client.authorize((err, tokens) => {
  if (err) {
    console.log(err);
    saveLog('Spread sheet API', 'Error');
    return;
  } else {
    saveLog('Spread sheet API', 'Success');
    googleSheetRun(client);
  }
});

async function googleSheetRun(cl) {
  const gs = google.sheets({ version: 'v4', auth: cl });
  const opt = {
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: 'A2:P4115',
  };
  data = await gs.spreadsheets.values.get(opt);
  allTourney = data.data.values;

  let rolandGarros = filterTourneySlug(allTourney, '520');
  let wimbledon = filterTourneySlug(allTourney, '540');
  let usOpen = filterTourneySlug(allTourney, '560');
  let australianOpen = filterTourneySlug(allTourney, '580');

  //All winners of each grand slam ordered by wins
  usOpenWinners = groupWinners(usOpen);
  australianWinners = groupWinners(australianOpen);
  wimbledonWinners = groupWinners(wimbledon);
  rolandGarrosWinners = groupWinners(rolandGarros);

  //Last win of the most winner player of each grand slam
  lastWin(rolandGarrosWinners[0][0], rolandGarros);
  lastWin(usOpenWinners[0][0], usOpen);
  lastWin(australianWinners[0][0], australianOpen);
  lastWin(wimbledonWinners[0][0], wimbledon);

  resRolandGarros = joinData(
    rolandGarrosWinners[0][0],
    rolandGarrosWinners[0][1],
    lastWin(rolandGarrosWinners[0][0], rolandGarros),
  );

  resAustralia = joinData(
    australianWinners[0][0],
    australianWinners[0][1],
    lastWin(australianWinners[0][0], australianOpen),
  );

  resWimbledon = joinData(
    wimbledonWinners[0][0],
    wimbledonWinners[0][1],
    lastWin(wimbledonWinners[0][0], wimbledon),
  );

  resUS = joinData(
    usOpenWinners[0][0],
    usOpenWinners[0][1],
    lastWin(usOpenWinners[0][0], usOpen),
  );
}

//FUNCTIONS
function filterTourneySlug(allTourney, tourney_id) {
  return allTourney.filter((tourney) => tourney[3] == tourney_id);
}

function groupWinners(tourney_slug) {
  result = {};
  for (var i = 0; i < tourney_slug.length; ++i) {
    if (!result[tourney_slug[i][15]]) {
      result[tourney_slug[i][15]] = 0;
    }
    result[tourney_slug[i][15]]++;
  }
  let entries = Object.entries(result);
  let sorted = entries.sort((a, b) => b[1] - a[1]);
  return sorted;
} //jugadores por tourney_slug de acuerdo a su cantidad de victorias

function lastWin(player, tourney_slug) {
  let result;
  result = tourney_slug.filter((tourney) => tourney[15] == player);
  return result[result.length - 1][6];
}

function joinData(player, wins, date) {
  return { player: player, wins: wins, lastWin: date };
}

//ROUTES

//TOP WINNER, DATE AND LAS WIN
router.route('/wimbledon').get((req, res, next) => {
  saveLog(req.url, 'Success');
  res.send(resWimbledon);
});

router.route('/rolandgarros').get((req, res, next) => {
  saveLog(req.url, 'Success');
  res.send(resRolandGarros);
});

router.route('/australian').get((req, res, next) => {
  saveLog(req.url, 'Success');
  res.send(resAustralia);
});
router.route('/usopen').get((req, res, next) => {
  saveLog(req.url, 'Success');
  res.send(resUS);
});

//TOP WINNERS
router.route('/usopenWinners').get((req, res, next) => {
  saveLog(req.url, 'Success');
  res.send(usOpenWinners);
});

router.route('/wimbledonWinners').get((req, res, next) => {
  saveLog(req.url, 'Success');
  res.send(wimbledonWinners);
});

router.route('/australianWinners').get((req, res, next) => {
  saveLog(req.url, 'Success');
  res.send(australianWinners);
});

router.route('/rgWinners').get((req, res, next) => {
  saveLog(req.url, 'Success');
  res.send(rolandGarrosWinners);
});

module.exports = router;
