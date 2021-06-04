import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppRoute} from '../../const';
import MainScreen from '../main-screen/main-screen';
import SignInScreen from '../sign-in-screen/sign-in-screen';
import MyListScreen from '../my-list-screen/my-list-screen';
import FilmScreen from '../film-screen/film-screen';
import AddReviewScreen from '../add-review-screen/add-review-screen';
import PlayerScreen from '../player-screen/player-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';


function App({promoFilm, films}) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <MainScreen
            promoFilm={promoFilm}
            films={films}
          />
        </Route>
        <Route exact path={AppRoute.SIGN_IN}>
          <SignInScreen />
        </Route>
        <Route exact path={AppRoute.MY_LIST}>
          <MyListScreen />
        </Route>
        <Route exact path={AppRoute.FILM}>
          <FilmScreen />
        </Route>
        <Route exact path={AppRoute.ADD_REVIEW}>
          <AddReviewScreen />
        </Route>
        <Route exact path={AppRoute.PLAYER}>
          <PlayerScreen />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  promoFilm: PropTypes.object.isRequired,
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default App;
