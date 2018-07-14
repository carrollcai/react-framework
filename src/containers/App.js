import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { FormattedMessage } from 'react-intl';
import actions from '../actions/index.js';
import { connect } from 'react-redux';

class App extends Component {
  changeLanguage() {
    let lang = this.props.locale;
    lang = lang === 'zh' ? 'en' : 'zh';
    this.props.changeLanguage(lang);
  }
  render() {
    const { locale } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            <FormattedMessage
              id="hello"
            />
          </h1>
        </header>
        <p className="App-intro">
          <FormattedMessage
            id="name"
            values={{ name: <b>{'carroll'}</b> }}
          />
        </p>
        <button onClick={() => this.changeLanguage()}>{locale === 'zh' ? '切换英文' : 'change chinese'}</button>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  locale: state.root.language,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  changeLanguage: (val) => dispatch(actions.changeLanguage(val))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
