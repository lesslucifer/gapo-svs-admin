import React, { Component } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import HeraServ from "../../utils/hera";
import SwalCover from "../../serv/SwalCover";
import Http from "../../serv/Http";
import swal from 'sweetalert'
import EnvServ from "../../serv/Env";

export default class FaissDatasetPage extends Component {
    state = {
        code: '',
    }

    uidsFileRef = React.createRef<any>();
    itemsFileRef = React.createRef<any>();

    render() {
        return (
            <div>
                <h4>Add new Faiss Dataset</h4>
                <Form>
                    <Form.Group as={Row} controlId="code">
                        <Form.Label column sm="2">
                            Code
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required placeholder="Dataset code" value={this.state.code} onChange={HeraServ.setState(this, 'code')} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="uids_file">
                        <Form.Label column sm="2">
                            User file
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control ref={this.uidsFileRef} type="file" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="items_file">
                        <Form.Label column sm="2">
                            Items file
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control ref={this.itemsFileRef} type="file" />
                        </Col>
                    </Form.Group>
                    <Button onClick={() => this.createNewDataset()}>Add</Button>
                </Form>
            </div>
        )
    }

    @SwalCover("Không thể tạo dataset")
    async createNewDataset() {
        if (!this.state.code) throw new Error("Bạn chưa nhập dataset code")
        if (this.uidsFileRef.current.files.length === 0) throw new Error("Bạn chưa chọn uids file")
        if (this.itemsFileRef.current.files.length === 0) throw new Error("Bạn chưa chọn items file")

        if (!await EnvServ.productionConfirmation()) return

        const uidsFile = this.uidsFileRef.current.files[0]
        const itemsFile = this.itemsFileRef.current.files[0]

        const uidsContent = await HeraServ.readFileAsync(uidsFile)
        const itemsContent = await HeraServ.readFileAsync(itemsFile)

        const uids = uidsContent.split("\n").map(uid => uid.trim()).filter(uid => !!uid)
        const items = itemsContent.split("\n").map(item => item.trim()).filter(item => !!item)

        await Http.faissReq('POST', '/datasets', {
            code: this.state.code,
            n_users: 0,
            n_items: 0,
            uids: [],
            iids: []
        })
        await Http.faissReq('PUT', `/datasets/${this.state.code}/uids`, uids)
        await Http.faissReq('PUT', `/datasets/${this.state.code}/iids`, items)
        await swal('Thành công', 'Tạo Dataset thành công', 'success')
    }
}