import { createApp } from 'vue'

import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
// import VueClipboard from 'vue-clipboard2'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import * as ElIconModules from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
// import 'element-plus/lib/theme-chalk/index.css'
// import 'element-plus/lib/theme-chalk/display.css'
import App from './App.vue'
import './assets/index.scss'
import 'echarts-gl'

import scroll from 'vue-seamless-scroll/src'

console.log(scroll)

const app = createApp(App)
// 注册所有的icon
console.log(Object.keys(ElIconModules))
Object.keys(ElIconModules).forEach(function (key) {
  app.component(ElIconModules[key].name, ElIconModules[key])
})
console.log(app.component)
app
  .use(ElementPlus, {
    locale: zhCn
  })
  .use(store)
  .use(router)
  .use(scroll)
  // .use(VueClipboard)
  .mount('#app')
