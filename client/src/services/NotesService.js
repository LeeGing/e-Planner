import Api from '@/services/Api'

export default {
  index () {
    return Api().get('notes')
  },
  show (noteId) {
    return Api().get(`notes/${noteId}`)
  },
  post (note) {
    return Api().post('notes', note)
  },
  put (note) {
    return Api().put(`notes/${note.id}`, note)
  },
  delete (noteId) {
    return Api().delete(`notes/${noteId}`)
  }
}
