import React from 'react';
import './App.css';
import AppSideBarComponent from './components/AppSideBarComponent.js'
import MainAppComponent from './components/MainAppComponent.js'

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Router>
                <AppSideBarComponent></AppSideBarComponent>
                <MainAppComponent></MainAppComponent>
            </Router>
        </div>
    );
}

export default App;
