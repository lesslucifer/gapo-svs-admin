import swal from 'sweetalert'

export interface EnvField {
    field: string
    value: string
}

export class EnvService {
    currentEnv = 'UID'
    envs: {[env: string]: EnvField[]} = {}

    setCurrentEnv(env: string) {
        this.currentEnv = env
        localStorage.setItem('current_env', this.currentEnv)
    }

    getCurrentEnv() { return this.currentEnv }

    getCurrentFields() { return this.envs[this.currentEnv] || [] }
    getFields(env: string) { return this.envs[env] || []}

    getCurrentField(field: string, defVal?: string) { 
        const f = this.getCurrentFields().find(f => f.field === field)
        return f && f.value || defVal
    }

    getCurrentFieldStrict(field: string, errMsg?: string) { 
        const f = this.getCurrentFields().find(f => f.field === field)
        if (!f) {
            throw new Error(errMsg || `${field} not found in env ${this.currentEnv}`)
        }

        return f.value;
    }

    setField(env: string, field: string, value: string) {
        let fields = this.envs[env]
        if (!fields) {
            fields = []
            this.envs[env] = fields
        }

        const idx = fields.findIndex(f => f.field === field)
        if (idx >= 0) {
            fields[idx].value = value
        }
        else {
            fields.push({field, value})
        }
    }

    removeField(env: string, field: string) {
        const fields = this.envs[env]
        if (!fields) return;

        const idx = fields.findIndex(f => f.field === field)
        fields.splice(idx, 1)
    }

    save() {
        localStorage.setItem('current_env', this.currentEnv)
        localStorage.setItem('envs', JSON.stringify(this.envs))
    }

    load() {
        this.envs = JSON.parse(localStorage.getItem('envs')) || {}
        this.currentEnv = localStorage.getItem('current_env') || 'LOCAL'
    }

    async productionConfirmation() { 
        if (EnvServ.getCurrentEnv() != 'PRODUCTION') return true
        const result = await swal({
            title: 'Đang ở môi trường PRODUCTION - Bạn có chắc chắn muốn thực hiện tạo tác ?',
            buttons: {
                cancel: true,
                confirm: true,
            }
        })
        
        return !!result
    }
}

export const EnvServ = new EnvService();
export default EnvServ;