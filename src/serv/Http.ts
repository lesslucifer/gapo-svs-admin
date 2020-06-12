import _ from 'lodash'
import EnvServ from "./Env";
import swal from 'sweetalert'

class HttpRequestError extends Error {
    body: any;

    constructor(msg: string, body: any) {
        super(msg)

        this.body = body;
    }
}

class HttpService {
    constructor(
    ) { }

    async req(method: string, url: string, body?: any, headers?: any) {
        const opts: any = {
            method
        };
        opts.headers = new Headers();
        opts.headers.append('Accept', 'application/json')
        opts.headers.append('Content-Type', 'application/json')

        if (body) {
            opts.body = JSON.stringify(body)
        }

        if (!!headers) {
            for (const h in headers) {
                opts.headers.append(h, headers[h])
            }
        }

        const resp = await fetch(`${url}`, opts);
        const json = await resp.json();

        return json;
    }

    async faissReq(method: string, url: string, body?: any) {
        return await this.req(method, `${EnvServ.getCurrentFieldStrict('FAISS_HOST')}${url}`,
            body, JSON.parse(EnvServ.getCurrentFieldStrict('AUTH_HEADERS')))
    }
}

const Http = new HttpService();
export default Http;