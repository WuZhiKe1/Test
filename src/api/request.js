// axios 二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
//在当前模块中引入store
import store from '@/store'



const requests = axios.create({
    baseURL: '/api',
    //请求超时时间
    timeout: 5000,
})

//请求拦截器
requests.interceptors.request.use((config) => {
    //游客id
    if (store.state.detail.uuid_token) {
        //请求头添加一个字段(userTempId)（要与后端商量）
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //用户token
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    // start:进度条开始
    nprogress.start()
    return config
})

//响应拦截器
requests.interceptors.response.use(
    (res) => {
        //成功 
        //done：进度条结束
        nprogress.done()
        return res
    },
    (err) => {
        //失败
        return err
    }
)

export default requests
