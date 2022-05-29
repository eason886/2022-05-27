import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import './assets/index.scss'
import 'echarts-gl'
import scroll from 'vue-seamless-scroll/src'
console.log(scroll)

const app = createApp(App)
app
  .use(ElementPlus, {
    locale: zhCn
  })
  .use(store)
  .use(router)
  .use(scroll)
  .mount('#app')
