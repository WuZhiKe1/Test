import { reqAddressInfo, reqOderInfo } from '@/api'

export default {
    namespaced: true,//开启命名空间
    state: {
        address: [],
        order: [],
    },
    actions: {
        //获取用户地址信息
        async getUserAddressInfo({ commit }) {
            let result = await reqAddressInfo()
            if (result.data.code) {
                commit('GETUERADDRESSINFO', result.data.data)
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        },
        //获取商品清单
        async getOrderInfo({ commit }) {
            let result = await reqOderInfo()
            if (result.data.code) {
                commit('GETORDER', result.data.data)
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        },

    },
    mutations: {
        GETUERADDRESSINFO(state, address) {
            state.address = address
        },
        GETORDER(state, order) {
            state.order = order
        }
    },
    getters: {

    }

}