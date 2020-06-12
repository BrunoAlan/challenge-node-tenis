import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import Tourney from '../components/Tourney';

function Australian() {
  const API = 'http://localhost:4000/api/statistics/';

  const [mostWinner, setmostWinner] = useState('');
  const [wins, setWins] = useState('');
  const [lastWin, setLastWin] = useState('');

  useEffect(() => {
    axios
      .get(`${API}/australian`)
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
    <div className="australian-section" id="australian">
      <Tourney
        slug={'Australian Open'}
        location={'Melbourne, Australia'}
        surface={'Hard'}
        image={'/ao_logo.png'}
        mostWinner={mostWinner}
        wins={wins}
        lastWin={lastWin}
      />
    </div>
  );
}

export default Australian;
