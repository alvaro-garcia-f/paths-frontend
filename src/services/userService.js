import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000/api/auth',
  timeout: 1000
})

export default {
  async logIn (data) {
    const response = await API.post('/login', data)
    return response.data
  }
}
