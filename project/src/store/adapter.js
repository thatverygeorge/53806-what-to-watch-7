export const adaptToClient = (film) => {
  const adaptedEvent = Object.assign(
    {},
    film,
    {
      previewVideoLink: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
    },
  );

  return adaptedEvent;
};

export const adaptToServer = (film) => {
  const adaptedEvent = Object.assign(
    {},
    film,
  );

  return adaptedEvent;
};
