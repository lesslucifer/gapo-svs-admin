import React, { Component } from 'react';
import './AppHeaderComponent.css'
import { Form } from 'react-bootstrap';
import EnvServ from '../../serv/Env';
import HeraServ from '../../utils/hera';

export default class AppHeaderComponent extends Component {
    state = {
        env: '',
        environments: []
    }

    componentDidMount() {
        this.reloadEnvironments()
    }

    reloadEnvironments() {
        const environments = Object.keys(EnvServ.envs)
        const env = EnvServ.getCurrentEnv() || (environments.length ? environments[0] : '')

        this.setState({ environments, env })
    }

    render() {
        return (
            <div className="AppHeaderComponent HeaderBar row">
                <h1 className="col-sm-3">
                    SVS Admin
                </h1>
                <Form.Control className="sel_margin col-sm-2 mt-2" as="select" value={this.state.env} onChange={this.onSelectEnv.bind(this)} >
                    {this.state.environments.map(env => (
                        <option key={env} value={env}>{env}</option>
                    ))}
                </Form.Control>
            </div>)
    }

    onSelectEnv(e) {
        this.setState({ env: e.target.value })
        EnvServ.setCurrentEnv(e.target.value)
    }
}