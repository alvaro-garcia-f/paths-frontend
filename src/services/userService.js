import axios from 'axios'

const API = axios.create({
  baseURL: `${process.env.VUE_APP_API}`,
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
  },

  async editStudent (id, data) {
    const response = await API.put(`/users/student/${id}`, data, { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async deleteStudent (id) {
    const response = await API.delete(`/users/student/${id}`, { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async completeLesson (id) {
    const response = await API.put(`/users/student/lesson/${id}`, null, { headers: { token: localStorage.getItem('token') } })
    return response.data
  }
}
