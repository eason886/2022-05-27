import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import './assets/index.scss'
import 'echarts-gl'
import scroll from 'vue-seamless-scroll/src'
console.log(scroll)
createApp(App).use(store).use(router).use(scroll).use(ElementPlus, { locale: zhCn }).mount('#app')
