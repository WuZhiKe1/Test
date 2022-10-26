import { reqGetSearchInfo } from '@/api'
//search仓库
export default {
    namespaced: true,//开启命名空间
    //准备 state 用于存储数据
    state: {
        getSearchList: {},
    },
    //准备 actions 用于响应组件中的动作
    actions: {
        // params 参数是用户派发 actions 的时候，第二个参数传递过来的，至少是一个空对象
        //params = {} 默认空对象
        async getSearchList({ commit }, params = {}) {
            let result = await reqGetSearchInfo(params)
            if (result.data.code == 200) {
                commit('GETSEARCHLIST', result.data.data)
            }
        }
    },

    //准备 mutations 用于操作数据 （state）
    mutations: {
        GETSEARCHLIST(state, getSearchList) {
            state.getSearchList = getSearchList
        }
    },

    //准备 getters 用于将 state 中的数据进行加工
    getters: {
        //将数据简化分类
        goodsList(state) {
            return state.getSearchList.goodsList
        },
        trademarkList(state) {
            return state.getSearchList.trademarkList
        },
        attrsList(state) {
            return state.getSearchList.attrsList
        }
    },
}