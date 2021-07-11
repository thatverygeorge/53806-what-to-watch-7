import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import GenresList from './genres-list';
import userEvent from '@testing-library/user-event';

const GENRE = 'All genres';

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

describe('Component: GenresList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const {rerender} = render(
      <Router history={history}>
        <GenresList films={[FILM]} activeGenre={FILM.genre} onGenreChange={() => {}} />
      </Router>,
    );

    expect(screen.getByText('All genres')).toBeInTheDocument();
    expect(screen.getByText(`${FILM.genre}`)).toBeInTheDocument();

    expect(document.querySelectorAll('.catalog__genres-item')[0]).not.toHaveClass('catalog__genres-item--active');

    rerender(
      <Router history={history}>
        <GenresList films={[FILM]} activeGenre={GENRE} onGenreChange={() => {}} />
      </Router>,
    );

    expect(document.querySelectorAll('.catalog__genres-item')[0]).toHaveClass('catalog__genres-item--active');
  });

  it('should fire callback on genre change', () => {
    const history = createMemoryHistory();
    const onGenreChange = jest.fn();

    render(
      <Router history={history}>
        <GenresList films={[FILM]} activeGenre={FILM.genre} onGenreChange={onGenreChange} />
      </Router>,
    );

    userEvent.click((document.querySelector('.catalog__genres-item')));
    expect(onGenreChange).toBeCalled();
  });

});
