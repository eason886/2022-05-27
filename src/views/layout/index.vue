<template>
  <el-container>
    <el-aside :width="'auto'">
      <Menus></Menus>
    </el-aside>
    <el-container>
      <el-header>
        <div class="left">
          <div id="pointer" @click="clone()">
            <el-icon><location /></el-icon>
          </div>
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="(item, index) in path" :to="{ path: item.path }" :key="index">{{ item.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div>
          <span id="fullscreen" @click.stop="screen()" style="margin-right: 20px">
            <el-icon><FullScreen /></el-icon>
          </span>
          <span @click="reset">退出</span>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { Document, Menu as IconMenu, Location, Setting, ArrowRight, FullScreen } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import Menus from './menus'
const router = useRoute()
import { ref, watch } from 'vue'
// if (router.path === '/dashbord') {
//   router.path = '/'
// }
const reset = () => {
  window.localStorage.clear()
  window.history.go(0)
}
let fullscreen = false
const screen = () => {
  let element = document.documentElement
  if (fullscreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
      // IE11
      element.msRequestFullscreen()
    }
  }
  fullscreen = !fullscreen
}

// console.log(router)
const path = ref([{ path: '/', title: '首页' }])
watch(
  router,
  (newVal, oldVal) => {
    path.value = [{ path: '/', title: '首页' }]

    if (newVal.matched.length > 1) {
      newVal.matched.forEach((item) => {
        if (item.meta && item.meta.title) {
          path.value.push({
            path: item.path,
            title: item.meta.title
          })
        }
      })
    }
    console.log(path, 109)
    // })
  },
  {
    immediate: true,
    deep: true
  }
)
// const store = useStore()
// console.log(router, 78)
// const list = store.state.routerList
const isCollapse = ref(false)
const curw = ref('200px')

const clone = () => {
  console.log(11)
  isCollapse.value = !isCollapse.value
  // curw.value = isCollapse.value ? 'auto' : '200px'
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  width: 100%;
  .el-container {
    width: 100% !important;
  }
}
// .el-header {
//   background-color: red;
// }
.el-main {
  background-color: #f0f2f5;
}

.el-header {
  .left {
    display: flex;
    align-items: center;
    height: 50px;
  }
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #fff;
  justify-content: space-between;
  cursor: pointer;
  #pointer {
    cursor: pointer;
    vertical-align: middle;
    margin-top: 4px;
    margin-right: 20px;
  }
}
#fullscreen {
  vertical-align: middle;
}

.el-aside {
  background-color: #313642;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
}
</style>
