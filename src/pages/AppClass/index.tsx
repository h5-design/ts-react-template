import React, { Component } from 'react';
import logo from './logo.svg';
import style from './App.less';
import Content from './components/Content';

class App extends Component {
    public render() {
        return (
            <div className={style.App}>
                <header className={style.AppHeader}>
                    <img src={logo} className={style.AppLogo} alt="logo" />
                    <Content propsText = "哈哈哈哈"/>
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
