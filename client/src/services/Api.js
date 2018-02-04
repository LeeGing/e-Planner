import axios from 'axios'

export default () => {
  // create an axios object, which is going to point to our backend URL of 8081
  return axios.create({
    baseURL: `http://localhost:8000/`
  })
}
