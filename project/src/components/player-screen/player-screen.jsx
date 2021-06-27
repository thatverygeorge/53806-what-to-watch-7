import React from 'react';
import PropTypes from 'prop-types';
import filmProp from '../film-screen/film.prop';
import {AppRoute} from '../../const';
import {useHistory, useParams} from 'react-router-dom';
import {formatRunTimeForPlayer} from '../../utils';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function PlayerScreen(props) {
  const history = useHistory();
  const {id} = useParams();
  const {films} = props;
  const film = films.find((currentFilm) => currentFilm.id.toString() === id);

  if (!film) {
    return <NotFoundScreen />;
  }

  return (
    <div className="player">
      <video src={film.videoLink} className="player__video" poster={film.backgroundImage}></video>

      <button type="button" className="player__exit" onClick={() => history.push(AppRoute.MAIN)}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="0" max="100"></progress>
            <div className="player__toggler">Toggler</div>
          </div>
          <div className="player__time-value">{formatRunTimeForPlayer(film.runTime)}</div>
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

PlayerScreen.propTypes = {
  films: PropTypes.arrayOf(
    filmProp,
  ),
};

export default PlayerScreen;
