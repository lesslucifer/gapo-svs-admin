import React, { Component } from "react";
import { Form, Col, Row, Button, Table } from "react-bootstrap";
import HeraServ from "../../utils/hera";
import SwalCover, { SwalLoading } from "../../serv/SwalCover";
import Http from "../../serv/Http";
import swal from 'sweetalert'
import EnvServ from "../../serv/Env";
import CodeEditor from "../common/CodeEditor";

export default class SVSSuggestionPage extends Component {
    state = {
        suggestions: [],
        updatingConfigs: {},
        newCode: '',
        newConfig: ''
    }

    componentDidMount() {
        this.reloadSuggestions()
    }

    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: '10%' }}>Code</th>
                            <th>Config</th>
                            <th style={{ width: '20%' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.suggestions.map(sugg => (
                            <tr key={sugg.code}>
                                <td>{sugg.code}</td>
                                <td>
                                    <CodeEditor defaultValue={JSON.stringify(sugg.config, null, 2)} onChange={val => {this.state.updatingConfigs[sugg.code] = val; this.forceUpdate()}} />
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <Button className="mr-1" disabled={!this.state.updatingConfigs[sugg.code]}
                                        onClick={() => { this.updateSuggestion(sugg.code, this.state.updatingConfigs[sugg.code]) }}>
                                        Update
                                    </Button>
                                    <Button variant="danger" onClick={() => { this.disableSuggestion(sugg.code) }}>
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <h4>Add new suggestion</h4>
                <Form>
                    <Form.Group as={Row} controlId="code">
                        <Form.Label column sm="2">
                            Code
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required placeholder="Suggestion code" value={this.state.newCode} onChange={HeraServ.setState(this, 'newCode')} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="config">
                        <Form.Label column sm="2">
                            Config
                        </Form.Label>
                        <Col sm="10">
                            <CodeEditor defaultValue="" onChange={(s) => this.setState({newConfig: s})}/>
                        </Col>
                    </Form.Group>
                    <Button onClick={() => this.addNewConfig()}>Add config</Button>
                </Form>
            </div>
        )
    }

    @SwalCover('Không tải được danh sách suggestion configs')
    async reloadSuggestions() {
        const suggestions = await Http.svsReq('GET', '/suggestion-configs?enabled=1', null)
        this.setState({
            suggestions: suggestions
        })
    }

    @SwalCover("Không thể thêm config mới")
    @SwalLoading()
    async addNewConfig() {
        if (!this.state.newCode) throw new Error("Bạn chưa nhập suggestion code")
        if (!this.state.newConfig) throw new Error("Config chưa đúng định dạng")

        if (!await EnvServ.productionConfirmation()) return

        const newConfig = JSON.parse(this.state.newConfig)

        await Http.svsReq('POST', `/suggestion-configs`, {
            code: this.state.newCode,
            config: newConfig
        })

        await swal('Thành công', 'Tạo suggestion mới thành công', 'success')
        await this.reloadSuggestions()

        this.setState({
            newCode: ''
        })
    }

    @SwalCover()
    @SwalLoading()
    async updateSuggestion(code: string, json: any) {
        if (!json) throw new Error('Cấu hình không phù hợp')
        await Http.svsReq('PUT', `/suggestion-configs/${code}`, {
            config: JSON.parse(json)
        })
        await swal('Thành công', 'Cập nhật cấu hình thành công', 'success')
        await this.reloadSuggestions()
    }

    @SwalCover()
    @SwalLoading()
    async disableSuggestion(code: string) {
        await Http.svsReq('PUT', `/suggestion-configs/${code}/status/disabled`, undefined)
        await swal('Thành công', 'Đã xoá cấu hình', 'success')
        await this.reloadSuggestions()
    }
}