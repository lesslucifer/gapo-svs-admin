import React, { Component } from 'react';
import './MainAppComponent.css';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import EnvPage from "../pages/EnvPage";
import FaissBackendPage from '../pages/FaissBackendPage';
import FaissDatasetPage from '../pages/FaissDatasetPage';
import AppHeaderComponent from './AppHeaderComponent';

export default class MainAppComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="MainAppComponent">
                <AppHeaderComponent />
                <div className="MainAppRoute">
                    <Route>
                        <Switch>
                            <Route exact path="/envs">
                                <EnvPage />
                            </Route>
                            <Route path="/faiss/datasets" component={(props) => <FaissDatasetPage {...props} />} />
                            <Route path="/faiss/backends" component={(props) => <FaissBackendPage {...props} />} />
                            <Redirect from="/" to="envs" />
                        </Switch>
                    </Route>
                </div>
            </div>)
    }
}

function Home() {
    return <h2>Home</h2>;
}

function LineChart() {
    return <h2>LineChart</h2>;
}

function BarChart() {
    return <h2>BarChart</h2>;
}