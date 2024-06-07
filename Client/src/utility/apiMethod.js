import axios from 'axios'
import { BASE_URL_DEV_API } from '../config/api'

const apiMethod = axios.create({
  baseURL: BASE_URL_DEV_API,
  headers: {
    "Authorization": JSON.parse(localStorage.getItem("USER_INFO"))?.accessToken
  }
  // withCredentials: true
})

apiMethod.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error.message)
  }
)
apiMethod.interceptors.request.use(request => {
  return request
})

export default apiMethod
