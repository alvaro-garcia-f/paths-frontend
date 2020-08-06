import axios from 'axios'

const API = axios.create({
  baseURL: `${process.env.VUE_APP_API}/results`,
  timeout: 1000
})

export default {

  async addAnswer (data) {
    const response = await API.post('/', data, { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async getOwnResults () {
    const response = await API.get('/user/me', { headers: { token: localStorage.getItem('token') } })
    return response.data
  },

  async getResults (id) {
    const response = await API.get(`/user/${id}`, { headers: { token: localStorage.getItem('token') } })
    return response.data
  }
}
