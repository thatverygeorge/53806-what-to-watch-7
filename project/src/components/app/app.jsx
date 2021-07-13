import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {AppRoute} from '../../const';
import MainScreen from '../main-screen/main-screen';
import SignInScreen from '../sign-in-screen/sign-in-screen';
import MyListScreen from '../my-list-screen/my-list-screen';
import FilmScreen from '../film-screen/film-screen';
import AddReviewScreen from '../add-review-screen/add-review-screen';
import PlayerScreen from '../player-screen/player-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import withFilm from '../../hocs/with-film';

const FilmScreenWrapped = withFilm(FilmScreen);
const AddReviewScreenWrapped = withFilm(AddReviewScreen);
const PlayerScreenWrapped = withFilm(PlayerScreen);

function App() {
  return (
    <Switch>
      <Route exact path={AppRoute.MAIN}>
        <MainScreen />
      </Route>
      <Route exact path={AppRoute.SIGN_IN}>
        <SignInScreen />
      </Route>
      <PrivateRoute
        exact
        path={AppRoute.MY_LIST}
        render={() => <MyListScreen />}
      >
      </PrivateRoute>
      <PrivateRoute
        exact
        path={AppRoute.ADD_REVIEW}
        render={() => <AddReviewScreenWrapped />}
      >
      </PrivateRoute>
      <Route exact path={AppRoute.FILM}>
        <FilmScreenWrapped />
      </Route>
      <Route exact path={AppRoute.PLAYER}>
        <PlayerScreenWrapped />
      </Route>
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}

export default App;
