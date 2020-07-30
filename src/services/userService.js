import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 1000
})

export default {
  async logIn (data) {
    const response = await API.post('/auth/login', data)
    return response.data
  },

  async getAllStudents () {
    const response = await API.get('/users/students', { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async addStudent (data) {
    const response = await API.post('/users/student', data, { headers: { token: localStorage.getItem('token') } })
    return response.data
  }
}
