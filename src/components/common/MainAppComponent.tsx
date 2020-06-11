import React, { Component } from 'react';
import './MainAppComponent.css';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import AuthPage from "../pages/AuthPage";

export default class MainAppComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="MainAppComponent">
                <h1 className="HeaderBar">
                    SVS Admin
                </h1>
                <div className="MainAppRoute">
                    <Route>
                        <Switch>
                            <Route exact path="/auth">
                                <AuthPage />
                            </Route>
                            <Route path="/charts/barchart" component={(props) => <BarChart {...props} />} />
                            <Route path="/charts/linechart" component={(props) => <LineChart {...props} />} />
                            <Redirect from="/" to="auth" />
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