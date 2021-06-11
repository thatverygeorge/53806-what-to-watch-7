import React from 'react';
import {AppRoute} from '../../const';
import {useHistory, useLocation} from 'react-router-dom';

function PlayerScreen() {
  const history = useHistory();
  const location = useLocation();
  const {film} = location.state;

  function formatRunTime(runTime) {
    const hours = Math.floor(runTime / 60);
    const minutes = runTime % 60 !== 0 ? runTime % 60 : '00';

    return `${hours}:${minutes}`;
  }

  return (
    <div className="player">
      <video src={film.videoLink} className="player__video" poster={film.posterImage}></video>

      <button type="button" className="player__exit" onClick={() => history.push(AppRoute.MAIN)}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="0" max="100"></progress>
            <div className="player__toggler">Toggler</div>
          </div>
          <div className="player__time-value">{formatRunTime(film.runTime)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{film.name}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerScreen;