'use strict'
import axios from 'axios'
import bus from './bus.js'
import qs from 'qs'
import { getTokenInfo } from '@/utils/auth'

// 处理请求数据
const whiteList = ['/connect/token']
const qsUrl = ['/connect/token']
axios.interceptors.request.use(
  config => {
    // console.log(config)
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // =========================================================
    // 请求拦截
    // const tokeninfo = getTokenInfo()
    // let token = tokeninfo ? tokeninfo.access_token : "";
    // if (token) {
    //   config.headers["Authorization"] = `${tokeninfo.token_type} ${token}`;
    // }
    if (config.headers['Content-Type'] !== 'multipart/form-data' && qsUrl.indexOf(config.url) >= 0) {
      if (config.method === 'post' || config.method === 'POST') {
        config.data = qs.stringify(config.data)
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    // 响应拦截
    return response
  },
  error => {
    return Promise.resolve(error.response)
  }
)

function getData(val, url) {
  // 判断登录用户信息/权限
  if (whiteList.join(',').indexOf(url) >= 0) {
    // 密码登录：登录    手机登录：获取验证码、登录
    return val
  } else {
    const token = getTokenInfo()
    if (!token) {
      window.location.href = window.g.LOGIN ? window.g.LOGIN : '/'
    }
  }
  if (typeof val === 'string') {
    return JSON.parse(val)
  } else {
    return val
  }
}
// 请求参数
function getOptions(url, method, data, params, queryAndBody) {
  const options = {
    method: method,
    baseURL: window.g.API_ROOT,
    url: url,
    timeout: window.g.AXIOS_TIMEOUT ? window.g.AXIOS_TIMEOUT : 10000,
    headers: {}
  }
  if (queryAndBody) {
    const paramsData = data
    const bodyObject = paramsData.bodyObject
    delete paramsData.bodyObject
    options.headers['Content-Type'] = 'application/json;charset=UTF-8'
    options.params = getData(paramsData, url)
    options.data = getData(bodyObject, url)
  } else {
    const pd = !params ? 'data' : 'params'
    options[pd] = getData(data, url)
  }

  return options
}

function checkStatus(response) {
  // 处理响应数据
  // console.log('response', response)
  if (response && response.status === 200) {
    // loading,如果http状态码正常，则直接返回数据
    let res = response.data
    if (!res) {
      bus.$message.error('服务器开了个小差')
      return false
    }
    if (!res.error) {
      // return res
      return { code: 1, data: res }
    } else {
      if (res.message) {
        bus.$message.error(res.message)
      }
      return false
    }
  } else if (response && response.status === 204) {
    // 请求成功
    return { code: 1 }
  } else if (response && response.status === 400) {
    // 请求成功
    if (response.data.error_description) {
      bus.$message.error(response.data.error_description)
    }
    return { code: 1 }
  } else {
    if (response.data.error.message) {
      bus.$message.error(response.data.error.message)
    }
    return false
  }
}

function checkCode(error) {
  bus.$message.error('网络异常~')
  return error
}

export default {
  async post(url, data, query, queryAndBody) {
    const options = getOptions(url, 'post', data, query, queryAndBody)
    return axios(options)
      .then(response => {
        return checkStatus(response)
      })
      .catch(res => {
        return checkCode(res)
      })
  },
  async get(url, data, query) {
    const options = getOptions(url, 'get', data, query)
    return axios(options)
      .then(response => {
        return checkStatus(response)
      })
      .catch(res => {
        return checkCode(res)
      })
  },
  async put(url, data, query, queryAndBody) {
    const options = getOptions(url, 'put', data, query, queryAndBody)
    return axios(options)
      .then(response => {
        return checkStatus(response)
      })
      .catch(res => {
        return checkCode(res)
      })
  },
  async delete(url, data) {
    const options = getOptions(url, 'delete', data, 'query')
    return axios(options)
      .then(response => {
        return checkStatus(response)
      })
      .catch(res => {
        return checkCode(res)
      })
  }
}
