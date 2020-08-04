import axios from 'axios'

const API = axios.create({
  baseURL: `${process.env.VUE_APP_API}/questions`,
  timeout: 1000
})

export default {

  async getAllQuestions (lessonId) {
    const response = await API.get(`/${lessonId}`, { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async createQuestion (lessonId, data) {
    const response = await API.post(`/${lessonId}`, data, { headers: { token: localStorage.getItem('token') } })
    return response.data
  }

}
