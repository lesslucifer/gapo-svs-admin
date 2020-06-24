import React, { Component } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import HeraServ from "../../utils/hera";
import SwalCover, { SwalLoading } from "../../serv/SwalCover";
import Http from "../../serv/Http";
import swal from 'sweetalert'
import EnvServ from "../../serv/Env";
import { openStdin } from "process";

export default class FaissBackendPage extends Component {
    state = {
        code: '',
        dataset: '',
        user_layer: 'User_layer',
        item_layer: 'Video_layer',
        output_layer: 'DOT_layer',
    }

    modelFileRef = React.createRef<any>();

    render() {
        return (
            <div>
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

    @SwalCover("Không thể tạo backend mới")
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
            formData.append('model', modelFile)
            opts.body = formData
            return [url, opts]
        })
        await swal('Thành công', 'Tạo Dataset thành công', 'success')
    }
}