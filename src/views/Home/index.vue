<template>
  <div>
    <!-- 三级联动全局组件 -->
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <CommodityRanking />
    <MyLike />
    <CommodityFloor v-for="(floor) in floors" :key="floor.id" :floorList="floor" />
    <CommodityTrademark />
  </div>
</template>

<script>
import ListContainer from '@/views/Home/ListContainer'
import TodayRecommend from '@/views/Home/TodayRecommend'
import CommodityRanking from '@/views/Home/CommodityRanking'
import MyLike from '@/views/Home/MyLike'
import CommodityFloor from '@/views/Home/CommodityFloor'
import CommodityTrademark from '@/views/Home/CommodityTrademark'
import { mapState } from 'vuex'

export default {
  name: 'HomeIndex',
  components: {
    ListContainer,
    TodayRecommend,
    CommodityRanking,
    MyLike,
    CommodityFloor,
    CommodityTrademark,
  },
  async mounted() {
    this.$store.dispatch('home/getFloors')
  },
  computed: {
    ...mapState('home', ['floors'])
  },
}
</script>

<style>
</style>