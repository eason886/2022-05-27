import axios from 'axios'
import { Message } from 'element-ui'
import { removeToken } from '@/utils/auth'
import router from '../router'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      Message({
        message: response.data.msg,
        type: 'error',
        duration: 3 * 1000
      })
      // 401:没有权限
      if (response.status === 401) {
        removeToken()
        window.location.href = ''
      }
      return Promise.reject(response)
    } else {
      return response
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    if (error.message.includes('401')) {
      removeToken()
      location.href = ''
    } else {
      // router.push({
      //     path: "/error",
      //     query: {
      //       errorMasge: error.message,
      //     },
      //   })
      //   .catch(() => {});
    }

    return Promise.reject(error)
  }
)

export default service
