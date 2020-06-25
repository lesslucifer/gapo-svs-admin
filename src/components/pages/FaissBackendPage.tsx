import React, { Component } from "react";
import { Form, Col, Row, Button, Table } from "react-bootstrap";
import HeraServ from "../../utils/hera";
import SwalCover, { SwalLoading } from "../../serv/SwalCover";
import Http from "../../serv/Http";
import swal from 'sweetalert'
import EnvServ from "../../serv/Env";
import { openStdin } from "process";

export default class FaissBackendPage extends Component {
    state = {
        backends: [],
        code: '',
        dataset: '',
        user_layer: 'User_layer',
        item_layer: 'Video_layer',
        output_layer: 'DOT_layer',
    }

    modelFileRef = React.createRef<any>();

    componentDidMount() {
        this.reloadBackendList()
    }

    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ width: '20%' }}>Code</th>
                            <th>Info</th>
                            <th style={{ width: '20%' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.backends.map(b => (
                            <tr key={b.code}>
                                <td>{b.code}</td>
                                <td><div>{Object.keys(b).map(k => `${k}: ${b[k]}`).join('\n')}</div></td>
                                <td style={{ textAlign: 'center' }}>
                                    {(b.status == 'ENABLED') &&
                                    <div>
                                        <Button variant="danger" className="mr-1" onClick={() => {this.disableBackend(b.code)}}>
                                            Disable
                                        </Button>
                                        <Button onClick={() => {this.reloadBackend(b.dataset)}}>
                                            Reload
                                        </Button>
                                    </div>}
                                    {b.status == 'DISABLED' && (
                                    <Button variant="success" onClick={() => {this.enableBackend(b.code)}}>
                                        Enable
                                    </Button>)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <h4>Add new Backends</h4>
                <Form>
                    <Form.Group as={Row} controlId="code">
                        <Form.Label column sm="2">
                            Code
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required placeholder="Backend code" value={this.state.code} onChange={HeraServ.setState(this, 'code')} />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row} controlId="user_layer">
                        <Form.Label column sm="2">
                            Dataset
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required placeholder="Dataset" value={this.state.dataset} onChange={HeraServ.setState(this, 'dataset')} />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row} controlId="user_layer">
                        <Form.Label column sm="2">
                            User layer name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required placeholder="User layer" value={this.state.user_layer} onChange={HeraServ.setState(this, 'user_layer')} />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row} controlId="item_layer">
                        <Form.Label column sm="2">
                            Item layer name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required placeholder="Item layer" value={this.state.item_layer} onChange={HeraServ.setState(this, 'item_layer')} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="output_layer">
                        <Form.Label column sm="2">
                            Output layer name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required placeholder="Output layer" value={this.state.output_layer} onChange={HeraServ.setState(this, 'output_layer')} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="model_file">
                        <Form.Label column sm="2">
                            Model file
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control ref={this.modelFileRef} type="file" />
                        </Col>
                    </Form.Group>

                    <Button onClick={() => this.createNewBackend()}>Add</Button>
                </Form>
            </div>
        )
    }

    @SwalCover('Không tải được danh sách backends')
    async reloadBackendList() {
        const backends = await Http.faissReq('GET', '/faiss-backends', null)
        this.setState({
            backends: backends
        })
    }

    @SwalCover("Không thể tạo backend mới")
    @SwalLoading()
    async createNewBackend() {
        if (!this.state.code) throw new Error("Bạn chưa nhập backend code")
        if (!this.state.dataset) throw new Error("Bạn chưa nhập backend dataset")
        if (!this.state.user_layer) throw new Error("Bạn chưa nhập user layer")
        if (!this.state.item_layer) throw new Error("Bạn chưa nhập item layer")
        if (!this.state.output_layer) throw new Error("Bạn chưa nhập output layer")
        if (this.modelFileRef.current.files.length === 0) throw new Error("Bạn chưa chọn model file")

        if (!await EnvServ.productionConfirmation()) return

        const modelFile = this.modelFileRef.current.files[0]

        // const uidsContent = await HeraServ.readFileAsync(modelFile)

        await Http.faissReq('POST', '/faiss-backends', {
            code: this.state.code,
            dataset: this.state.dataset,
            modelFile: "",
            user_layer: this.state.user_layer,
            item_layer: this.state.item_layer,
            output_layer: this.state.output_layer
        })
        await Http.faissReq('PUT', `/faiss-backends/${this.state.code}/model_file`, undefined, (url, opts) => {
            const formData = new FormData();
            formData.append('model', modelFile, `${this.state.code}.h5`)
            opts.headers.delete('Content-Type')
            opts.headers.delete('Accept')
            opts.body = formData
            console.log(opts)
            return [url, opts]
        })
        await swal('Thành công', 'Tạo backend thành công', 'success')
        await this.reloadBackendList()
    }
    
    @SwalCover()
    @SwalLoading()
    async enableBackend(code: string) {
        await Http.faissReq('PUT', `/faiss-backends/${code}/status/enabled`, undefined)
        await swal('Thành công', 'Enable backend thành công', 'success')
        await this.reloadBackendList()
    }
    
    @SwalCover()
    @SwalLoading()
    async disableBackend(code: string) {
        await Http.faissReq('PUT', `/faiss-backends/${code}/status/disabled`, undefined)
        await swal('Thành công', 'Disable backend thành công', 'success')
        await this.reloadBackendList()
    }
    
    @SwalCover()
    @SwalLoading()
    async reloadBackend(dsCode: string) {
        await Http.faissReq('PUT', `/faiss-backends/.cache/datasets/${dsCode}/reload`, undefined)
        await swal('Thành công', 'Reload backend thành công', 'success')
        await this.reloadBackendList()
    }
}