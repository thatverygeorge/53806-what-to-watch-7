import React, {useRef, useEffect} from 'react';
import filmProp from '../film-screen/film.prop';

const PLAY_TIMEOUT = 1000;

function SmallFilmCardPlayer(props) {
  const playerRef = useRef(null);
  const {film} = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      playerRef.current.play();
    }, PLAY_TIMEOUT);
    return () => clearTimeout(timer);
  }, []);

  return (
    <video
      src={film.previewVideoLink}
      ref={playerRef}
      className="player__video"
      width="280"
      height="175"
      poster={film.previewImage}
      muted
    />
  );
}

SmallFilmCardPlayer.propTypes = {
  film: filmProp,
};

export default SmallFilmCardPlayer;
