import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
Vue.use(VueRouter)

/* 解决导航重复问题 */
//先把 VueRouter原形对象的push保存一份
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
//重写push（往哪里跳转和参数，成功返回值，失败返回）
VueRouter.prototype.push = function push(location, resolve, reject) {
    //如果有成功失败回调
    if (resolve && reject) {
        // （originalPush指向window）重写this指向 指会原来的this 
        originalPush.call(this, location, resolve, reject)
    } else {
        //如果没有成功失败回调 手动添加回调参数
        originalPush.call(this, location, () => { }, () => { })
    }
}
//重写 replace
VueRouter.prototype.replace = function push(location, resolve, reject) {
    //如果有成功失败回调
    if (resolve && reject) {
        // originalReplace 指会原来的this 
        originalReplace.call(this, location, resolve, reject)
    } else {
        //如果没有成功失败回调 手动添加回调参数
        originalReplace.call(this, location, () => { }, () => { })
    }
}
let router = new VueRouter({
    routes,
    scrollBehavior() {
        //切换路由时滚动到上方
        return {
            x: 0,
            y: 0
        }
    }
})

//全局前置守卫
router.beforeEach(async (to, from, next) => {
    //获取用户信息
    let userInfoName = store.state.user.userInfo.name
    //token
    let token = store.state.user.token
    //要去的路由toPath
    let toPath = to.name
    //to 到达的路由
    //from 出发的路由
    //next 放行函数（方式看官网）
    if (token) {//登录状态
        //判断是否去login 
        if (toPath == 'login') {
            next({ name: from.name })
        }
        //拥有用户信息
        if (userInfoName) {
            next()
        } else {
            //没有用户信息，派发action 获取用户信息在跳转
            //获取用户信息在首页展示
            try {
                await store.dispatch('user/getUsrInfo')
                next()
            } catch (error) {
                // token失效了
                // 清除token
                alert(error)
                await store.dispatch('user/userLogout')
                next({ name: 'login' })
            }
        }
        //未登录不能去支付相关的组件
    } else if (toPath == 'trade' || toPath == 'pay' || toPath == 'paysuccess' || toPath == 'myorder') {
        alert('请登录')
        next({
            name: 'login', query: {
                //把为登录时要跳向的路由地址存在地址栏中
                // redirect: `/${toPath}`
                toPath
            }
        })
    } else next()
})

export default router