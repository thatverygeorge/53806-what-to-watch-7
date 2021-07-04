export const adaptToClient = (film) => {
  const adaptedEvent = Object.assign(
    {},
    film,
    {
      posterImage: film.poster_image,
      previewImage: film.preview_image,
      backgroundImage: film.background_image,
      backgroundColor: film.background_color,
      videoLink: film.video_link,
      previewVideoLink: film.preview_video_link,
      scoresCount: film.scores_count,
      runTime: film.run_time,
      isFavorite: film.is_favorite,
    },
  );

  delete adaptedEvent.poster_image;
  delete adaptedEvent.preview_image;
  delete adaptedEvent.background_image;
  delete adaptedEvent.background_color;
  delete adaptedEvent.video_link;
  delete adaptedEvent.preview_video_link;
  delete adaptedEvent.scores_count;
  delete adaptedEvent.run_time;
  delete adaptedEvent.is_favorite;

  return adaptedEvent;
};

export const adaptToServer = (film) => {
  const adaptedEvent = Object.assign(
    {},
    film,
    {
      'poster_image': film.posterImage,
      'preview_image': film.previewImage,
      'background_image': film.backgroundImage,
      'background_color': film.backgroundColor,
      'video_link': film.videoLink,
      'preview_video_link': film.previewVideoLink,
      'scores_count': film.scoresCount,
      'run_time': film.runTime,
      'is_favorite': film.isFavorite,
    },
  );

  delete adaptedEvent.posterImage;
  delete adaptedEvent.previewImage;
  delete adaptedEvent.backgroundImage;
  delete adaptedEvent.backgroundColor;
  delete adaptedEvent.videoLink;
  delete adaptedEvent.previewVideoLink;
  delete adaptedEvent.scoresCount;
  delete adaptedEvent.runTime;
  delete adaptedEvent.isFavorite;

  return adaptedEvent;
};
