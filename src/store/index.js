import Vue from 'vue'
import Vuex from 'vuex'
//注册Vuex
Vue.use(Vuex)
//引入小仓库
import home from './home'
import search from './search'
import detail from './detail/detail.js'
import shopcart from './shopcart/shopcart'
import user from './user/user.js'
import trade from './trade/trade.js'
// 对外暴露Store的一个实例
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade,
    }
})