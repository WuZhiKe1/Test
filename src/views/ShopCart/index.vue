<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked==1"
              @change="updateChecked(cart,$event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,cart)">-</a>
            <input
              autocomplete="off"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change',$event.target.value*1,cart)"
            />
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuNum*cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br />
            <a href="javascript:;">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked"
          @change="updateAllCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="javascript:;">移到我的关注</a>
        <a href="javascript:;">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
export default {
  name: 'ShopCart',

  mounted() {
    this.getData()
  },
  methods: {
    //获取个人购物车
    getData() {
      this.$store.dispatch('shopcart/getCartList')
    },
    //修改某一个产品的个数 
    //添加节流防止点击过快出现负数
    handler: _.throttle(async function (type, disNum, cart) {
      //type 区分三个元素是谁
      //disNum 变量1 -1 input 最终个数 返回1 产品数量加一 -1则减一 0 不变
      // cart 商品参数
      switch (type) {
        //加号
        case 'add':
          //带给服务器变化量
          disNum = 1
          break
        case 'minus':
          //判断产品的个数大于一再传递给服务器
          //产品个数小于等于1 
          // 0 代表不改变
          disNum = cart.skuNum > 1 ? -1 : 0
          break
        case 'change':
          // if (isNaN(disNum) || disNum < 1) {
          //   //非法的化返回0 无变化
          //   disNum = 0
          // } else {
          //   //输入的数量减去原本的数量返回服务器
          //   //为负数服务器会减去多少 正数是加上多少
          //   disNum = parseInt(disNum) - cart.skuNum
          // }
          //简写
          disNum = (isNaN(disNum) || disNum < 1) ? 0 : parseInt(disNum) - cart.skuNum
          break
      }
      try {
        //代表成功
        //派发action 向服务器发请求
        await this.$store.dispatch('detail/addOrUpdateShopCart', { skuId: cart.skuId, skuNum: disNum })
        //在次获取购物车数据渲染数据
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }, 1000),
    //删除商品
    async deleteCartById(cart) {
      try {
        await this.$store.dispatch('shopcart/deleteCartListBySkuId', cart.skuId)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    //改变商品勾选的状态
    updateChecked(cart, event) {
      try {
        let isChecked = event.target.checked ? '1' : '0'
        this.$store.dispatch(
          'shopcart/updateCheckedById', {
          skuId: cart.skuId, isChecked
        })
        setTimeout(() => {
          this.getData()
        }, 50)
      } catch (error) {
        alert(error.message)
      }
    },
    //修改全部选中商品的状态
    async updateAllCartChecked(event) {
      try {
        let isChecked = event.target.checked ? '1' : '0'
        await this.$store.dispatch('shopcart/updateAllCartIsChecked', isChecked)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }
    ,
    //删除选中的商品
    deleteAllCheckedCart() {
      try {
        this.$store.dispatch('shopcart/deleteAllCheckedCart')
        setTimeout(() => {
          this.getData()
        }, 300)
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    ...mapGetters('shopcart', ['cartList']),
    //购物车的数据
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    // 计算购买商品的总价
    totalPrice() {
      let sum = 0
      this.cartInfoList.forEach(item => {
        sum += item.skuNum * item.skuPrice
      })
      return sum
    },
    //判断复选框是否勾选（全选）
    isAllChecked() {
      //every 遍历每一个元素如果遇到false 就退出遍历返回false
      // 如果全是true 则返回true
      return this.cartInfoList.every(item => item.isChecked == 1)
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }

    .cart-main {
        .cart-th {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;

            & > div {
                float: left;
            }

            .cart-th1 {
                width: 25%;

                input {
                    vertical-align: middle;
                }

                span {
                    vertical-align: middle;
                }
            }

            .cart-th2 {
                width: 25%;
            }

            .cart-th3,
            .cart-th4,
            .cart-th5,
            .cart-th6 {
                width: 12.5%;
            }
        }

        .cart-body {
            margin: 15px 0;
            border: 1px solid #ddd;

            .cart-list {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;

                & > li {
                    float: left;
                }

                .cart-list-con1 {
                    width: 15%;
                }

                .cart-list-con2 {
                    width: 35%;

                    img {
                        width: 82px;
                        height: 82px;
                        float: left;
                    }

                    .item-msg {
                        float: left;
                        width: 150px;
                        margin: 0 10px;
                        line-height: 18px;
                    }
                }

                .cart-list-con4 {
                    width: 10%;
                }

                .cart-list-con5 {
                    width: 17%;

                    .mins {
                        border: 1px solid #ddd;
                        border-right: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }

                    input {
                        border: 1px solid #ddd;
                        width: 40px;
                        height: 33px;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                    }

                    .plus {
                        border: 1px solid #ddd;
                        border-left: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }
                }

                .cart-list-con6 {
                    width: 10%;

                    .sum {
                        font-size: 16px;
                    }
                }

                .cart-list-con7 {
                    width: 13%;

                    a {
                        color: #666;
                    }
                }
            }
        }
    }

    .cart-tool {
        overflow: hidden;
        border: 1px solid #ddd;

        .select-all {
            padding: 10px;
            overflow: hidden;
            float: left;

            span {
                vertical-align: middle;
            }

            input {
                vertical-align: middle;
            }
        }

        .option {
            padding: 10px;
            overflow: hidden;
            float: left;

            a {
                float: left;
                padding: 0 10px;
                color: #666;
                cursor: pointer;
            }
        }

        .money-box {
            float: right;

            .chosed {
                line-height: 26px;
                float: left;
                padding: 0 10px;
            }

            .sumprice {
                width: 200px;
                line-height: 22px;
                float: left;
                padding: 0 10px;

                .summoney {
                    color: #c81623;
                    font-size: 16px;
                }
            }

            .sumbtn {
                float: right;

                a {
                    display: block;
                    position: relative;
                    width: 96px;
                    height: 52px;
                    line-height: 52px;
                    color: #fff;
                    text-align: center;
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    background: #e1251b;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>