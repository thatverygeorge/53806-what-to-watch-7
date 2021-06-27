import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Router as BrowserRouter, Redirect} from 'react-router-dom';
import {AppRoute} from '../../const';
import MainScreen from '../main-screen/main-screen';
import SignInScreen from '../sign-in-screen/sign-in-screen';
import MyListScreen from '../my-list-screen/my-list-screen';
import FilmScreen from '../film-screen/film-screen';
import AddReviewScreen from '../add-review-screen/add-review-screen';
import PlayerScreen from '../player-screen/player-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import PrivateRoute from '../private-route/private-route';
import filmProp from '../film-screen/film.prop';
import {connect} from 'react-redux';
import browserHistory from '../../browser-history';

function App(props) {
  const {films, isDataLoaded, authorizationStatus} = props;

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <MainScreen films={films} />
        </Route>
        <Route exact path={AppRoute.SIGN_IN}>
          <SignInScreen authorizationStatus={authorizationStatus} />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MY_LIST}
          authorizationStatus={authorizationStatus}
          render={() => <MyListScreen films={films} />}
        >
        </PrivateRoute>
        <PrivateRoute
          exact
          path={AppRoute.ADD_REVIEW}
          authorizationStatus={authorizationStatus}
          render={() => <AddReviewScreen films={films} />}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.FILM}>
          <FilmScreen films={films} />
        </Route>
        <Route exact path={AppRoute.PLAYER}>
          <PlayerScreen films={films} />
        </Route>
        <Route exact path={AppRoute.NOT_FOUND}>
          <NotFoundScreen />
        </Route>
        <Route>
          <Redirect to={AppRoute.NOT_FOUND} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  films: PropTypes.arrayOf(
    filmProp,
  ),
  isDataLoaded: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  films: state.films,
  isDataLoaded: state.isDataLoaded,
  authorizationStatus: state.authorizationStatus,
});

export {App};
export default connect(mapStateToProps, null)(App);
