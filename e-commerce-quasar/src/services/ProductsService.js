import Api from './Api'

export default {
  getAllProducts() {
    return Api().get('auth/products')
  }
}
