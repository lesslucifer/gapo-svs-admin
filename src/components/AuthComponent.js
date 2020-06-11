import React, { Component } from 'react'
import { Table, Form, Button, Col, Row } from 'react-bootstrap'
import AuthServ from '../serv/Auth'
import SwalCover from '../serv/SwalCover'

export default class AuthComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            auths: [],
            newAuthType: '',
            newAuthHeaders: ''
        }
    }

    componentDidMount() {
        const auths = Object.keys(AuthServ.authHeaders).map(k => ({
            authType: k,
            headers: AuthServ.authHeaders[k]
        }))

        this.setState({ auths })
    }

    render() {
        return <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th width="20%">Type</th>
                        <th>Headers</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.auths.map(auth => (
                        <tr key={auth.authType}>
                            <td>{auth.authType}</td>
                            <td>{Object.keys(auth.headers).map(h => `${h}: ${auth.headers[h]}`).join('\n')}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div>
                <h4>Add new auth</h4>
                <Form onSubmit={this.addNewAuthType.bind(this)}>
                    <Form.Group as={Row} controlId="formAuthTypeText">
                        <Form.Label column sm="2">
                            Email
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required placeholder="Auth type" value={this.state.newAuthType} onChange={(e) => this.setState({ newAuthType: e.target.value })} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formJSONHeaders">
                        <Form.Label column sm="2">
                            Headers
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control as='textarea' value={this.state.newAuthHeaders} onChange={(e) => this.setState({ newAuthHeaders: e.target.value })}/>
                        </Col>
                    </Form.Group>
                    <Button onClick={this.addNewAuthType.bind(this)}>Add</Button>
                </Form>
            </div>
        </div>
    }

    @SwalCover()
    async addNewAuthType() {
        if (!this.state.newAuthType) {
            throw new Error('Must provide newAuthType')
        }
        
        if (this.state.auths.find(auth => auth.type === this.state.newAuthType)) {
            throw new Error('Auth type already defined')
        }

        this.setState({
            auths: [
                ...this.state.auths,
                { authType: this.state.newAuthType, headers: JSON.parse(this.state.newAuthHeaders) },
            ],
            newAuthType: '',
            newAuthHeaders: ''
        })

        this.trySave()
    }

    trySave() {
        for (const auth of this.state.auths) {
            console.log(auth)
            AuthServ.setAuthHeaders(auth.authType, auth.headers)
        }

        AuthServ.save()
    }
}