import React from 'react';
import PropTypes from 'prop-types';

function PlayerControls(props) {
  const {
    name,
    isPlaying,
    duration,
    currentTimeInPrecentages,
    handlePausePlayClick,
    handleFullScreenClick,
  } = props;

  return (
    <div className="player__controls">
      <div className="player__controls-row">
        <div className="player__time">
          <progress className="player__progress" value="0" max="100"></progress>
          <div className="player__toggler" style={{ left: `${currentTimeInPrecentages}` }}>Toggler</div>
        </div>
        <div className="player__time-value">{duration}</div>
      </div>

      <div className="player__controls-row">
        <button type="button" className="player__play" onClick={handlePausePlayClick}>
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref={isPlaying ? '#pause' : '#play-s'}></use>
          </svg>
          <span>Play</span>
        </button>
        <div className="player__name">{name}</div>

        <button type="button" className="player__full-screen" onClick={handleFullScreenClick}>
          <svg viewBox="0 0 27 27" width="27" height="27">
            <use xlinkHref="#full-screen"></use>
          </svg>
          <span>Full screen</span>
        </button>
      </div>
    </div>
  );
}

PlayerControls.propTypes = {
  name: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  duration: PropTypes.string.isRequired,
  currentTimeInPrecentages: PropTypes.string.isRequired,
  handlePausePlayClick: PropTypes.func.isRequired,
  handleFullScreenClick: PropTypes.func.isRequired,
};

export default PlayerControls;
