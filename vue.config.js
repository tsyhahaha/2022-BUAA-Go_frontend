const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  devServer: {
    open: true,
    port: 8080,
    https: false,
    // proxy: {
    //   '/third': {
    //     // 保持默认
    //     target: 'http://xxx.xxx.xxx.xxx:xxxx/',
    //     ws: false,
    //     secure: false,
    //     changOrigin: true, // 允许跨域
    //     pathRewrite: {
    //       '^/third': '' // 请求的时候使用这个api就可以
    //     }
    //   }
    // }
  }
})


