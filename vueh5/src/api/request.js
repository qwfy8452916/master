import axios from 'axios'
import qs from 'qs'
// 创建axios实例
const service = axios.create({
  baseURL: 'https://zxs.api.qizuang.com/v1',
  timeout: 5000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (config.url.indexOf('zbfb') !== -1) {
      config.baseURL = 'https://zxs.api.qizuang.com'
      config.data = qs.stringify(config.data)
    }
    if (config.method === 'post' && config.url.indexOf('zbfb') === -1) {
      config.headers.token = sessionStorage.token
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)
export default service
