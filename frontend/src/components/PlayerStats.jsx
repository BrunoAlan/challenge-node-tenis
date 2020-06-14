import React from 'react';

function PlayerStats({ wins, lastWin, setShowAllStats }) {
  const formatDate = (date) => {
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const handleClick = () => {
    setShowAllStats(true);
    console.log('click');
  };

  formatDate(lastWin);
  return (
    <div className="player-detail">
      <h2>TIMES WINNER</h2>
      <h3>{wins}</h3>
      <h2>LAST WIN</h2>
      <h3>{formatDate(lastWin)}</h3>
      <button className="btn" onClick={handleClick}>
        ALL STATS
      </button>
    </div>
  );
}

export default PlayerStats;
