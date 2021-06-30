import React, {useEffect, useState} from 'react';
import {AppRoute} from '../../const';
import {useHistory, useParams} from 'react-router-dom';
import {formatRunTimeForPlayer} from '../../utils';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import {adaptToClient} from '../../store/adapter';
import {APIRoute} from '../../const';
import {createAPI} from '../../services/api';

function PlayerScreen() {
  const history = useHistory();
  const {id} = useParams();
  const [filmState, setFilmState] = useState({
    film: undefined,
    isFetchComplete: false,
  });
  const {film, isFetchComplete} = filmState;

  useEffect(() => {
    (async function() {
      const api = createAPI();
      try {
        const filmResponse = await api.get(`${APIRoute.FILMS}/${id}`);
        setFilmState((prevState) => (
          {
            ...prevState,
            film: adaptToClient(filmResponse.data),
            isFetchComplete: true,
          }
        ));
      } catch (error) {
        setFilmState((prevState) => (
          {
            ...prevState,
            isFetchComplete: true,
          }
        ));
      }
    })();
  }, [id]);

  if (!film) {
    if(!isFetchComplete) {
      return <LoadingScreen />;
    }

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

export default PlayerScreen;
