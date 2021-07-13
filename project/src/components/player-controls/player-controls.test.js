import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import PlayerControls from './player-controls';
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

describe('Component: PlayerControls', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const {rerender} = render(
      <Router history={history}>
        <PlayerControls
          name={FILM.name}
          isPlaying={0}
          duration={'00:00'}
          currentTimeInPercentages={'0%'}
          onPausePlayButtonClick={() => {}}
          onFullScreenButtonClick={() => {}}
        />
      </Router>,
    );

    expect(screen.getByText(FILM.name)).toBeInTheDocument();
    expect(screen.getByText('00:00')).toBeInTheDocument();
    expect(document.querySelector('use').getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toEqual('#play-s');

    rerender(
      <Router history={history}>
        <PlayerControls
          name={FILM.name}
          isPlaying={1}
          duration={'00:00'}
          currentTimeInPercentages={'0%'}
          onPausePlayButtonClick={() => {}}
          onFullScreenButtonClick={() => {}}
        />
      </Router>,
    );

    expect(document.querySelector('use').getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toEqual('#pause');
  });

  it('should fire callbacks when user clicks buttons', () => {
    const history = createMemoryHistory();
    const onPausePlayButtonClick = jest.fn();
    const onFullScreenButtonClick = jest.fn();

    render(
      <Router history={history}>
        <PlayerControls
          name={FILM.name}
          isPlaying={0}
          duration={'00:00'}
          currentTimeInPercentages={'0%'}
          onPausePlayButtonClick={onPausePlayButtonClick}
          onFullScreenButtonClick={onFullScreenButtonClick}
        />
      </Router>,
    );

    userEvent.click((document.querySelector('.player__play')));
    expect(onPausePlayButtonClick).toBeCalled();

    userEvent.click((document.querySelector('.player__full-screen')));
    expect(onFullScreenButtonClick).toBeCalled();
  });
});
