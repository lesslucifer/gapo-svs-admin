import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap'
import AppSideBarComponent from './components/common/AppSideBarComponent'
import MainAppComponent from './components/common/MainAppComponent'

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Route render={({ location, history }) => (
                        <AppSideBarComponent location={location} history={history}></AppSideBarComponent>
                    )} />
                    <MainAppComponent></MainAppComponent>
                </Router>
            </div>
        )
    }
}

export default App;
