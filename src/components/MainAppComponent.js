import React, { Component } from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

export default class MainAppComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Route>
                <Switch>
                    <Route exact path="/home2">
                        <Home />
                    </Route>
                    <Route path="/charts/barchart" component={(props) => <BarChart {...props}/>} />
                    <Route path="/charts/linechart" component={(props) => <LineChart {...props}/>} />
                    <Redirect from="/" to="home" />
                </Switch>
            </Route>)
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