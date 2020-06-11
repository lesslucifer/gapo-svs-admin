export class AuthService {
    authType = 'UID'
    authHeaders = {}

    setAuthType(type) {
        this.authType = type
    }

    setAuthHeaders(type, headers) {
        this.authHeaders[type] = headers
    }

    getAuthHeaders() {
        return this.authHeaders[this.authType] || {}
    }

    save() {
        console.log(this.authHeaders)
        localStorage.setItem('auth_headers', JSON.stringify(this.authHeaders))
        localStorage.setItem('auth_type', this.authType)
    }

    load() {
        this.authHeaders = JSON.parse(localStorage.getItem('auth_headers')) || {}
        this.authType = localStorage.getItem('auth_type') || 'UID'
    }
}

export const AuthServ = new AuthService();
export default AuthServ;