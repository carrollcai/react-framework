import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Demo from './demo/DemoContainer';
import { FormattedMessage } from 'react-intl';
import actions from '../actions/index.js';
import { connect } from 'react-redux';

class App extends Component {
  changeLanguage() {
    console.log(this);
    this.props.changeLanguage('zh');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        <FormattedMessage
          id="hello"
           />
        </p>
        <button onClick={() => this.changeLanguage()}>切换中文</button>
        <Demo />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeLanguage: (val) => dispatch(actions.changeLanguage(val))
});
export default connect(
  null,
  mapDispatchToProps
)(App);
