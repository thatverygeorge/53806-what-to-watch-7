import {NameSpace} from '../root-reducer';

export const getFilms = (state) => state[NameSpace.FILMS].films.data;
export const getFilm = (state) => state[NameSpace.FILMS].film.data;
export const getPromoFilm = (state) => state[NameSpace.FILMS].promoFilm;
export const getSimilarFilms = (state) => state[NameSpace.FILMS].similar.data;
export const getReviews = (state) => state[NameSpace.FILMS].reviews.data;
export const getFavoriteFilms = (state) => state[NameSpace.FILMS].favorite.data;
export const getDataLoadedStatus = (state, key) => state[NameSpace.FILMS][key].isDataLoaded;
