//登录注册
import { reqGetCode, reqUserRegister, reqUserLogin, reqUsrInfo, reqLogout } from '@/api'
//引入token
import { setToken, getToken, removeToken } from '@/utils/token.js'
export default {
    namespaced: true,//开启命名空间
    state: {
        code: '',
        token: getToken(),
        userInfo: {},
    },
    actions: {
        //获取验证码
        async getCode(context, phone) {
            //获取验证码的接口会见验证码返回，正常情况会将验证码发送到用户的手机上
            let result = await reqGetCode(phone)
            if (result.data.code == 200) {
                context.commit('GETCODE', result.data.data)
                return result.data.ok
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        },
        //注册
        async reqUserRegister(context, data) {
            let result = await reqUserRegister(data)
            if (result.data.code == 200) {
                return result.data.ok
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        },
        //登录 [token]
        async reqUserLogin({ commit }, data) {
            let result = await reqUserLogin(data)
            //服务器下发token，用户的唯一标识
            //将来通过token向服务器要用户的信息
            if (result.data.code == 200) {
                commit('REQUSERLOGIN', result.data.data.token)
                //持久化存储token
                setToken(result.data.data.token)
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        },
        //获取用户信息
        async getUsrInfo({ commit }) {
            let result = await reqUsrInfo()
            if (result.data.code == 200) {
                commit('GETUSERINFO', result.data.data)
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        },
        //退出登录
        async userLogout({ commit }) {
            let result = await reqLogout()
            if (result.data.code == 200) {
                commit('CLEARTOKEN')
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        }
    },
    mutations: {
        GETCODE(state, code) {
            state.code = code
        },
        REQUSERLOGIN(state, token) {
            state.token = token
        },
        GETUSERINFO(state, userInfo) {
            state.userInfo = userInfo
        },
        CLEARTOKEN(state) {
            //把用户信息清空
            state.token = ''
            state.userInfo = {}
            //本地存储token清空
            removeToken()
        }
    },
    getters: {

    }
}