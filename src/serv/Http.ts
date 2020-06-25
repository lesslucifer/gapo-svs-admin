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

    async req(method: string, url: string, body?: any, headers?: any, hook?: any) {
        let opts: any = {
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

        if (hook) {
            [url, opts] = hook(url, opts)
        }

        const resp = await fetch(`${url}`, opts);
        if (resp.status < 200 || resp.status > 299) {
            throw new HttpRequestError(`HTTP Request error ${resp.status}!`, resp.status)
        }
        const json = await resp.json();

        return json;
    }

    async faissReq(method: string, url: string, body?: any, hook?: any) {
        return await this.req(method, `${EnvServ.getCurrentFieldStrict('FAISS_HOST')}${url}`,
            body, JSON.parse(EnvServ.getCurrentFieldStrict('AUTH_HEADERS')), hook)
    }

    async svsReq(method: string, url: string, body?: any, hook?: any) {
        return await this.req(method, `${EnvServ.getCurrentFieldStrict('SVS_HOST')}${url}`,
            body, JSON.parse(EnvServ.getCurrentFieldStrict('AUTH_HEADERS')), hook)
    }
}

const Http = new HttpService();
export default Http;