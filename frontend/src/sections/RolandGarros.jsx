import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import Tourney from '../components/Tourney';

function RolandGarros() {
  const API = 'http://localhost:4000/api/statistics/';

  const [mostWinner, setmostWinner] = useState('');
  const [wins, setWins] = useState('');
  const [lastWin, setLastWin] = useState('');
  const [allWinners, setAllWinners] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/statistics/usopenwinners')
      .then((res) => {
        setAllWinners((allWinners) => [...allWinners, res.data]);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/rolandgarros`)
      .then((res) => {
        setmostWinner(res.data.player);
        setWins(res.data.wins);
        setLastWin(res.data.lastWin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="rolandgarros-section" id="rolandGarros">
      <Tourney
        slug="Roland Garros"
        location={'Paris, France'}
        surface={'Clay'}
        image={'/rg_logo.png'}
        mostWinner={mostWinner}
        wins={wins}
        lastWin={lastWin}
      />
    </div>
  );
}

export default RolandGarros;
