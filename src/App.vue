<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.footer"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    //派发 action 获取商品分类的三级列表的数据
    this.$store.dispatch('home/categoryList')
  }
}
</script>

<style>
</style>