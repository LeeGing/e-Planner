import Api from '@/services/Api'

export default {
  index () {
    return Api().get('notes')
  },
  post (note) {
    return Api().post('notes', note)
  }
}
