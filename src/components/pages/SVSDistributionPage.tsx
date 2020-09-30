import React, { Component } from "react";
import { Form, Col, Row, Button, Table } from "react-bootstrap";
import HeraServ from "../../utils/hera";
import SwalCover, { SwalLoading } from "../../serv/SwalCover";
import Http from "../../serv/Http";
import swal from 'sweetalert'
import EnvServ from "../../serv/Env";
import CodeEditor from "../common/CodeEditor";

export default class SVSDistributionPage extends Component {
    state = {
        txtEditor: '',
        distribution: []
    }

    
    jsonEditorRef = React.createRef<any>();

    componentDidMount() {
        this.reloadDistribution()
    }

    render() {
        return (
            <div>
                <Form.Label column sm="2">
                    Config
                </Form.Label>
                <Col sm="10">
                    <CodeEditor value={this.state.txtEditor} onChange={(v) => this.setState({txtEditor: v})}/>
                </Col>
                <Button className="ml-3 mt-1" onClick={() => this.updateDistribution()}>Update config</Button>
            </div>
        )
    }

    @SwalCover('Không tải được danh sách distribution')
    async reloadDistribution() {
        const distribution = await Http.svsReq('GET', '/suggestion-configs/distribution', null)
        this.setState({
            txtEditor: JSON.stringify(distribution, null, 2),
            distribution: distribution,
            newDistribution: distribution
        })
    }

    @SwalCover("Không thể cập nhật cấu hình distribution")
    @SwalLoading()
    async updateDistribution() {
        if (!this.state.txtEditor) throw new Error("Cấu hình distribution không đúng")
        const newDist = JSON.parse(this.state.txtEditor)
        if (!await EnvServ.productionConfirmation()) return

        await Http.svsReq('PUT', '/suggestion-configs/distribution', newDist)
        await swal('Thành công', 'Cập nhật cấu hình distribution thành công', 'success')
        await this.reloadDistribution()
    }
}