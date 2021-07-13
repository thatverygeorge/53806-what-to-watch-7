import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import SmallFilmCard from './small-film-card';
import userEvent from '@testing-library/user-event';

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

describe('Component: SmallFilmCard', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const onFilmCardHoverChange = jest.fn();

    const {rerender} = render(
      <Router history={history}>
        <SmallFilmCard film={FILM} isActive={false} onFilmCardHoverChange={onFilmCardHoverChange} />
      </Router>,
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link.textContent).toEqual(`${FILM.name}`);

    const image = document.querySelector('img');
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toEqual(FILM.previewImage);
    expect(image.getAttribute('alt')).toEqual(FILM.name);

    expect(document.querySelector('.player__video')).not.toBeInTheDocument();

    rerender(
      <Router history={history}>
        <SmallFilmCard film={FILM} isActive onFilmCardHoverChange={onFilmCardHoverChange} />
      </Router>,
    );

    expect(document.querySelector('.player__video')).toBeInTheDocument();
  });

  it('should fire callback on mouse enter/leave', () => {
    const history = createMemoryHistory();
    const onFilmCardHoverChange = jest.fn();

    render(
      <Router history={history}>
        <SmallFilmCard film={FILM} isActive onFilmCardHoverChange={onFilmCardHoverChange} />
      </Router>,
    );

    fireEvent.mouseEnter(document.querySelector('.small-film-card__image'));
    expect(onFilmCardHoverChange).toBeCalled();

    fireEvent.mouseLeave(document.querySelector('.small-film-card__image'));
    expect(onFilmCardHoverChange).toBeCalled();
  });

  it('should redirect to film page on click', () => {
    const history = createMemoryHistory();
    const onFilmCardHoverChange = jest.fn();
    history.push('/fake');

    render(
      <Router history={history}>
        <Switch>
          <Route path={`/films/${FILM.id}`} exact>
            <h1>This is film page</h1>
          </Route>
          <Route>
            <SmallFilmCard film={FILM} isActive onFilmCardHoverChange={onFilmCardHoverChange} />
          </Route>
        </Switch>
      </Router>,
    );

    expect(screen.queryByText('This is film page')).not.toBeInTheDocument();
    userEvent.click((document.querySelector('.small-film-card')));
    expect(screen.getByText('This is film page')).toBeInTheDocument();
  });
});
