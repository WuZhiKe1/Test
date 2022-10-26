<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1 ,index) in categoryList" :key="c1.categoryId">
                <h3
                  style="line-height:27px"
                  @mouseenter="changeIndex(index)"
                  :class="{cur:currentIndex==index}"
                >
                  <a
                    href="javascript:;"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >{{c1.categoryName}}</a>
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{display:currentIndex==index?'block':'none'}"
                >
                  <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a
                          href="javascript:;"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javascript:;"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
//按需引入lodash节流
import throttle from 'lodash/throttle'

export default {
  name: 'TypeNav',
  data() {
    return {
      //动态添加一级分类初始值
      currentIndex: -1,
      show: true
    }
  },
  //组件挂载完毕发送请求
  mounted() {
    //控制TypeNav的显示与隐藏
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState('home', ['categoryList'])
  },
  methods: {
    //获取一级分类索引并将currentIndex赋值
    //插件lodash插件的节流函数  _.throttle
    changeIndex: throttle(function (index) {
      //快速划过样式栏会不能完全触发
      //运用防抖节流解决问题
      this.currentIndex = index
    }, 50),
    //鼠标移除消除样式 和隐藏 TypeNav 组件
    leaveIndex() {
      this.currentIndex = -1
      if (this.$route.path != '/home') {
        this.show = false
      }
    },
    //三级联动跳转search路由
    goSearch(event) {
      //利用编程式导航+事件的委派
      //缺点是会不能确定是否点击的是a标签，如何获取商品的name和id
      //添加自定义事件 :data-categoryName="c1.categoryName" 获取参数
      //通过 函数event.target获取节点 dataset 获取节点的自定义属性与属性值 获取的属性都是小写                                 
      //结构赋值(es6)将categoryname单独取出来方便使用 还有自定义的各个ID属性
      let { categoryname, category1id, category2id, category3id } = event.target.dataset
      //如果标签上有categoryName一定是a标签
      if (categoryname) {
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        //一二三分类的a标签
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }

        //路由跳转合并params和query参数
        if (this.$route.params) {
          location.params = this.$route.params
          location.query = query
          this.$router.push(location)
        }
      }
    },
    //鼠标离开三级联动组件隐藏
    enterShow() {
      this.show = true
    }
  },
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .cur {
                        background-color: skyblue;
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }
            }
        }
        //过渡动画的样式
        //过渡动画开始(进入时)
        .sort-enter {
            height: 0px;
        }

        //过渡动画的结束状态(进入时)
        .sort-enter-to {
            height: 461px;
        }

        //定义动画的时间、速率
        .sort-enter-active {
            transition: all 0.2s linear;
            overflow: hidden;
        }
    }
}
</style>