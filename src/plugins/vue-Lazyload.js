import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import fL from '@/assets/images/lazyload.png'
Vue.use(VueLazyload, {
    //懒加载默认图片
    loading: fL
})