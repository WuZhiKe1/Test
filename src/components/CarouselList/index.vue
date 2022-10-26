<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel) in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'CarouselList',
  props: ['list'],
  watch: {
    list: {
      //因为数据不会变化所以加 可以立即监听不用数据变化就能监听
      immediate: true,
      handler() {
        //这个时候结构还没有渲染需要在$nextTick里执行逻辑
        this.$nextTick(() => {
          new Swiper(this.$refs.mySwiper, {
            //分页器 true
            loop: true,
            pagination: {
              el: '.swiper-pagination',
              //点击小球切换
              clickable: true
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }
          })
        })
      }
    }
  },
}
</script>

<style>
</style>