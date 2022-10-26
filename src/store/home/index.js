import { reqCategoryList, reqGetBannerList, reqGetFloors } from '@/api'
//home仓库
export default {
    namespaced: true,
    //准备 state 用于存储数据
    state: {
        //三级菜单数据
        categoryList: [],
        //轮播图数据
        banners: [],
        //floor组件数据
        floors: [],
    },
    //准备 actions 用于响应组件中的动作
    actions: {
        //获取三级联动数据
        async categoryList({ commit }) {
            let result = await reqCategoryList()
            if (result.data.code == 200) {
                commit('CATEGORYLIST', result.data.data)
            }
        },
        //获取广告位轮播图数据
        async getBannerList({ commit }) {
            let result = await reqGetBannerList()
            if (result.code == 200) {
                commit('GETBANNERLIST', result.data)
            }
        },
        //获取所有楼层数据
        async getFloors({ commit }) {
            let result = await reqGetFloors()
            if (result.code == 200) {
                commit('GETFLOORS', result.data)
            }
        },
    },

    //准备 mutations 用于操作数据 （state）
    mutations: {
        CATEGORYLIST(state, categoryList) {
            state.categoryList = categoryList
        },
        GETBANNERLIST(state, banners) {
            state.banners = banners
        },
        GETFLOORS(state, floors) {
            state.floors = floors
        }
    },



    //准备 getters 用于将 state 中的数据进行加工
    getters: {

    },
}

