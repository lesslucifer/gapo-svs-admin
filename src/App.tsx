import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap'
import AppSideBarComponent from './components/common/AppSideBarComponent'
import MainAppComponent from './components/common/MainAppComponent'

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { BrowserRouter as Router } from 'react-router-dom';

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
