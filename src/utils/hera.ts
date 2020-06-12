import _ from "lodash";

export class HeraService {
    setState(comp: any, key: string, data_key = 'target.value') {
        return (e) => {
            comp.setState({
                [key]: _.get(e, data_key)
            })
        }
    }

    setFile(comp: any, key: string) {
        return (e) => {
            const files = _.get(e, 'target.files')
            const file = files.length > 0 ? files[0] : null
            comp.setState({
                [key]: file
            })
        }
    }

    readFileAsync(file) {
        return new Promise<string>((resolve, reject) => {
            try {
                const fr = new FileReader()
                fr.onloadend = (e) => {
                    if (fr.error) {
                        reject(fr.error)
                        return
                    }

                    const content = fr.result
                    resolve(String(content))
                }
                fr.readAsText(file)
            }
            catch (err) {
                reject(err)
            }
        })
    }
}

export const HeraServ = new HeraService()
export default HeraServ;