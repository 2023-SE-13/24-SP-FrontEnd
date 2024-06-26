const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    open:true,
    proxy:{
      '/api':{
        target:`http://10.251.253.188/api`,
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
})
