import {combineReducers} from 'redux';
import {user} from './user/user';
import {films} from './films/films';
import {util} from './util/util';

export const NameSpace = {
  USER: 'USER',
  FILMS: 'FILMS',
  UTIL: 'UTIL',
};

export default combineReducers({
  [NameSpace.USER]: user,
  [NameSpace.FILMS]: films,
  [NameSpace.UTIL]: util,
});
