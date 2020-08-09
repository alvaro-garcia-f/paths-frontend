import axios from 'axios'

const API = axios.create({
  baseURL: `${process.env.VUE_APP_API}/questions`,
  timeout: 1000
})

export default {

  async getQuestion (id) {
    const response = await API.get(`/${id}`, { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async getAllQuestions (lessonId) {
    const response = await API.get(`/lessons/${lessonId}`, { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async createQuestion (lessonId, data) {
    const response = await API.post(`/${lessonId}`, data, { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async editQuestion (id, data) {
    const response = await API.put(`/${id}`, data, { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async deleteQuestion (id) {
    const response = await API.delete(`/${id}`, { headers: { token: localStorage.getItem('token') } })
    return response.data
  }
}
