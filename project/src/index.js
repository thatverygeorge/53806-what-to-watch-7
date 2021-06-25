import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import {reducer} from './store/reducer';
import thunk from 'redux-thunk';
import {createAPI} from './services/api';
import {fetchFilms} from './store/api-actions';

const api = createAPI(() => store.dispatch());

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));
store.dispatch(fetchFilms());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
