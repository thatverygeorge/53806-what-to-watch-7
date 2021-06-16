import React, {useRef, useEffect} from 'react';
import filmProp from '../film-screen/film.prop';

function VideoPlayer(props) {
  const playerRef = useRef(null);
  const {film} = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      playerRef.current.play();
    }, 1000);
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

VideoPlayer.propTypes = {
  film: filmProp,
};

export default VideoPlayer;
