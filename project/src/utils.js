export function formatRunTimeForPlayer(runTime) {
  const hours = Math.floor(runTime / 60);
  const minutes = runTime % 60 > 9 ? runTime % 60 : `0${runTime % 60}`;

  if (hours === 0) {
    return `${minutes}:00`;
  }

  return `${hours}:${minutes}:00`;
}

export function formatRunTimeForFilmDetails(runTime) {
  const hours = Math.floor(runTime / 60);
  const minutes = runTime % 60 > 9 ? runTime % 60 : `0${runTime % 60}`;

  if (hours === 0) {
    return `${minutes}m`;
  } else if (minutes === 0 || minutes === '00') {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
}

export function getRatingLevel(rating) {
  if (rating >= 0 && rating < 3) {
    return 'Bad';
  } else if (rating >= 3 && rating < 5) {
    return 'Normal';
  } else if (rating >= 5 && rating < 8) {
    return 'Good';
  } else if (rating >= 8 && rating < 10) {
    return 'Very Good';
  }

  return 'Awesome';
}

export function excludeFilm(films, id) {
  return films.filter((film) => film.id !== id);
}

export function getFilmsByGenre(films, genre) {
  return genre === 'All genres' ? films : films.filter((film) => film.genre === genre);
}
