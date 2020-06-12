import React from 'react';

function PlayerStats({ wins, lastWin, setShowDetail }) {
  return (
    <div className="player-detail">
      <h2>TIMES WINNER</h2>
      <h3>{wins}</h3>
      <h2>LAST WIN</h2>
      <h3>{lastWin.replaceAll('.', '/')}</h3>
    </div>
  );
}

export default PlayerStats;
