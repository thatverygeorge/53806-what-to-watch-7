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
import filmProp from '../film-screen/film.prop';
import {connect} from 'react-redux';

function App(props) {
  const {films} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <MainScreen films={films} />
        </Route>
        <Route exact path={AppRoute.SIGN_IN}>
          <SignInScreen />
        </Route>
        <Route exact path={AppRoute.MY_LIST}>
          <MyListScreen films={films} />
        </Route>
        <Route exact path={AppRoute.ADD_REVIEW}>
          <AddReviewScreen films={films} />
        </Route>
        <Route exact path={AppRoute.FILM}>
          <FilmScreen films={films} />
        </Route>
        <Route exact path={AppRoute.PLAYER}>
          <PlayerScreen films={films} />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  films: PropTypes.arrayOf(
    filmProp,
  ),
};

const mapStateToProps = (state) => ({
  films: state.films,
});

export {App};
export default connect(mapStateToProps, null)(App);
