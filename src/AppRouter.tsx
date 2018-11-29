import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AsyncComponent from './utils/AsyncComponent'

const AppRouter = () => (
    <Router>
        <div>
            <nav style={{background: '#99494a'}}>
                <ul style={{display:'flex',listStyle: 'none', margin: '0'}}>
                    <li style={{ padding: '6px 10px' }}>
                        <Link style={{ color: '#fff'}} to="/">ClassPage</Link>
                    </li>
                    <li style={{ padding: '6px 10px' }}>
                        <Link style={{ color: '#fff'}} to="/HooksPage/">HooksPage</Link>
                    </li>
                </ul>
            </nav>
            <Route path="/" exact component={AsyncComponent('AppClass')} />
            <Route path="/HooksPage/" component={AsyncComponent('AppHooks')} />
        </div>
    </Router>
);

export default AppRouter