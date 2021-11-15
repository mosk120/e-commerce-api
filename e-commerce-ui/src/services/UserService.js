import Api from './Api'

export default {
    createUser(data) {
        return Api().post('auth/register', data)
    }
}
