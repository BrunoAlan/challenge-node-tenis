import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import '../App.css';
import { Fragment } from 'react';
import PlayerStats from './PlayerStats';

function Tourney({
  slug,
  location,
  surface,
  image,
  mostWinner,
  lastWin,
  wins,
}) {
  const [showDetail, setShowDetail] = useState(false);

  const handleClick = () => {
    setShowDetail(!showDetail);
  };
  return (
    <Fragment>
      <div className="content">
        <div>
          <div className="content-title">
            <h1>{slug}</h1>
          </div>
          <h2>LOCATION</h2>
          <h3>{location}</h3>
          <h2>SURFACE</h2>
          <h3>{surface}</h3>
          <h2> MOST WINNER</h2>
          <h3 onClick={handleClick}>{mostWinner}</h3>
        </div>
        <img src={image} width="30%" alt="gm_logo" />
      </div>

      <Fade right when={showDetail}>
        <PlayerStats
          wins={wins}
          lastWin={lastWin}
          setShowDetail={setShowDetail}
        />
      </Fade>
    </Fragment>
  );
}

export default Tourney;
