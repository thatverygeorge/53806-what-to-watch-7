import React, {useEffect, useRef, useState} from 'react';
import {AppRoute, StoreKeys} from '../../const';
import {useHistory, useParams} from 'react-router-dom';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFilm} from '../../store/api-actions';
import {setIsDataLoaded} from '../../store/action';
import {getFilm} from '../../store/films/selectors';
import {getDataLoadedStatus} from '../../store/films/selectors';
import PlayerControls from '../player-controls/player-controls';
import {formatRunTimeForPlayer} from '../../utils';

function PlayerScreen() {
  const film = useSelector(getFilm);
  const isDataLoaded = useSelector((state) => getDataLoadedStatus(state, StoreKeys.FILM));
  const history = useHistory();
  const {id} = useParams();
  const dispatch = useDispatch();

  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    isFullScreen: false,
    duration: '',
    currentTimeInPrecentages: '',
  });
  const {isPlaying, isFullScreen, duration, currentTimeInPrecentages} = playerState;
  const playerRef = useRef();

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchFilm(id));
    }

    return () => {
      if (isDataLoaded) {
        dispatch(setIsDataLoaded({key: StoreKeys.FILM, isDataLoaded: false}));
      }
    };
  }, [dispatch, id, isDataLoaded]);

  const handlePausePlayClick = () => {
    isPlaying ? playerRef.current.pause() : playerRef.current.play();
    setPlayerState((prevState) => ({
      ...prevState,
      isPlaying: !prevState.isPlaying,
    }));
  };

  const handleEscapeKeydown = (evt) => {
    if (evt.key === 'Escape') {
      setPlayerState((prevState) => ({
        ...prevState,
        isFullScreen: !prevState.isFullScreen,
      }));

      document.removeEventListener('keydown', handleEscapeKeydown);
    }
  };

  const handleFullScreenClick = () => {
    setPlayerState((prevState) => ({
      ...prevState,
      isFullScreen: !prevState.isFullScreen,
    }));

    document.addEventListener('keydown', handleEscapeKeydown);
  };

  const handleTimeUpdate = () => {
    setPlayerState((prevState) => ({
      ...prevState,
      currentTimeInPrecentages: `${playerRef.current.currentTime * 100 / playerRef.current.duration}%`,
    }));
  };

  const handleDurationChange = (evt) => {
    setPlayerState((prevState) => ({
      ...prevState,
      duration: formatRunTimeForPlayer(evt.target.duration),
    }));
  };

  if (!isDataLoaded) {
    return <LoadingScreen />;
  }

  if (!film || film.id.toString() !== id) {
    return <NotFoundScreen />;
  }

  return (
    <div className="player">
      <video
        ref={playerRef}
        src={film.videoLink}
        className="player__video"
        poster={film.backgroundImage}
        onTimeUpdate={handleTimeUpdate}
        onDurationChange={handleDurationChange}
      >
      </video>

      <button type="button" className="player__exit" onClick={() => history.push(AppRoute.MAIN)}>Exit</button>

      {!isFullScreen ?
        <PlayerControls
          name={film.name}
          isPlaying={isPlaying}
          duration={duration}
          currentTimeInPrecentages={currentTimeInPrecentages}
          handlePausePlayClick={handlePausePlayClick}
          handleFullScreenClick={handleFullScreenClick}
        /> : ''}
    </div>
  );
}

export default PlayerScreen;
