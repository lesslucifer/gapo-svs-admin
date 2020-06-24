import React, { Component } from 'react'
import { Table, Form, Button, Col, Row } from 'react-bootstrap'
import EnvServ from '../../serv/Env'
import SwalCover from '../../serv/SwalCover'
import HeraServ from '../../utils/hera'
import swal from 'sweetalert'

export default class EnvPage extends Component {
    state = {
        env: '',
        environments: [],
        fields: [],

        newFieldName: '',
        newFieldValue: ''
    }

    componentDidMount() {
        EnvServ.load()
        this.reloadEnvironments()
    }

    reloadEnvironments() {
        const environments = Object.keys(EnvServ.envs)
        const env = EnvServ.getCurrentEnv() || (environments.length ? environments[0] : '')

        this.setState({ environments, env })
        setTimeout(() => this.reloadFields())
    }

    reloadFields() {
        console.log(EnvServ.getFields(this.state.env))
        this.setState({ fields: EnvServ.getFields(this.state.env) })
    }

    render() {
        return <div>
            <div>
                <Form>
                    <Form.Group as={Row} controlId="env">
                        <Form.Label column sm="2">
                            Environment
                        </Form.Label>
                        <Form.Control className="sel_margin col-sm-8" as="select" value={this.state.env} onChange={this.onSelectEnv.bind(this)} >
                            {this.state.environments.map(env => (
                                <option key={env} value={env}>{env}</option>
                            ))}
                        </Form.Control>
                        <Button onClick={this.addNewEnv.bind(this)} size="sm" className="col-sm-1"> Add </Button>
                    </Form.Group>
                </Form>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>Field</th>
                        <th>Value</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.fields.map(f => (
                        <tr key={f.field}>
                            <td>{f.field}</td>
                            <td>{f.value}</td>
                            <td style={{ textAlign: 'center' }}>
                                <Button onClick={() => this.removeField(f.field)}>
                                    <span className="fa fa-trash-o fa-lg" aria-hidden="true"></span>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div>
                <h4>Add new field</h4>
                <Form>
                    <Form.Group as={Row} controlId="fieldName">
                        <Form.Label column sm="2">
                            Field name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required placeholder="Field name..." value={this.state.newFieldName} onChange={HeraServ.setState(this, 'newFieldName')} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="fieldValue">
                        <Form.Label column sm="2">
                            Field value
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control as='textarea' placeholder="Field value..." value={this.state.newFieldValue} onChange={HeraServ.setState(this, 'newFieldValue')} />
                        </Col>
                    </Form.Group>
                    <Button onClick={this.addNewAuthType.bind(this)}>Add new field</Button>
                </Form>
            </div>
        </div>
    }

    onSelectEnv(e) {
        this.setState({
            env: e.target.value
        })
        setTimeout(() => this.reloadFields())
    }

    @SwalCover()
    async removeField(field) {
        EnvServ.removeField(this.state.env, field)
        setTimeout(() => {
            EnvServ.save();
            this.reloadFields()
        })
    }

    @SwalCover()
    async addNewAuthType() {
        if (!this.state.newFieldName) throw new Error('Bạn phải nhập tên field')
        if (!this.state.newFieldValue) throw new Error('Bạn phải nhập giá trị field')

        EnvServ.setField(this.state.env, this.state.newFieldName, this.state.newFieldValue)
        setTimeout(() => {
            EnvServ.save();
            this.reloadFields()
        })
    }

    @SwalCover()
    async addNewEnv() {
        const envName = await swal({
            title: 'Nhập tên môi trường',
            content: {
                element: 'input',
                attributes: {
                    placeholder: 'Môi trường...'
                }
            },
            buttons: {
                cancel: true,
                confirm: true,
            }
        })

        if (!envName) return;
        if (this.state.environments.find(env => env === envName)) throw new Error('Tên môi trường đã tồn tại')

        this.setState({
            environments: [
                ...this.state.environments,
                envName
            ],
            env: envName
        })

        setTimeout(() => this.reloadFields())
    }
}