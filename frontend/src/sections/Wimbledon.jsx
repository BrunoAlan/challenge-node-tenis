import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import Tourney from '../components/Tourney';
function Wimbledon() {
  const API = 'http://localhost:4000/api/statistics/';
  const [mostWinner, setmostWinner] = useState('');
  const [wins, setWins] = useState('');
  const [lastWin, setLastWin] = useState('');
  const [allWinners, setAllWinners] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/wimbledon`)
      .then((res) => {
        setmostWinner(res.data.player);
        setWins(res.data.wins);
        setLastWin(res.data.lastWin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/wimbledonWinners`)
      .then((res) => {
        setAllWinners((allWinners) => [...allWinners, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="wimbledon-section" id="wimbledon">
      <Tourney
        slug={'Wimbledon'}
        location={'Londond, United Kingdom'}
        surface={'Grass'}
        image={'/wimbledon_logo.png'}
        mostWinner={mostWinner}
        wins={wins}
        lastWin={lastWin}
        allWinners={allWinners}
      />
    </div>
  );
}

export default Wimbledon;
