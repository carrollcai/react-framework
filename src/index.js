import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import ErrorHttp from './hocs/ErrorHttp.jsx';

const store = createStore(
  rootReducer, 
  applyMiddleware(thunk)
);
const HocApp = ErrorHttp(App);


ReactDOM.render(
  <Provider store={store}>
    <HocApp />
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
