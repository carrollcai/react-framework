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
import zh_CN from './locale/lang/zh_CN';
import en_US from './locale/lang/en_US.js';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import { addLocaleData, injectIntl, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/zh';

addLocaleData([...zh,...en]);

function chooseLocale(val) {
  console.log(val);
  let _val = val || navigator.language.split('_')[0]
  switch (_val) {
    case 'en':
      return en_US;
    case 'zh':
      return zh_CN;
    default:
      return en_US;
  }
}

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
let localeMessage = chooseLocale('zh')

store.subscribe(() => {
  localeMessage = chooseLocale(store.getState().root.language)
})
const HocApp = ErrorHttp(App);

// const mapStateToProps = null;
// const mapActionCreators = (dispatch, ownProps) => ({
//   onClick: (id) => dispatch(actions.getDemo(id))
// });

// let Intl = connect(mapStateToProps,mapActionCreators)(injectIntl(HocApp));

ReactDOM.render(

  <Provider store={store}>
    {/* <Intl /> */}
    <IntlProvider locale={'zh'} messages={localeMessage}>
      <HocApp />
    </IntlProvider>
  </Provider>
  ,
  document.getElementById('root'));

registerServiceWorker();
