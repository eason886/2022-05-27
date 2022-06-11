const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    port: 8080
  },
  css: {
    // 启用 CSS modules
    // preprocessorOptions: {
    //   scss: {
    //     // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了 @import '@/assets/styles/app.scss';
    //     additionalData: `import "@/assets/css/index.scss`
    //   }
    // }
    // loaderOptions: {
    //   scss: {
    //     prependData: `@import "@/assets/css/index.scss";`
    //   }
    // }
  }

  // publicPath: '/dist/'
  // transformToRequire: {
  //   audio: 'src'
  // }
})
