import Vue from 'vue'
import App from './App.vue'
//全局组件
//三级联动组件--
import TypeNav from '@/components/TypeNav'
//轮播图
import CarouselList from '@/components/CarouselList'
//分页器
import Pagination from '@/components/Pagination'
//按需引入Element
import { Button, MessageBox } from 'element-ui'
//第一个参数式全局组件的名字，第二个参数式文件名
Vue.component(TypeNav.name, TypeNav)
Vue.component(CarouselList.name, CarouselList)
Vue.component(Pagination.name, Pagination)


//注册全局element-ui——button
Vue.component(Button.name, Button)
//Element UI还可以挂载在原型上
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$msgbox = MessageBox


//引入路由
import router from '@/router'
//vuex仓库
import store from '@/store'

Vue.config.productionTip = false

//引入MockServer.js----mock数据
import '@/mock/mockServer'

//引入swiper样式
import 'swiper/css/swiper.css'

//统一接口 api文件夹里的全部接口
//as 统一引入
import *as API from '@/api'
//引入插件
//图片懒加载
import '@/plugins/vue-Lazyload.js'
//表单验证
import '@/plugins/vee-validate'
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由‘
  router,
  //注册仓库
  store,
}).$mount('#app')
