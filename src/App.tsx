import React, { Component } from 'react';
import logo from './logo.svg';
import style from './App.less';

class App extends Component {
    public render() {
    return (
      <div className={style.App}>
        <header className={style.AppHeader}>
          <img src={logo} className={style.AppLogo} alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className={style["App-link"]}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
