import {ActionCreator} from './action';
import {APIRoute} from '../const';
import {adaptToClient} from './adapter';

export const fetchFilms = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FILMS)
    .then(({data}) => data.map((film) => adaptToClient(film)))
    .then((films) => dispatch(ActionCreator.loadFilms(films)))
);
