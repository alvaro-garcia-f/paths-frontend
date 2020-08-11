import axios from 'axios'

const API = axios.create({
  baseURL: `${process.env.VUE_APP_API}/practice`,
  timeout: 1000
})

export default {

  async getAllIntervals (id) {
    const response = await API.get('/', { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async getQuestionInterval (id) {
    const response = await API.get(`/question/${id}`, { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async updateQuestionInterval (id, data) {
    const response = await API.put(`/question/${id}`, data, { headers: { token: localStorage.getItem('token') } })
    return response.data
  }

}
