//统一管理API接口
import requests from './request'

//mock模拟数据
import mockAjax from './mockAjax'

//获取轮播图模拟数据
export const reqGetBannerList = () => mockAjax.get('/banner')
//获取楼层模拟数据
export const reqGetFloors = () => mockAjax.get('/floor')
// 三级联动接口
// /api/product/getBaseCategoryList GET 无参数
// 发送请求：axios发送请求返回的是Promise对象
export const reqCategoryList = () => requests(
    {
        url: 'product/getBaseCategoryList',
        method: 'get'
    })

//获取搜索模块的数据 地址：api/list  post
/* 参数：
{
"category3Id": "61",
"categoryName": "手机",
"keyword": "小米",
"order": "1:desc",
"pageNo": 1,
"pageSize": 10,
"props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
"trademark": "4:小米"
}
*/
//传递的params参数至少是一个空对象
export const reqGetSearchInfo = (params) => requests({
    url: '/list',
    method: 'post',
    data: params,
})

//获取产品详情链接  URL: /api/item/{skuId}  GET
export const reqGoodsInfo = (skuId) => requests({
    url: `/item/${skuId}`,
    method: 'get',
})

//将铲平加入到购物车中（获取更新某一个产品的个数）
//api/cart/addToCart/{ skuId }/{ skuNum }  Post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})

//获取购物车列表数据接口
//URL:/api/cart/cartList  method :get
export const reqCartList = () => requests({
    url: 'cart/cartList',
    method: 'get'
})

//删除商品接口
//URL:/api/cart/deleteCart/{skuId}  method:DELETE
export const reqDeleteCartById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

//切换商品选中状态   id  0取消 1选中 
//Url:/api/cart/checkCart/{skuId}/{isChecked}  get
export const reqCheckCart = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get',
})

//获取验证码
//URL: /api/user/passport/sendCode/{phone}   get
export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get',
})

//注册
//URL:/api/user/passport/register  post
export const reqUserRegister = (data) => requests({
    url: '/user/passport/register',
    data,
    method: 'post'
})

//登录
//URL：/api/user/passport/login  post(phone,password)
export const reqUserLogin = (data) => requests({
    url: '/user/passport/login',
    data,
    method: 'post',
})

//获取用户信息【需要带着用户的token向服务器要用户信息】（通过请求头传递）
//URL；/api/user/passport/auth/getUserInfo    get
export const reqUsrInfo = () => requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get',
})

//退出登录
//URL:/user/passport/auth/logout    get
export const reqLogout = () => requests({
    url: '/user/passport/logout',
    method: 'get',
})

//获取用户地址信息
//URL: /api/user/userAddress/auth/findUserAddressList   get
export const reqAddressInfo = () => requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get',
})

//获取商品清单
// URL:/api/order/auth/trade   get
export const reqOderInfo = () => requests({
    url: '/order/auth/trade',
    method: 'get'
})

//提交订单
//URL：api/order/submitOrder?tradeNo={tradeNo}   post
export const reqSubmitOrder = (tradeNo, data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post',
})

//获取订单支付信息
//URL:/api/payment/weixin/createNative/{orderId}    get
export const reqPayInfo = (orderId) => requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get',
})

//获取支付状态
//URL；/api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
})

//获取的的订单列表
//URL:/api/order/auth/{page}/{limit}  get
//页码每页显示数量
export const reqMyOrderList = (page, limit) => requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get',
})
