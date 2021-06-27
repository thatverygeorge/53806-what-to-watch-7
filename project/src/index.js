import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import {reducer} from './store/reducer';
import thunk from 'redux-thunk';
import {createAPI} from './services/api';
import {fetchFilms, checkAuth} from './store/api-actions';
import {ActionCreator} from './store/action';
import {AuthorizationStatus} from './const';
import {redirect} from './store/middlewares/redirect';

const api = createAPI(() => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)));

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

store.dispatch(checkAuth());
store.dispatch(fetchFilms());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
