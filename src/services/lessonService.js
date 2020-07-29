import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000/api/lessons',
  timeout: 1000
})

export default {
  async createLesson (data) {
    const response = await API.post('/', data, { headers: { token: localStorage.getItem('token') } })
    return response.data
  }
}
