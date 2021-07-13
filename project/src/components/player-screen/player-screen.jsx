import React, {useRef, useState} from 'react';
import {AppRoute} from '../../const';
import {useHistory} from 'react-router-dom';
import PlayerControls from '../player-controls/player-controls';
import {formatRunTimeForPlayer} from '../../utils';
import filmProp from '../film-screen/film.prop';

const MediaState = {
  PAUSE: 0,
  PLAYING: 1,
  TRANSITION: -1,
};

function PlayerScreen(props) {
  const {film} = props;
  const history = useHistory();

  const [playerState, setPlayerState] = useState({
    isPlaying: MediaState.PAUSE,
    isFullScreen: false,
    duration: '',
    currentTimeInPercentages: '',
  });
  const {isPlaying, isFullScreen, duration, currentTimeInPercentages} = playerState;
  const playerRef = useRef();

  const onPausePlayButtonClick = () => {
    if (isPlaying === MediaState.PAUSE) {
      setPlayerState((prevState) => ({
        ...prevState,
        isPlaying: MediaState.TRANSITION,
      }));

      playerRef.current.play()
        .then(() => {
          setPlayerState((prevState) => {
            if (prevState.isPlaying === MediaState.TRANSITION) {
              return {
                ...prevState,
                isPlaying: MediaState.PLAYING,
              };
            }
          });
        })
        .catch(() => {
          setPlayerState((prevState) => ({
            ...prevState,
            isPlaying: MediaState.PAUSE,
          }));
        });

      return;
    }

    playerRef.current.pause();
    setPlayerState((prevState) => ({
      ...prevState,
      isPlaying: MediaState.PAUSE,
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

  const onFullScreenButtonClick = () => {
    setPlayerState((prevState) => ({
      ...prevState,
      isFullScreen: !prevState.isFullScreen,
    }));

    document.addEventListener('keydown', handleEscapeKeydown);
  };

  const handleTimeUpdate = () => {
    setPlayerState((prevState) => ({
      ...prevState,
      currentTimeInPercentages: `${playerRef.current.currentTime * 100 / playerRef.current.duration}%`,
    }));
  };

  const handleDurationChange = (evt) => {
    setPlayerState((prevState) => ({
      ...prevState,
      duration: formatRunTimeForPlayer(evt.target.duration),
    }));
  };

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
          currentTimeInPercentages={currentTimeInPercentages}
          onPausePlayButtonClick={onPausePlayButtonClick}
          onFullScreenButtonClick={onFullScreenButtonClick}
        /> : ''}
    </div>
  );
}

PlayerScreen.propTypes = {
  film: filmProp,
};

export default PlayerScreen;
