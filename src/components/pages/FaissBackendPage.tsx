import React, { Component } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

export default class FaissBackendPage extends Component {
    state = {}

    render() {
        return (
            <div>
                <h4>Add new Faiss Backend</h4>
                <Form>
                    <Form.Group as={Row} controlId="formAuthTypeText">
                        <Form.Label column sm="2">
                            Email
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required placeholder="Auth type" onChange={(e) => this.setState({ newAuthType: e.target.value })} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formJSONHeaders">
                        <Form.Label column sm="2">
                            Headers
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control as='textarea' onChange={(e: any) => this.setState({ newAuthHeaders: e.target.value })} />
                        </Col>
                    </Form.Group>
                    <Button>Add</Button>
                </Form>
            </div>
        )
    }
}