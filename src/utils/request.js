/*
 *  封装 axios
 */
import axios from 'axios'

// 1. 创建新的 axios 实例
const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    // 超时时间 单位是ms，这里设置了3s的超时时间
    timeout: 3 * 1000,
})

// 2. 请求拦截器
request.interceptors.request.use(config => {
    // formdata 类型无需 json 化
    if (Object.prototype.toString.call(config.data) != '[object FormData]') {
        config.data = JSON.stringify(config.data);
    }

    // 兼容手工传递 headers
    config.headers = config.config || {};
    if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    }

    // 移除传递过来的 config key
    if (config.hasOwnProperty('config')) delete config.config;

    // 从 localStorage 中获取登录 token，并配置在请求头中
    const token = localStorage.getItem('logintoken');
    if (token) config.headers.token = token;
    config.headers.runtimeType = process.env.VUE_APP_RUNTIME_KIND;

    // Do something before response is sent
    return config
}, error => {
    // Do something with response error
    Promise.reject(error)
})

// 3. 响应拦截器
request.interceptors.response.use(response => {
    if (response.data.code === 10004) {
        localStorage.removeItem('logintoken');
        location.reload();
    }
    // Do something with response data
    return response;
}, error => {
    // Do something with response error
    return Promise.resolve(error.response)
})

// 4. 导入文件
export default request
