import React from 'react';

function CompleteStats({ allWinners, setShowAllStats }) {
  const topTen = () => {
    let top = [];
    if (allWinners.length > 0) {
      for (let player = 0; player < 10; player++) {
        top.push(
          <p
            key={allWinners[0][player][0]}
          >{`${allWinners[0][player][0]} : ${allWinners[0][player][1]} `}</p>,
        );
      }
    }
    console.log(allWinners);

    return top;
  };

  return (
    <div className="all-stats">
      <h1>MOST WINNERS</h1>
      <h3>{topTen()}</h3>
      <button onClick={() => setShowAllStats(false)}>BACK</button>
    </div>
  );
}

export default CompleteStats;
