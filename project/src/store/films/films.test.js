import {films} from './films';
import {ActionType} from '../action';
import {StoreKeys} from '../../const';

const initialState = {
  films: {
    data: [],
    isDataLoaded: false,
  },
  promoFilm: undefined,
  film: {
    data: undefined,
    isDataLoaded: false,
  },
  reviews: {
    data: undefined,
    isDataLoaded: false,
  },
  similar: {
    data: undefined,
    isDataLoaded: false,
  },
  favorite: {
    data: undefined,
    isDataLoaded: false,
  },
};
const FILM = {
  id: 1,
  name: 'Pulp Fiction',
  posterImage: 'img/the-grand-budapest-hotel-poster.jpg',
  previewImage: 'img/pulp-fiction.jpg',
  backgroundImage: 'img/bg-the-grand-budapest-hotel.jpg',
  backgroundColor: '#ffffff',
  videoLink: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
  previewVideoLink: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm',
  description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
  rating: 8.9,
  scoresCount: 1900,
  director: 'Quentin Tarantino',
  starring: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
  runTime: 154,
  genre: 'Crime',
  released: 1994,
  isFavorite: true,
};
const REVIEW = {
  id: 1,
  user: {
    id: 4,
    name: 'Kate Muir',
  },
  rating: 8.9,
  comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed movies in years.',
  date: '2019-05-08T14:13:56.569Z',
};

describe('Reducer: films', () => {
  it('without additional parameters should return initial state', () => {
    expect(films(undefined, {}))
      .toEqual(initialState);
  });

  it('should update film by loaded film', () => {
    const loadFilmAction = {
      type: ActionType.LOAD_FILM,
      payload: FILM,
    };

    expect(films(initialState, loadFilmAction))
      .toEqual({
        ...initialState,
        film: {
          data: FILM,
          isDataLoaded: false,
        },
      });
  });

  it('should update films by loaded films', () => {
    const loadFilmsAction = {
      type: ActionType.LOAD_FILMS,
      payload: [
        FILM,
        FILM,
      ],
    };

    expect(films(initialState, loadFilmsAction))
      .toEqual({
        ...initialState,
        films: {
          data: [
            FILM,
            FILM,
          ],
          isDataLoaded: false,
        },
      });
  });

  it('should update promo film by loaded film', () => {
    const loadPromoFilmAction = {
      type: ActionType.LOAD_PROMO_FILM,
      payload: FILM,
    };

    expect(films(initialState, loadPromoFilmAction))
      .toEqual({
        ...initialState,
        promoFilm: FILM,
      });
  });

  it('should update similar films by loaded films', () => {
    const loadSimilarFilmsAction = {
      type: ActionType.LOAD_SIMILAR_FILMS,
      payload: [
        FILM,
        FILM,
      ],
    };

    expect(films(initialState, loadSimilarFilmsAction))
      .toEqual({
        ...initialState,
        similar: {
          data: [
            FILM,
            FILM,
          ],
          isDataLoaded: false,
        },
      });
  });

  it('should update favorite films by loaded films', () => {
    const loadFavoriteFilmsAction = {
      type: ActionType.LOAD_FAVORITE_FILMS,
      payload: [
        FILM,
        FILM,
      ],
    };

    expect(films(initialState, loadFavoriteFilmsAction))
      .toEqual({
        ...initialState,
        favorite: {
          data: [
            FILM,
            FILM,
          ],
          isDataLoaded: false,
        },
      });
  });

  it('should update reviews films by loaded reviews', () => {
    const loadReviewsAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: [
        REVIEW,
        REVIEW,
      ],
    };

    expect(films(initialState, loadReviewsAction))
      .toEqual({
        ...initialState,
        reviews: {
          data: [
            REVIEW,
            REVIEW,
          ],
          isDataLoaded: false,
        },
      });
  });

  it('should update is data loaded status by given status', () => {
    const isDataLoadedAction = {
      type: ActionType.SET_IS_DATA_LOADED,
      payload: {
        key: StoreKeys.FILM,
        isDataLoaded: true,
      },
    };

    expect(films(initialState, isDataLoadedAction))
      .toEqual({
        ...initialState,
        [isDataLoadedAction.payload.key]: {
          ...initialState[isDataLoadedAction.payload.key],
          isDataLoaded: isDataLoadedAction.payload.isDataLoaded,
        },
      });
  });
});
