import {genre} from './genre';
import {ActionType, changeGenre} from '../action';

const GENRE = 'All genres';

describe('Reducer: genre', () => {
  it('without additional parameters should return initial state', () => {
    expect(genre(undefined, {}))
      .toEqual({genre: GENRE});
  });

  it('should change genre to a given value', () => {
    const state = {genre: GENRE};

    expect(genre(state, changeGenre('Comedy')))
      .toEqual({genre: 'Comedy'});

    const changeGenreAction = {
      type: ActionType.CHANGE_GENRE,
      payload: 'Thiller',
    };

    expect(genre(state, changeGenreAction))
      .toEqual({genre: 'Thiller'});

    const changeGenreUndefinedAction = {
      type: ActionType.CHANGE_GENRE,
      payload: undefined,
    };

    expect(genre(state, changeGenreUndefinedAction))
      .toEqual({genre: undefined});
  });
});
