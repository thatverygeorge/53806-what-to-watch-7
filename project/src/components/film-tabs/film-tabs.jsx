import React, {useState} from 'react';
import filmProp from '../film-screen/film.prop';
import FilmOverview from '../film-overview/film-overview';
import FilmDetails from '../film-details/film-details';
import FilmReviews from '../film-reviews/film-reviews';
import {Tabs} from '../../const';

function FilmTabs(props) {
  const [activeTab, setActiveTab] = useState(Tabs.OVERVIEW);
  const {film} = props;

  function handleActiveTabChange(evt) {
    if (evt.target.tagName === 'A') {
      evt.preventDefault();

      setActiveTab(evt.target.textContent.toLowerCase());
    }
  }

  function getComponentByActiveTab() {
    switch (activeTab) {
      case Tabs.DETAILS:
        return <FilmDetails film={film} />;
      case Tabs.REVIEWS:
        return <FilmReviews film={film} />;
      default:
        return <FilmOverview film={film} />;
    }
  }

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav" onClick={handleActiveTabChange}>
        <ul className="film-nav__list">
          <li className={`film-nav__item ${activeTab === Tabs.OVERVIEW ? 'film-nav__item--active' : ''}`}>
            <a href="##" className="film-nav__link">Overview</a>
          </li>
          <li className={`film-nav__item ${activeTab === Tabs.DETAILS ? 'film-nav__item--active' : ''}`}>
            <a href="##" className="film-nav__link">Details</a>
          </li>
          <li className={`film-nav__item ${activeTab === Tabs.REVIEWS ? 'film-nav__item--active' : ''}`}>
            <a href="##" className="film-nav__link">Reviews</a>
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
