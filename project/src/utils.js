import {RatingLabels} from './const';

export const formatRunTimeForPlayer = (runTime) => {
  const duration = Math.floor(runTime);

  let minutes = Math.floor(duration / 60);
  let seconds = duration - minutes * 60;
  let hours = Math.floor(minutes / 60);

  minutes = minutes % 60;

  hours = hours > 9 ? hours : `0${hours}`;
  minutes = minutes > 9 ? minutes : `0${minutes}`;
  seconds = seconds > 9 ? seconds : `0${seconds}`;

  if (hours === '00') {
    return `${minutes}:${seconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
};

export const formatRunTimeForFilmDetails = (runTime) => {
  const hours = Math.floor(runTime / 60);
  const minutes = runTime % 60 > 9 ? runTime % 60 : `0${runTime % 60}`;

  if (hours === 0) {
    return `${minutes}m`;
  } else if (minutes === 0 || minutes === '00') {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
};

export const getRatingLevel = (rating) => {
  if (rating < 3) {
    return RatingLabels.BAD;
  } else if (rating < 5) {
    return RatingLabels.NORMAL;
  } else if (rating < 8) {
    return RatingLabels.GOOD;
  } else if (rating < 10) {
    return RatingLabels.VERY_GOOD;
  } else if (rating >= 10) {
    return RatingLabels.AWESOME;
  }
};

export const excludeFilm = (films, id) => films.filter((film) => film.id !== id);

export const getFilmsByGenre = (films, genre) => genre === 'All genres' ? films : films.filter((film) => film.genre === genre);
