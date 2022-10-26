const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //不打包map文件
  productionSourceMap: false,
  transpileDependencies: true,
  //关闭eslint
  // lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
      },
    },
  },
})

