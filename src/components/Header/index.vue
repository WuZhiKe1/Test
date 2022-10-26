<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>欢迎您！</p>
          <!-- 没有用户名 -->
          <p v-if="!userName">
            <span></span>
            <router-link to="/login">请登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <!-- 拥有用户名 -->
          <p v-else>
            <a>{{userName}}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的</a>
          <a href="###">会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo1.png" alt />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderIndex',
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    //搜索关键词
    goSearch() {
      //路由传参
      //1. 字符串形式
      // this.$router.push('/search' + this.keyword + "?k=" + this.keyword)
      //2. 模板字符串形式
      // this.$router.push(`/search${this.keyword}?k=${this.keyword}`)
      //3. 对象形式
      let loction = { name: 'search', params: { keyword: this.keyword || undefined } }
      if (this.$route.query) {
        loction.query = this.$route.query
      }
      this.$router.push(loction)
    },
    //退出登录
    async logout() {
      //1. 通知服务器退出登录【清除一些数据：token】
      //2. 清除项目中的数据 [userInfo, token]
      try {
        await this.$store.dispatch('user/userLogout')
        //退出成功回到首页
        this.$router.push({ name: 'login' })
      } catch (error) {
        alert(error)
      }
    }
  },
  mounted() {
    //通过全局事件总线清除关键字
    this.$bus.$on('clear', () => {
      this.keyword = ''
    })
  },
  computed: {
    //用户名信息
    userName() {
      return this.$store.state.user.userInfo.name
    }
  }
}
</script>

<style lang="less"  scoped>
.header {
    & > .top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                    a {
                        cursor: pointer;
                    }
                    a:hover {
                        text-decoration: none;
                        color: #ea4a36;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    & + a {
                        border-left: 1px solid #b3aeae;
                    }
                }
            }
        }
    }

    & > .bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>>
