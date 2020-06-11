import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap'
import AppSideBarComponent from './AppSideBarComponent.js'
import MainAppComponent from './MainAppComponent.js'

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
