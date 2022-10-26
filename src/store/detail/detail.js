import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
//封装游客身份模块uuid----生成随机字符串
import { getUUID } from '@/utils/uuid_token.js'
export default {
    namespaced: true,//开启命名空间
    state: {
        goodInfo: {},
        //游客临时身份
        uuid_token: getUUID()
    },
    actions: {
        //获取商品详情
        async getGoodInfo({ commit }, skuid) {
            let result = await reqGoodsInfo(skuid)
            if (result.data.code == 200) {
                commit('GETGOODSINFO', result.data.data)
            }
        },
        //将产品添加到购物车当中
        async addOrUpdateShopCart(context, { skuId, skuNum }) {
            let result = await reqAddOrUpdateShopCart(skuId, skuNum)
            //加入购物车后返回的解构
            //加入购物车后（发送请求），前台将数据带给服务器
            //服务器写入成功，并没有返回其他数据 只返回 code.200 便时常表存储示成功
            // 返回的是Promise对象可以通过 Promise.reject 返回错误信息
            //判断成功还是失败
            if (result.data.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        }
    },
    mutations: {
        GETGOODSINFO(state, goodInfo) {
            state.goodInfo = goodInfo
        },
    },
    getters: {
        // 简化数据
        categoryView(state) {
            //初始值时undefined 因该加 || {} 空对象
            return state.goodInfo.categoryView || {}
        },
        skuInfo(state) {
            return state.goodInfo.skuInfo || {}
        },
        spuSaleAttrList(state) {
            return state.goodInfo.spuSaleAttrList || []
        }
    }
}