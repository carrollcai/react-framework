import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createSageMiddleware from 'redux-saga';
import sagas from './sagas';

const sagaMiddleware = createSageMiddleware();
const store = createStore(
  rootReducer, 
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
