import React from 'react';
import {Link, useParams} from 'react-router-dom';
import filmProp from '../film-screen/film.prop';
import FilmOverview from '../film-overview/film-overview';
import FilmDetails from '../film-details/film-details';
import FilmReviews from '../film-reviews/film-reviews';
import {Tabs} from '../../const';

function FilmTabs(props) {
  const {film} = props;
  const {tab = Tabs.OVERVIEW} = useParams();

  const getComponentByActiveTab = () => {
    switch (tab) {
      case Tabs.DETAILS:
        return <FilmDetails film={film} />;
      case Tabs.REVIEWS:
        return <FilmReviews film={film} />;
      default:
        return <FilmOverview film={film} />;
    }
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item ${tab === Tabs.OVERVIEW ? 'film-nav__item--active' : ''}`}>
            <Link to={`/films/${film.id}`} className="film-nav__link">Overview</Link>
          </li>
          <li className={`film-nav__item ${tab === Tabs.DETAILS ? 'film-nav__item--active' : ''}`}>
            <Link to={`/films/${film.id}/details`} className="film-nav__link">Details</Link>
          </li>
          <li className={`film-nav__item ${tab === Tabs.REVIEWS ? 'film-nav__item--active' : ''}`}>
            <Link to={`/films/${film.id}/reviews`} className="film-nav__link">Reviews</Link>
          </li>
        </ul>
      </nav>

      {getComponentByActiveTab()}
    </div>
  );
}

FilmTabs.propTypes = {
  film: filmProp,
};

export default FilmTabs;
