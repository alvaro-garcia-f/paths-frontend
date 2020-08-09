import axios from 'axios'

const API = axios.create({
  baseURL: `${process.env.VUE_APP_API}/lessons`,
  timeout: 1000
})

export default {

  async getAllLessons () {
    const response = await API.get('/', { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async getLesson (id) {
    const response = await API.get(`/${id}`, { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async getNextLesson (id) {
    const response = await API.get(`/${id}/next`, { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async createLesson (data) {
    const response = await API.post('/', data, { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async editLesson (id, data) {
    const response = await API.put(`/${id}`, data, { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async updateOrder (data) {
    const response = await API.put('/order', data, { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async deleteLesson (id) {
    const response = await API.delete(`/${id}`, { headers: { token: localStorage.getItem('token') } })
    return response.data
  }

}
