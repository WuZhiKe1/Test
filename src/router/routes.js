// import Register from '@/views/Register'
// import Login from '@/views/Login'
// import Home from '@/views/Home'
// import Search from '@/views/Search'
// import Detail from '@/views/Detail'
// import AddCartSuccess from '@/views/AddCartSuccess'
// import ShopCart from '@/views/ShopCart'
// import Trade from '@/views/Trade'
// import Pay from '@/views/Pay'
// import PaySuccess from '@/views/PaySuccess'
// import Center from '@/views/Center'
// //引入二级路由组件
// import MyOrder from '@/views/Center/myOrder'
// import GroupOrder from '@/views/Center/groupOrder'
export default [
    {
        name: 'register',
        path: '/register',
        //路由懒加载
        component: () => import('@/views/Register'),
        meta: { footer: false, },
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/Login'),
        meta: { footer: false, },
    },
    {
        name: 'home',
        path: '/home',
        component: () => import('@/views/Home'),
        meta: { footer: true, },
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: () => import('@/views/Search'),
        meta: { footer: true, },

    },
    {
        name: 'detail',
        path: '/detail/:skuid',
        component: () => import('@/views/Detail'),
        meta: { footer: true, },
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: () => import('@/views/AddCartSuccess'),
        meta: { footer: true, },
    },
    {
        name: 'shopcart',
        path: '/ShopCart',
        component: () => import('@/views/ShopCart'),
        meta: { footer: true, },
    },
    {
        name: 'trade',
        path: '/trade',
        component: () => import('@/views/Trade'),
        meta: { footer: true, },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.name == 'shopcart' || from.path == '/') {
                next()
            } else next(false)
        }
    },
    {
        name: 'pay',
        path: '/pay',
        component: () => import('@/views/Pay'),
        meta: { footer: true, },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.name == 'trade' || from.path == '/') {
                next()
            } else next(false)
        }
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: () => import('@/views/PaySuccess'),
        meta: { footer: true, },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.name == 'pay' || from.path == '/') {
                next()
            } else next(false)
        }
    },
    {
        name: 'center',
        path: '/center',
        component: () => import('@/views/Center'),
        meta: { footer: true, },
        children: [
            {
                name: 'myorder',
                path: 'myorder',
                component: () => import('@/views/Center/myOrder')
            },
            {
                name: 'grouporder',
                path: 'grouporder',
                component: () => import('@/views/Center/groupOrder')
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    //重定向 项目启动时，访问 / 立即定向跳转 home
    {
        path: '*',
        redirect: '/home',
    },
]