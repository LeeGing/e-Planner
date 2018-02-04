import Api from '@/services/Api'

export default {
  // an object that calls the register method, which will hit the register endpoint
  // this AuthenticationService.js will export an object with a register method
  register (credentials) {
    return Api().post('register', credentials)
  }
}
