import axios from 'axios'

const API = axios.create({
  baseURL: `${process.env.VUE_APP_API}/lessons`,
  timeout: 1000
})

export default {
  async createLesson (data) {
    const response = await API.post('/', data, { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async getAllLessons () {
    const response = await API.get('/', { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async getLesson (id) {
    const response = await API.get(`/${id}`, { headers: { token: localStorage.getItem('token') } })
    return response.data
  }

  /* async getAllQuestions (id) {
    const response = await API.get(`/${id}/quiz`, { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async createQuestion (id, data) {
    const response = await API.post(`/${id}/quiz`, data, { headers: { token: localStorage.getItem('token') } })
    return response.data
  } */
}
