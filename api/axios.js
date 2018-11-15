import axios from 'axios'
import * as config from './config.js'

const ajax = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api.jinhaidi.cn/client' : 'http://localhost:3000/client'
})

// 拦截器
ajax.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

ajax.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

export default ajax
