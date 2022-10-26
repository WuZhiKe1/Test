import { reqCartList, reqDeleteCartById, reqCheckCart } from '@/api'

export default {
    namespaced: true,//开启命名空间
    state: {
        cartList: []
    },
    actions: {
        //获取购物车列表
        async getCartList({ commit }) {
            let result = await reqCartList()
            if (result.data.code == 200) {
                commit('GETCARTLIST', result.data.data)
            }
        },
        //删除商品
        async deleteCartListBySkuId(context, skuId) {
            let result = await reqDeleteCartById(skuId)
            if (result.data.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        },
        //改变商品状态
        async updateCheckedById(context, { skuId, isChecked }) {
            let result = await reqCheckCart(skuId, isChecked)
            if (result.data.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        },
        //修改全部商品的状态
        updateAllCartIsChecked({ state, dispatch }, isChecked) {
            let promiseAll = []
            if (state.cartList[0]) {
                state.cartList[0].cartInfoList.forEach(item => {
                    let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
                    promiseAll.push(promise)
                })
            }
            return Promise.all(promiseAll)
        },
        //删除全部购物车的选中商品
        deleteAllCheckedCart({ dispatch, getters }) {
            let PromiseAll = []
            //遍历商品查看 checked 值为1 就派发删除请求
            getters.cartList.cartInfoList.forEach(item => {
                let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
                //将每一次返回的Promise添加到数组中
                PromiseAll.push(promise)
            })
            //如果有一个失败就返回失败
            return Promise.all(PromiseAll)
        }
    },
    mutations: {
        GETCARTLIST(state, cartList) {
            state.cartList = cartList
        }
    },
    getters: {
        cartList(state) {
            return state.cartList[0] || {}
        }
    }
}